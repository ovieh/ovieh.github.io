---
title: "Week Eighteen"
date: 2018-01-08T11:57:51-05:00
draft: false
tags: ["Cheerio", "Node.js", "Express", "MongoDB", "Mongoose", "Handlebars"]
---
This week we added another tool to our toolbox, [MongoDB](https://www.mongodb.com/). And unlike MySQL, it does not care what you put in to it. It just accepts the data. Which is a blessing and a curse. To remedy this, there exists a project called [Mongoose](http://mongoosejs.com/). Mongoose provides a MondoDB database with an ORM, which allows for validation. Since we previously learned Firebase, it was relatively easy to pick up Mongo. We just had to learn how to implement it with Node.

Our project this week was a create news site scraper. To actually scrape the site [Cheerio](https://cheerio.js.org/), which markets itself as a slimmed down version of the core functionality of jQuery. We take the data we scraped using Cheerio and store the article metadata in Mongo collection. We pull that data using Express and and render it to the screen using Handlebars. The app allows users to save save articles and to comment on save articles. To be honest, making a relation between the saved article and its comments was a bit tricky, using Mongoose’s [populate](http://mongoosejs.com/docs/populate.html) feature. Perhaps this is because we were using a nonrelational data. A user can also delete comments and unsave articles.

Below is a screen shotof the app. Here is a [link](https://mongoosenews.herokuapp.com/) to the live site and a [link](https://github.com/ovieh/Tech-News-Scraper) to the Github repository. 
![News Scraper Screenshot](/img/week-18.png)
