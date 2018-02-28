---
title: "Weeks Eight & Nine"
date: 2017-10-15T21:17:05-04:00
draft: false
tags: ["Javascript", "JSON", "Firebase", "Azure"]
---
The  last couple of weeks were spent working on our first group project. It was quite the learning experience. The first obstacle was to figure out what exactly we should do for a project. I first suggested a music based food recommendation app. That really did not go anywhere. It’s not a terrible idea. We eventually landed on an app that would give you movie recommendations based on your facial expression.

My responsibilities in the project were to get an image from a webcam, use an API to determine the user’s mood, and also to implement authentication.

We ended up using [WebRTC](https://webrtc.org/). This was actually a suggestion by our instructor and a TA. I originally proposed having the user upload a picture.  I think it made project a bit more streamlined for the end user. They suggested it with the rationale that it would be easier than the upload route. I am not quite sure that is truly the case. It could have just been my development environment, but it was originally pretty tricky to get it working.

A couple of weeks prior we had seen [Faceplusplus](https://www.faceplusplus.com/), an  API that could determine facial expressions from stills demoed, so we knew it was possible. Upon browsing their docs and not being entirely impressed by the robustness, I went looking for alternatives. I quickly came upon [Microsoft Azure Emotion API](https://azure.microsoft.com/en-us/services/cognitive-services/emotion/), which had some pretty great documentation. The first hiccup came from my initial Ajax call. The format the our webcam still was in, Base64, is not compatible with the Emotion API. I found a little function that would convert the Base64 image into Blob, or Binary Large Object. These are all fun learning experiences.

So now we have a picture, we get an response object from our Ajax call that contains emotional indexes. Now what to do with those emotions. Instead of spending the next few years coming up a complex an emotional model, I just the reduce method to find the highest value in the object and return key.

My partner had the responsibility of implementing the [Movie DB API](https://www.themoviedb.org/documentation/api) and creating a simple algorithm to relate emotional responses to movie categories. Our other partner took care of the front end. My other responsibility was to implement [Firebase](https://firebase.google.com/docs/) both for Authentication and their Database for persistence. My biggest hurdle with implementing Firebase was trying to figure out which ruleset would allow the user’s login information to be used as a key in the database. Thankfully Google Firebase’s documentation is also awesome. I spent most of my time reading documentation, most of the answers I sought were right there for the taking.

Overall I am very happy with the work we did. I think our app demonstrated creativity and used everything we had learned so far in the class fully. One fault of mine, is that choked a bit during our presentation. In the future I will ensure to set myself up for success. We can have the best product but if the messaging is wrong, we will have a hard time succeeding.

Here is a [link](https://github.com/ovieh/Movie-Feels) to our project's Github page and a [link](https://feel-to-reel.firebaseapp.com/) to the deployed site.

![Feel to Reel](/img/week_8_9.png)
