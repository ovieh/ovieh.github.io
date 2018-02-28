---
title: "Week Ten"
date: 2017-10-23T13:44:54-04:00
draft: false
tags: ["Javascript", "Node.js", "NPM"]
---

This has been my favorite week of learning yet. This was our introduction to <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwiyxpH93ofXAhVi2IMKHV8HBrsQFggoMAA&url=https%3A%2F%2Fnodejs.org%2F&usg=AOvVaw1tY2p-vJFWJmxWlq4sTxCn" target="_blank">Node.js</a>, which is a JavaScript runtime engine. What that all means is that it allow us to use JavaScript outside of the browser. That opens up doors.
![Obama Kicking Open Door!](https://media.giphy.com/media/xjqNH3Bml1gTC/giphy.gif)

Prior to Node.js developers had to learn a second language for the backend, such as PHP or Java. Now, no need. With just one language a developer can handle the tasks of both the front and backend of the stack.

Node.js comes bundled wite Node Package Manager. NPM provides packages, or libraries, that other developers have created. This is relevatory. Standing on the shoulders of giants and what not.

Our project this week was to create Siri-like program, LIRI - Language Interpretaption Recognition Interface. The program has three modules, each using a different NPM Package. Using the <a href="https://www.npmjs.com/package/twitter" target="_blank">Twitter</a> NPM package, we were to display a users last twenty tweets with a timestamp. Using the <a href="https://www.npmjs.com/package/node-spotify-api" target="_blank">Node Spotify App</a> package we returned song info when given a song title. Using the <a href="https://www.npmjs.com/package/request" target="_blank">Request</a> package we called the OMDB database to return movie information. The request and the response were both appened to a log, using the built in FS node pagkage.

Here's a <a href="https://github.com/ovieh/liri-node-app" target="_blank" alt="link to source">link</a> to to source code on Github.

