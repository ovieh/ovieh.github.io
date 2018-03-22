---
title: "Final Project"
date: 2018-02-26T16:28:51-05:00
draft: false
tags: ["React", "Redux", "JavaScript", "Project", "WebRTC", "Socket.io"]
---

The remaining three weeks of class were mainly devoted to the development of our final projects. In that time we we also covered React in more depth and went over some some Computer Science fundamental, data structure and algorithms. 

I am not quite sure why I am so fond of React. Perhaps it feels like it gives needed structure to the front-end. And adding even more structure, we covered Redux. [Redux](https://redux.js.org/) provides a predictable state container for JavaScript apps. What that means is that handles the state for your entire application, it provides a *single source of truth*. For something that is relatively simple, it is difficult to grasp exactly why you would need or want to use Redux. Through abstraction it provides predictable methods of accessing and modifying state. I would go on to use it along with React in my group’s final project.

After our primer of Redux, we covered some of the Comp Sci stuff commonly brought up in technical interviews. I feel the week we spent on this subject was insufficient. Knowing what a Linked List is does not really help me much in a interview where I am asked to implement one to solve a problem. I know that Data Structure & Algorithms are often separate, several credit university courses, but I wish we spent more time on interview prep. I could envision a course where it assumed that you know basic HTML, CSS and what a variable is and the entire getting comfortable programming section is skipped. With a Data Structure and Algorithms section in its place. But that would probably not be as appealing to people without a programming background.

The remaining few weeks were entirely dedicated to our final projects. Unlike previous projects, we had to pick our own teams. I had an idea for a project, an app that would facilitate pair programming, allowing a two or more people to share a development environment. The people that I had idea pitched them to the class. I was worried that I would not have any takers, but that was not a problem at all.

My original idea was to use the new features in Visual Studio Code and Atom that allow users to share an editor, then share the screen of the user using WebRTC. The instructor and a TA advised against that, and suggested share a Sockets.io to share html element. That approach is far less expensive in terms of resources, but more demanding of me as developer. I was responsible for overall site design and getting code to run safely in the browser. For the editor itself, I used Ace Editor. There is a React Component that I pulled in customized. 

Now the hard part was finding a way to run the code that users submit without blowing up the universe, or worse crashing my site. I eventually landed on a module called [VM2](https://github.com/patriksimek/vm2). It runs code in a sandbox and allows the implementation of timeouts, so if a user executes and infinite loop, it fails safely. When a user executes code it is sent to the back-end  and the result is returned to the browser.

Here is a link to the [live site](https://codenector.herokuapp.com/) and a link to [distribution](https://github.com/CodeNector/CodeNector) on Github.


![Splash Screen](/img/final_project1.png)
![Editor](/img/final_project2.png)









