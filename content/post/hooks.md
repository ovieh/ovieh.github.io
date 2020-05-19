---
title: "Hooks & More!"
date: 2019-05-13
draft: false
tags: ["React", "Suspense", "MongoDB","Node", "Express", "React Hooks"]
author: "Ovieh"
---

I decided to create a <a href="https://github.com/ovieh/react-scraper" rel="noreferrer noopener" target="_blank">project</a> to familiarize myself with some newer additions to React. I built upon a previous full stack web app I created that uses Handlebars for the view layer. This new app uses some new features in React, such as Hooks and Concurrent React. The app scrapes the New York Times Technology page and displays a list of articles to user. It also allows the user to save articles and to comment on those articles. The backed uses MongoDB and Mongoose as ORM. 

### What are hooks?

Hooks are functions that allow developers to access state without writing a class. Why would anyone want to access state without writing a class? Functional Components are just easier to read with less boilerplate, compared to their class brethren. Compare the following to excerpts.


``` jsx
import React from "react";

class Person extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      name: 'Smuckatelli',
      age: 20
    }
  }

  render(){
    return(
      <div>
        <p>Your name is {this.state.name} and your are {this.state.age} years old.</p>
        <button onClick={() => this.setState({ age: this.state.age + 1 })}>Age a Year</button>
      </div>
    );
  }
}
```

``` jsx
import React, { useState } from "react";

const Person = () => {
  const [name, setName] = useState('Smuckatelli');
  const [age, setAge] = useState(20);

  return (
    <div>
      <p>Your name is {name} and your are {age} years old.</p>
      <button onClick={()=> setAge(age + 1)}>Age a Year</button>
    </div>
  );

}

```

The previous excerpts are functionally the same. I find the second far easier to read and concise. Also, I have personal dislike
of the *this* keyword, so any chance to be rid of *this* is a win to me. What makes the second excerpt work is the useState function which returns a pair: the *current* state value and a function that allows you to update that value. 

Other than *useState*, the other provided Hook I used in this project is *useEffect*. In Functional Components, it is the lone lifecycle method available. My project calls the API when the page is loaded, to do this with classes, I would need to place the API call in *componentDidMount* lifecyle method, followed with a *componentDidUnmount* method to handle any cleaning up that needs to take place. Using Hooks, the *useEffect* methods handles both those previous methods. An example of its use is below.

``` jsx
import React, { useState, useEffect };

const Home = () => {
  const [articles, setArticles] = useState();

  useEffect(()=> {
    const result = API.getArticles();
    setArticles(result);
  }, []);
}
```

The previous excerpt updates the *articles* variable via the *setArticles* function utilizing the useEffect hook. I then pass in empty array as an argument to let *useEffect* know only to run and clean it up only once, on mount and unmount. Without that empty array, *useEffect* will be run on every render.

### Custom Hooks!

Besides the built-in hooks provided, two of which I have demonstrated the use of, you build your own custom hooks! This is useful in keeping your codebase DRY and encouraging reuse. In this project I created a custom hook that combines state and localStorage. Just to keep things snappy, instead of calling the API on each pageload, the current sessions article data is stored in localStorage. If it is exsists, the state is set to what is contained in localStorage. As I write this, it occurs to me that sessionStorage may be a fitter fit for this application. Be that as it may, the code for my custom hook *useStateWithLocalStoarge* is below.

``` jsx
const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(localStorageKey)) || ''
  );

  useEffect(()=> {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

```

By convention, hooks begin with *use*, as in *useState*, or *useEffect*. This lets linters know that this function is a hook. This hook returns a value and function that controls that value. To use this hook, it is pretty much identitical to *useState*, only uou pass in a localStorageKey.

### Suspense and Being Lazy
The final new(ish) React features I implemented are some of the Concurrent React features including *Suspense* and *React.lazy*. *React.lazy* leverages Webpack and allows for *lazy* or dynamic loading. Instead of delivering all components at once, we can decide to have them load when the parent component gets rendered. What if the parent component is not yet loaded, what is displayed in its place? Prior to *Suspense*, nothing. *Suspense* allows developers to set a fallback component while we are waiting for component that is being dynamically loaded.

While <a href="https://reactjs.org/blog/2018/11/27/react-16-roadmap.html" target="_blank" rel="noreferrer noopener">not ready</a> for production Concurrent React is pretty cool. As of React 16.8, *Concurrent Rendering* is unstable, but from the tests I have run, works pretty impressively. How it works, I do not know, but React somehow prioritizes what is being loaded and rendered. *Suspense* currently works without *Concurrent* mode being active, but there appears to be more blocking while rendering.

Here is a <a href="https://techsearch.herokuapp.com/" rel="noopener noreferrer" target="_blank">link</a> to the app itself and here is a <a href="https://github.com/ovieh/react-scraper" rel="noreferrer noopener" target="_blank">link</a> the code in my repository.
