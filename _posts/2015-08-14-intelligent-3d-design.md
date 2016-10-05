---
layout: post
title: "Adding artificial intelligence to 3D design"
date: "2015-08-14"
layout: post
thumb: yga-beregening2-5.png
leadimg: yga-beregening2-5.png
tags: intelligent advice, knowledge based systems, 3d framework, heat map
author: Bram
contact: Bram
about: AI and our 2d framework
nerd: 2
---

In 2014 we won an innovation grant from the province of Gelderland based on our proposal to provide 'intelligent' gardening advice to users of [Draw Your Garden](http://tekenjetuin.nl) (Dutch: Teken Je Tuin). We created this web application for one of our clients and we have been gradually expanding it since its release. In the app users can both design their garden and view it in 3D as well as order products and contact gardeners, who in turn can submit proposals based on the users' design.

In this article we will give you an overview of how we created methods that allow users to design their gardens intelligently. We think these methods could translate nicely to domains outside gardening. We are curious if you feel the same after reading this article.

![Draw Your Garden](/assets/img/blog/tekenjetuin.png){:.with-caption}
*Draw Your Garden / Teken je Tuin*

Partnered with our client we proposed to develop a number of prototypes aimed at assisting users in several areas which hitherto required extensive expert knowledge. Appropriately, we named this project 'Your GardenAssistant'.

For the project we focused on three areas of garden design:

* **Advice on watering a garden**; where to place different kinds of sprinklers, what kind of plants need more water, which types of sprinklers are suited to different parts of the garden and how sprinklers should be connected to what type of water source.
* **The presence and influence of sunlight and shadow in the garden**; to show which areas of the garden receive most light in different seasons and parts of the day, where to locate a terrace and where to plant different sorts of plant.
* **Advice on the properties of plants and trees;** which plants would prosper in different parts of the garden, how many plants flower this month, what plants are edible or poisonous.

### Domain knowledge and user feedback

The first thing we concluded was that it would be crucial to involve different kinds of experts, gardeners and users in the project. We realized we needed to include them from the very start of the project, and to check back with them regularly to decide how to proceed.

![The Plant Advice Prototype](/assets/img/blog/yga-aanpak.png)

### 3D design

The preliminary task was to create a suitable 3D design & drawing application based on our [3D Framework](/3d-framework/). Our approach is to use a full 3D environment with an top-down view for drawing. This view, a kind of orthographic projection, provides the advantages of 'flat', easy-to-use interaction during drawing & design, while the full 3D experience is just one camera shift away.

![Design tool](/assets/img/blog/tjt-2d.png){:.with-caption}
*Drawing in full 3D with a top-down perspective.*

![Design tool](/assets/img/blog/tjt-3d.png){:.with-caption}
*The same garden, but rotated slightly*

### Watering

To be able to give advice about watering a garden we created a 'provided graph' and a 'moisture graph', to store how much water the sprinklers provided, and how much water different parts of the garden required.
We used these to create a wizard designed to help the user choose both the right type of sprinker and a water source, and to connect these two, all in a few easy steps.

![The Plant Advice Prototype](/assets/img/blog/water2.png){:.with-caption}
*Provided graph: how much water is provided. Note that the sprinkler on the bottom-right is not connected to a water source.*

![The Plant Advice Prototype](/assets/img/blog/water1.png){:.with-caption}
*Moisture graph: green areas receive enough water, red areas too little or possibly too much (if they do not require water, like the terrace).*

### Sunlight and shadows

The first thing here was to create a 'heat map' to represent the areas of the garden with the most sun exposure. To do this, we created a realistic simulation of the sun in the 3D representation of the garden. This process can be seen in more detail [in this simulation](/3d-framework/#3d-simulatie). The result of the 3D simulation, the 'heat map', is used later on when the user adds plants to the garden design: we can quickly look up the amount of sunlight at the precise spot the plant is placed.
Apart from the heat map we also created a nice user-friendly interface which allows users to instantly see which parts of the garden receive the most sun in a selected season and hour of the day.

<iframe src="https://player.vimeo.com/video/136615103" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>{: .with-caption}
*3D sunlight simulation*

Side note: during the project we also looked into artificial light sources. If you are a developer you might be interested in our findings about [Point light shadows in Three.js](/2015/05/21/point-light-shadows-in-threejs/). Three.js is the javascript 3D library most widely used to create 3D web apps with WebGL.

### Plant advice

Giving intelligent advice about which plants to use in your garden, and where best to place them, was arguably the most challenging part of the project. Especially since unwanted advice can very easily irritate a user a great deal.

Based on feedback from our focus groups and surveys we decided to adopt an approach inspired by knowledge-based systems. We created a modular system of multiple 'Advisors', all of which provide advice or warnings based on a simple rule. For instance, we created a GrowthAdvisor based on the simple rule that fast-growing plants should not be placed too close together. This way we could easily create many more advisors based on all sorts of simple rules.

![Advice](/assets/img/blog/Assistant.jpg){:.with-caption}
*An early mockup of the advice UI*

In addition to our conceptual and technical efforts we also put a lot of thought into UI approaches, i.e. how to best present the most relevant advice. We hope to come back to this in a future blog.

### Conclusions
Creating a design application is not an easy task. Creating a design application in which users receive meaningful advice during the design process is, well, a major challenge. The grant gave us the opportunity to seriously engage these challenges.
Looking back we are very happy with the results. The translation from data (i.e. plant properties as well as data generated from simulations) to guidance, by means of advisors, turned out to be both feasible and elegant.  
Looking at other domains, we feel this approach is applicable to design apps and product configurators in a great variety of fields. Don't hesitate to [contact us](/#contact) if you want to explore the possibilities. We look forward to working on a challenging project like this one in the future.

### Thanks
We would like to thank all the participants of this project, in particular:

* The province of Gelderland, for making the project possible
* Teken je tuin, our partner for this project
* All participants from the focus groups and test groups
* The users of Draw Your Garden for providing us with useful feedback
