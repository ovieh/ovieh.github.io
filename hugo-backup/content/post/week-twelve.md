---
title: "Week Twelve"
date: 2017-11-11T21:47:12-05:00
draft: false
tags: ['Node.js', 'MySQL', 'JavaScript']
---

This last week I became reaquainted with MySQL. It’s not so bad. The syntax is relatively straightforward. The keywords are close to to natural language. This was another week getting familiar with the power of Node.js. It is really easy to integrate some really powerful tools.

Our assignment this week was to create backend for store using MySQL running on Node.js.Working with MySQL was pretty straightforward, updating, selecting from, and inserting into the database. The challenge I faced this week was dealing with asynchronous JavaScript. I found some of my function calls would sort of get take effect at the same time, or at some unforeseen time. I dealt with this my implementing callbacks. I am going to look into other ways of tackling this problem. The new hotness in ES7 is Async / Await, which offers solutions with asynchronous code. Async actually implements Promises, which was the last great hope with dealing with funny timing. So before I tackle async / await, I need to get a handle on promises.

Here is a [link](https://github.com/ovieh/bamazon) to my Github repository where my source lives.

### Customer View

![Customer View Gif](/img/customer.gif)

### Manager View

![Manager View Gif](/img/manager.gif)