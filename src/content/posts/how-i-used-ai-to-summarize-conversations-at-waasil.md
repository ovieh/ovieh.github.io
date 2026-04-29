---
title: "How I Used AI to Summarize Conversations at Waasil.io"
date: 2026-04-28
draft: false
description: "How I built AI conversation summaries at Waasil.io, from Cloudflare AI Gateway and the AI SDK to the distributed systems decisions that made the feature reliable."
author: "Ovieh Mosley"
tags: ["AI", "Distributed Systems", "Cloudflare", "AI SDK"]
---

# How I Used AI to Summarize Conversations

One of the recurring problems in software work is not the lack of information, but the opposite. There is too much of it, and it is usually scattered across long chat threads, meeting notes, issue comments, and the sort of back-and-forth discussion that makes sense while you are in it, but becomes expensive to reconstruct later.

I kept running into this problem in a very practical way. I would step away from a conversation for a few hours, come back, and then spend several minutes rebuilding the context before I could do anything useful. What did we decide? What was still open? Was there actually an action item here, or did the thread just end because everyone got distracted by something else?

That is the sort of problem that makes AI genuinely useful.

I mean that in a fairly narrow engineering sense. There is a tedious, recurring task with a clear enough shape that a model can reduce the amount of human effort required, and the tradeoff can be bounded in terms of latency, token usage, and cost. Conversation summarization fits that description fairly well.

I built this at [Waasil.io](https://waasil.io), a WhatsApp CRM for businesses in Dubai, where fast context recovery matters when teams are handling customer conversations collaboratively.

The reason I found this interesting is that it sits at the intersection of two things I care about. The first is AI integration in real systems, where the question is not whether a model can produce interesting output, but whether it can produce something reliable enough to fit into a workflow. The second is distributed systems, because the moment you move beyond a toy example, you are dealing with message ordering, retries, observability, cost controls, and the messy reality of getting many moving parts to cooperate.

## The actual problem

Long conversations are not hard because they are long. They are hard because the useful information is mixed in with everything else.

A thread might contain a decision, three rejected ideas, a side discussion, a joke, a changed requirement, and a vague promise that someone will follow up later. If you are lucky, the important part is at the end. If you are not, it is buried somewhere in the middle and then partially contradicted six messages later.

Reading the whole thing again is not intellectually difficult, but it is expensive. It costs attention. It costs time. And if you are switching between multiple threads, that cost compounds quickly.

What I wanted was not a magical agent that understood everything better than I did. I wanted a system that could compress a conversation into something I could scan quickly, while preserving the pieces that actually matter: the decision, the unresolved questions, and the next steps.

That narrower goal turned out to be a much better framing for the work.

## Why summarization is a good AI use case

There are plenty of AI use cases that sound impressive and then fall apart once you need them to be dependable. Summarization has a few properties that make it much more workable than many other applications.

First, the task is constrained. You already have the source material. The model is not being asked to invent strategy or produce original research. It is being asked to reduce and organize text.

Second, the output is easy to review. If the summary looks off, you can compare it against the thread and spot the problem quickly. That makes the human verification loop much cheaper.

Third, it can still be useful with some error. A summary does not need to be flawless to save time. It only needs to be good enough to get you back into the conversation faster.

That last point matters. In practice, the best AI features are often the ones that reduce friction rather than replace judgment.

## What I built

The workflow I ended up with was fairly simple in concept.

I took a conversation, normalized it into a predictable structure, and then passed it through a model with instructions to produce a concise summary, a list of key decisions, unresolved questions, and action items. The goal was not just to make the conversation shorter. The goal was to separate signal from noise.

The system boundary was important here. The model was responsible for one thing only: turning a bounded transcript into a summary artifact. It was not deciding when a summary should exist, whether a thread was important enough to summarize, how long a transcript window should be, or whether the result should replace an existing summary. Those decisions stayed in application code. That boundary made the feature easier to reason about because it kept the model in a narrow role and left control flow, storage, retries, and policy outside the model.

On the implementation side, I used Cloudflare AI Gateway in front of the model calls. That gave me a clean control point for requests going out to AI providers. I could inspect usage patterns, get better visibility into what was happening, and avoid wiring provider-specific concerns too deeply into the rest of the application. It also made the cost side easier to manage, because once model traffic is forced through a gateway you have a place to see which requests are worth paying for and which ones are just waste.

I also used the AI SDK to handle the model interaction layer. That helped keep the application code cleaner. Instead of writing custom glue for every request and response shape, I could focus on how I wanted the summarization pipeline to behave. The SDK gave me a more ergonomic way to work with model calls, and it reduced the amount of incidental code I had to maintain.

This is roughly the shape of the summarization call:

```ts
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

const gatewayModel = createOpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	baseURL: `https://gateway.ai.cloudflare.com/v1/${process.env.CLOUDFLARE_ACCOUNT_ID}/${process.env.CLOUDFLARE_GATEWAY_ID}/openai`,
});

