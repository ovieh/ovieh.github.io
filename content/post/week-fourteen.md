---
title: "Week Fourteen"
date: 2017-11-26T10:20:22-05:00
draft: false
tags: ['Handlebars.js', 'Node.js', 'JavaScript', 'HTML', 'ORM', 'MySQL']
---

This week we dove deeper into Express and covered <a href="http://handlebarsjs.com/" target="_blank">Handlebars.js</a>, a html templating engine. HTML templating provides a bridge between our JavaScript and our content, allowing us to decouple our HTML structure of the data within. Handlebars provides pretty easy to understand syntax and even allows block expression. As an example, let say I had list of burgers I want to iterate through and add each burger as a list item, it would look like this:

```
<li>
	{{#each burgers}}
</li>
```

The each keyword is analogous to the JavaScript forEach method.

Our assignment this week was pretty silly. We were to design a burger logger. We created our own Object Relation Map and used the Model View Controller architectural pattern for the first time. The burger logger demonstrates a CRUD app with data persistence. It seems as we go on in this course, the more we have become concerned with configuration. Most of the work on this project involved working in predefined modules and our job was to string them together.

Here is a <a href=”V” target=”_blank”>link to live</a> site as well to the <a href=”https://github.com/ovieh/burger” target=”_blank”>source</a> on Github.

![Screenshot](/img/week-14.png)
