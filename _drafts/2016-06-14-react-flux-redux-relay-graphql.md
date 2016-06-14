---
layout: post
title: React components and state management
date: "14-06-2016"
tags: React Redux Flux Relay GraphQL state management
thumb:
leadimg:
author: Daniel
contact: Daniel
about:
description:
github: https://github.com/abudaan/pinterest-slider2
nerd: 3
---



###Introduction

React has increasingly become a popular choice for building complex interactive front-ends. One of the great benefits of React is that we can create reusable components. A component is reusable if it is not hard-wired to the application or to the application state.

Such components are often referred to as dumb components; these components can be rendered without needing any internal logic. They might need some properties and these can be passed in from parent components.

Parent components can be other dumb components or smart components. A smart component has logic that makes decisions which components to render, what data to fetch and might hold (a part of) the application state or listens for state changes.

Apart from dumb opposed to smart you may find other naming pairs such as presentational and container, skinny and fat, stateful and pure, screens and components and so on. I will use component (dumb) and container (smart).

This article discusses a simple application that logs in to your Pinterest account and fetches all your public boards. After selecting a board a slideshow containing all images in that board will start. Before you start the slideshow you can set the interval between two successive images.

I have created 3 versions of this application all using a different technology for managing the application state:

1. React with Flux
2. React with Redux
3. React with Relay and GraphQL

Obviously Relay and GraphQL are not designed for managing application state; they are designed for managing data fetching from a server. However since our application fetches data from the Pinterest server, and therefor maintains both a local application state based on user interaction and a data state based on what data has been fetched from the server, I thought it would be interesting to add it to the comparison.



###The structure of the app

The code of the application is at [github](https://github.com/abudaan/pinterest-slider2) and a live version can be found [here](https://abumarkub.net/pinterest-slider/).

The application has only one container, this is in line with the recommendations for maintainable and reusable code: to have as little components with state (i.e. containers) as possible. The container is called App and you can find its code in /containers/app.js

Based on a display state the container renders one of the following components:

1. Authorize &rarr; shows a button that leads to a popup where you can login to Pinterest and authorize the application to access your public boards
2. Configure &rarr; lets you choose a board, set the interval between the images and start the slide show
3. ImageSlider &rarr; the slideshow automatically (and infinitely) showing all images in the selected board
4. A plain div showing a progress message

Instead of display states I could have use [routes](https://github.com/reactjs/react-router) as well.


###The structure of the state

We can define our state as follows:

1. display state
2. selected board
3. selected interval
4. all public boards
5. all images from selected board
6. the index of the current image in the slide show

Number 1 is the overall application state that determines which component to render, and together with number 2 and 3 it is dependent on user interaction. Number 4 and 5 represent the data fetched from the server (i.e. the data state) and number 6 gets updated automatically by code, more specific by `setInterval`.


###Comparing the 3 versions

In the versions that use Flux and Redux both application state and data state are stored in one single store. In the Relay/GraphQL version the data state is stored in Relay and the application state is maintained in the App container itself; because our application state is fairly simple this is acceptable.

If you compare the code of the App container you will see that in all versions the properties and actions needed by the components are passed in from the container, however the way this is done differs.

The code of the Flux and the Redux versions look very much the same. In the Flux version the App container is wrapped in a flux Container and as a result it gets automatically notified of state changes. In the Redux version we need to add that functionality by using a decorator pattern.

Both the Flux and the Redux version dispatch actions to alter the state in a store. If you compare the `actions.js` and the `store.js` files of both versions you see that they are identical apart from the boilerplate code.

Note that I choose not to use an action creator as described in the Redux documentation; in `actions.js` the actions are both created and dispatched. This has 2 benefits: the code looks more similar to the Flux version and we don't need Thunk middleware for asynchronous actions. Asynchronous actions occur when data needs to be fetched from Pinterest.

In the file `actions2.js` you see a regular Redux action creator. If you want to use this version you need to change the App container and the store as well, as you see in respectively `app2.js` and `store2.js`. Differences are that in `app2.js` the App container is also decorated with a `mapDispatchToProps` function and in `store2.js` the Thunk middleware is added.

The Relay/GraphQL version is the odd one out here. Because the application state is maintained in the App container itself, this version doesn't need actions and a dispatcher, nor a separate store file. By wrapping the App container in a Relay container the server data gets automatically fetched and added to the props of the App container, which passes them on to the components.

One important thing to notice is that all components are exactly the same in the 3 versions; because the components are completely decoupled they can be used in applications that use very different state management technologies.


###Conclusion

During coding and refactoring the leading idea was to make the 3 versions as much similar to each other as possible. For the Flux and Redux versions I succeeded fairly well but the Relay/GraphQL version is clearly something different.

And I have even cheated a bit as well; as you might have noticed that the Relay/GraphQL version skips the Authorize component and the progress messages. This is done because I didn't want to alter the components Configure and ImageSlider; to use Relay/GraphQL properly I should have wrapped them in their own Relay containers so they fetch their own data as soon as the display state commands them to render. (@Erik: ik wil dit voorbeeldje eigenlijk ook nog even toevoegen)

For this simple Pinterest application we didn't need Relay/GraphQL. I wrote a wrapper around the Pinterest REST API and a small API around that wrapper which makes it very easy to use with Flux and Redux.

But in applications that require a lot of data fetching it is not a question of using Redux/Flux *or* Relay/GraphQL; application state management is best done with Redux, Flux or similar, whereas Relay/GraphQL shines in data state management.



###Links for further reading

[different Flux implementations](http://jamesknelson.com/which-flux-implementation-should-i-use-with-react/)

[smart and dumb components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.5zv6s0dag)

[smart and dumb components](http://jaketrent.com/post/smart-dumb-components-react/)

[async requests](http://www.code-experience.com/async-requests-with-react-js-and-flux-revisited/)

[getting data from an API](https://medium.com/@tribou/flux-getting-data-from-an-api-b73b6478c015#.164yw4ysk)