type ConversationMessage = {
	role: 'user' | 'assistant';
	author: string;
	content: string;
	timestamp: string;
};

export async function summarizeConversation(messages: ConversationMessage[]) {
	const normalizedTranscript = messages
		.map((message) => {
			return `[${message.timestamp}] ${message.author}: ${message.content}`;
		})
		.join('\n');

	const { text } = await generateText({
		model: gatewayModel('gpt-4.1'),
		system:
			'You summarize conversations. Return four sections: summary, decisions, open questions, and action items. If something is uncertain, say so explicitly.',
		prompt: `Summarize this conversation:\n\n${normalizedTranscript}`,
	});

	return text;
}
```

It is not complicated code, and that is part of the point. The value was less about the raw API call and more about putting the call behind a shape that the rest of the system could depend on.

That combination turned out to be useful for another reason. It let me keep the architecture reasonably modular. The application logic could focus on preparing conversation data and deciding when a summary should be generated, while the gateway and SDK handled a lot of the mechanics around model access.

It also forced me to quantify the feature a bit more than I expected. I had to care about transcript size, output size, regeneration frequency, and whether summarizing a thread was actually cheaper than having someone reread it. That was useful discipline. It turned the feature from a vague AI capability into an operation with an actual cost envelope.

This is the part of AI integration that I think gets overlooked. People spend a lot of time discussing prompts and models, which makes sense, but once you want the feature to survive contact with production traffic, the surrounding system matters just as much.

## Where the distributed systems thinking showed up

Even for a feature as ordinary as summarization, the distributed systems problems show up quickly.

Conversations do not arrive as neat, finished documents. They arrive as sequences of messages over time. Messages can be delayed. Retries happen. A conversation that looked complete a minute ago may still be active. If you summarize too early, you risk producing something that is already stale. If you summarize too late, the feature becomes less useful because the value is in helping someone re-enter the thread quickly.

So part of the problem becomes deciding when a summary should exist at all.

That is not a prompt problem. It is a systems problem.

You need some policy for when to trigger summarization, when to refresh it, and when to leave the existing summary alone. You also need to think about idempotency. If the same trigger fires twice, do you regenerate the summary, ignore the duplicate, or update the existing record? Once you start asking those questions, the shape of the problem becomes more familiar to anyone who has built distributed systems before.

This is also where quantization matters. If every incoming message can trigger a fresh summary with an unbounded transcript, then the feature does not really have a system boundary. It has a spending problem. So I found it more useful to think in hard limits: do not summarize short threads, summarize against a bounded conversation window, cap the output format, and skip regeneration when the source state has not materially changed.

The summarization policy ended up mattering at least as much as the prompt. A stripped down version looks something like this:

```ts
type SummaryJobInput = {
	conversationId: string;
	lastMessageId: string;
	messageCount: number;
	updatedAt: string;
};

