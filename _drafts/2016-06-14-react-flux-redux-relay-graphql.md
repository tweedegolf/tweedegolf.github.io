---
layout: post
title: React components and state management
date: "14-06-2016"
tags: React Redux Flux state management
thumb:
leadimg:
author: Daniel
contact: Daniel
about:
description:
github: https://github.com/tweedegolf/pinterest-slider
nerd: 4
---



###Introduction

React has increasingly become a popular choice for building complex interactive front-ends. One of the great benefits of React is that we can create reusable components. A component is reusable if it is not hard-wired to the application or to the application state.

Such components are often referred to as dumb components; these components can be rendered without needing any internal logic. They might need some properties and these can be passed in from parent components.

Parent components can be other dumb components or smart components. A smart component has logic that makes decisions which components to render, what data to fetch and might hold (a part of) the application state or listens for state changes.

Apart from dumb opposed to smart you may find other naming pairs such as presentational and container, skinny and fat, stateful and pure, screens and components and so on. I will use component (dumb) and container (smart).

The idea of this article is to show that well-defined components can be reused in different applications.

This will be illustrated by discussing a simple application in 2 versions: a version that uses Flux and a version uses Redux for state management.

The Redux version has 2 variants; the first uses the standard action creators and Thunk middleware for async actions, and the second one creates actions more like Flux does. I will discuss this more in detail below.



### The idea of the app

The application shows all images in a Pinterest board in a continuous slideshow. After you log in to your Pinterest account the application fetches all your public boards, then you can select a board, set the interval between two consecutive images and finally press 'start' to start the slideshow.


###The structure of the app

The code of the application is at [github](https://github.com/tweedegolf/pinterest-slider) and a live version can be found [here](https://abumarkub.net/pinterest-slider/).

For maintainable and reusable code it is generally recommended to use as little components with state (i.e. containers) as possible. Because our application is fairly simple, it only needs one container. It is called App in the file /containers/app.js

Based on a display state the container renders one of the following components:

1. Authorize &rarr; shows a button that leads to a popup where you can login to Pinterest and authorize the application to access your public boards
2. Configure &rarr; lets you choose a board, set the interval between the images and start the slide show
3. ImageSlider &rarr; the slideshow automatically (and infinitely) showing all images in the selected board
4. A plain div showing a progress message

Instead of display states I could have use [routes](https://github.com/reactjs/react-router) as well.


###The structure of the state

Our state can be subdivided in the following categories:

1. display state
2. selected board
3. selected interval
4. all public boards
5. all images from selected board
6. the index of the current image in the slide show

Number 1 is the overall application state that determines which component to render, and together with number 2 and 3 it is dependent on user interaction. Number 4 and 5 represent the data fetched from the server (i.e. the data state) and number 6 gets updated automatically by code, more specific by `setInterval`.


###Comparing the 2 versions

If you compare the code of the App container you will see that in all versions the properties and actions needed by the components are passed in from the container, however the way this is done differs.

In the Flux version the App container is wrapped in a flux Container and as a result it gets automatically notified of state changes. In the Redux versions we need to add that functionality by using the `@connect` decorator. The connect decorator enhances the container so it can receive state changes and dispatch actions.

Both the Flux and the Redux versions dispatch actions to alter the state in a store. In Flux we use the `AppDispatcher` and in Redux we use its `dispatch` method. But there is a small difference between Flux and Redux in the way async actions are handled.

In Redux you use action creator functions that return actions which are passed as argument in the dispatch method. For async actions the dispatch method must be able to dispatch a function instead of a plain object. Thunk middleware handles this for us; with Thunk we can return a function that wraps around a Promise as you can see for example in the code of the `checkSession` function in `actions.js`.

However the second variant of the Redux version does not use Thunk middleware; just like Flux the actual dispatch happens in the action creator function. The dispatch method is imported into the file `actions.js` and as a result we don't need to implement the `mapDispatchToProps` function in the container.

To conclude take notice that all components are exactly the same in all versions of the application; because the components are completely decoupled they can be used in applications that use very different state management technologies.


###Conclusion

Although this article only shows that you can reuse components in 3 different versions of the *same* application, I think it is save to say that we can extrapolate this to a situation where we reuse components in very different applications. If you keep in mind during designing that your application should have as little state (thus containers) as possible, you will see that you automatically end up with reusable components.



###Links for further reading

[different Flux implementations](http://jamesknelson.com/which-flux-implementation-should-i-use-with-react/)

[smart and dumb components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.5zv6s0dag)

[smart and dumb components](http://jaketrent.com/post/smart-dumb-components-react/)

[async requests](http://www.code-experience.com/async-requests-with-react-js-and-flux-revisited/)

[getting data from an API](https://medium.com/@tribou/flux-getting-data-from-an-api-b73b6478c015#.164yw4ysk)

