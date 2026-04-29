---
title: "Weeks Sixteen & Seventeen"
date: 2017-12-20T16:19:34-05:00
draft: false
tags: ["Node.js", "Socket.io", "WebSockets", "JavaScript","MySQL", "Sequelize", "Handlebars", "Express"]
---

It has been a challenging last couple of weeks. We concurrently covered testing, both unit and functional, and completed our second group project. One of the toughest aspects of our group project is simply coming up with an idea for an application. We kicked around a few ideas, but eventually led drawing game, kind of like Pictionary, where one player has a clue and other player must guess what the drawer is, *drawing*. We came across WebSockets, which allows for peer to peer communication between over TCP. This would allow us to share what the person is drawing on their Canvas. We used Socket.io, which implements WebSockets and ties in nicely with Node. Also using Socket.io, I implemented a chat function, which was also used as a method the messages that control the functions of the game.

This project turned out to be a huge undertaking considering the time constraints we were under. Besides creating an app that demonstrates basic CRUD functionality, as were the requirements of project, we created a real time game *with* chat. With that being said, if I had to do it over again, I may have suggested we just create a glorified blog. Though, it was a good learning experience.

Below is a screenshot of the app. Here is a link to the [live](https://doodlebuddy.herokuapp.com/) version of the site and a [link](https://github.com/Doodle-Buddy/Doodle-Buddy) to the Github repository.

![Doodle Buddy Screenshot](/img/doodle_buddy.png)