export async function maybeRefreshSummary(job: SummaryJobInput) {
	const existing = await summaryStore.get(job.conversationId);

	if (existing?.sourceLastMessageId === job.lastMessageId) {
		return existing;
	}

	if (job.messageCount < 8) {
		return null;
	}

	const messages = await conversationStore.listMessages(job.conversationId);
	const summary = await summarizeConversation(messages);

	await summaryStore.put(job.conversationId, {
		summary,
		sourceLastMessageId: job.lastMessageId,
		messageCount: job.messageCount,
		updatedAt: job.updatedAt,
		version: (existing?.version ?? 0) + 1,
	});

	return summary;
}
```

That is obviously only a scaffold, but it captures the real issue. The interesting part is not just generating text. The interesting part is deciding when a summary is stale, when it is safe to overwrite, and how to avoid doing the same work repeatedly.

That last part matters for cost as much as correctness. The cheapest summary is the one you never generate, and the second cheapest is the one you do not regenerate unnecessarily. A lot of the savings came from policy rather than model choice: skipping short threads, ignoring duplicate triggers, and only refreshing when the new message state justified the expense.

Observability also matters more than people expect. If summaries become worse, is the issue the prompt, the provider, the input formatting, the model parameters, or the ordering of messages that made it into the request? Without good visibility, AI features become difficult to debug because the failure surface is spread across several layers.

That is one reason I liked having Cloudflare AI Gateway in the stack. It gave me a point where I could reason about traffic and behavior more clearly rather than treating model calls as an opaque black box.

## What made the summaries useful

The most useful summaries were not the ones that sounded the smartest. They were the ones that were structured clearly enough to support action.

The format I kept coming back to was simple:

- a short summary of the conversation
- key decisions that were made
- open questions or unresolved issues
- action items

That structure matters because different parts of a conversation serve different purposes. A paragraph summary is good for orientation, but it is not enough on its own. If I am trying to pick up work, I usually need to know what was decided and what still needs attention. Putting those into explicit sections made the output much more useful than a generic paragraph summary.

It also made failure easier to spot. If the model invented an action item or misread a decision, it tended to be obvious once the information was presented in a structured way.

## What worked better than I expected

The biggest positive surprise was that the model was often good at extracting the thread's center of gravity. Conversations tend to drift. People repeat themselves, revise earlier points, and introduce side topics. Even when the summary missed some nuance, it was often good enough to point me toward the important part of the exchange.

That alone saved time.

It also saved money in a less obvious way. Once a summary existed, it reduced the need to repeatedly consume the full thread just to regain context. The model call had a direct cost, but the system still penciled out because the summary reduced a more expensive pattern: repeated human rereading of the same conversation.

I also found that summarization was particularly helpful when returning to older threads. The longer the gap between the original conversation and the moment I needed to act on it, the more valuable the summary became. In those moments, I did not need a literary retelling of the discussion. I needed a compressed operational view of what mattered.

That is a small distinction, but it changed how I thought about the feature. I stopped thinking of it as an AI-generated note and started thinking of it as a context recovery mechanism.

## Where it broke down

The weak points were predictable, which is actually useful because predictable failure is easier to design around.

The model could flatten nuance. It could collapse a tentative suggestion into something that looked more final than it really was. It could miss that someone was objecting to a plan rather than endorsing it. And like most model outputs, it could sound more confident than the underlying conversation justified.

That meant the summaries were best treated as drafts for human review, not authoritative records.

This is where a lot of AI products get into trouble. They present model output with too much confidence and not enough context. For low-stakes convenience features, that might be acceptable. For anything operational, you need clearer boundaries around what the system is actually doing.

In my case, the right mental model was straightforward: the summary helps me get back into the thread faster, but it does not absolve me of checking the thread when the stakes are high.

## What I would recommend to anyone building this

If I were giving advice to someone implementing conversation summarization, I would keep it fairly plain.

Summarize one thread at a time. Keep the input structure consistent. Ask for decisions, open questions, and action items separately instead of hoping they emerge from one vague instruction. Make it easy to regenerate summaries when new context arrives. And make sure the user can still get back to the original conversation without friction.

I would also avoid pretending the model understands the full social or organizational context of a discussion. It understands the text you gave it. That is useful, but it is narrower than people sometimes want to admit.

From an architecture standpoint, I think it is worth investing early in the boring parts: request visibility, provider abstraction, retry behavior, and clear boundaries between application logic and model access. Those details do not make for flashy demos, but they do make the system easier to operate.

That is another reason I liked the combination of Cloudflare AI Gateway and the AI SDK. It gave me a cleaner path to building the feature as part of a broader system rather than as a one-off prompt call buried somewhere in the codebase.

## Closing thoughts

What I like about this project is that it made AI feel like engineering again.

There was a real problem. There was a reasonable place to apply a model. There were clear failure modes. There were infrastructure decisions that mattered. And there was a measurable improvement in how quickly I could recover context from messy conversations.

That, to me, is the interesting part of AI integration.

The challenge is not to make a model produce impressive text once. The challenge is to fit that capability into a system in a way that is observable, dependable, and actually useful to the person on the other end.

Conversation summarization turned out to be a good example of that. It is a modest feature, but it exercises a surprisingly rich set of concerns: interface design, prompt design, data shaping, reliability, and the distributed systems work required to make asynchronous components behave predictably.

I came away from it with the same conclusion I have had about a lot of software problems. The hard part is usually not proving that something can work. The hard part is making it work in a way that deserves to be trusted.