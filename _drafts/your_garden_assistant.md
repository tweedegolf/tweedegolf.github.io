---
layout: post
title: "Your GardenAssistant"
date: "2015-07-31"
layout: post
thumb: yga-beregening2-5.png
leadimg: yga-beregening2-5.png
tags: your gardenassistant, intelligent advice, knowledge based systems, 3d framework, heatmap, moisturegraph
author: Bram
nerd: 2
---

In 2014 we won an innovation grant from the province of Gelderland based on our proposal to create 'intelligent' advice for the users of the gardening related [Draw Your Garden](http://tekenjetuin.nl), a website we made previously and have been gradually expanding for the last few years. Draw Your Garden is a website where users design their garden, view it in 3D, order different products and even contact gardeners that can submit proposals based on the users' design. 

![Draw Your Garden](/img/blog/tekenjetuin.png){:.with-caption}
*Draw Your Garden / Teken je Tuin*

Partnered with Draw Your Garden we proposed to develop a number of prototypes aimed at assisting users in several areas, areas which hitherto required much expert-knowledge. Appropriately, we named this project 'Your GardenAssistant'. 

For the project we focused on three areas of garden design:

* **Advice on watering a garden**; placing different kinds of sprinklers, what kind of plants need more water, which types of sprinklers are suited to different parts of the garden and how sprinklers should be connected to what kinds of water source.
* **The presence and influence of sunlight and shadow in the garden**; to show which areas of the garden receive the most light in different seasons and parts of the day, where to place a terrace and where to plant different sorts of plant. 
* **Advice on the properties of plants and trees;** which plants would prosper in different parts of the garden, how many plants flower per month, what plants are edible or poisonous.

###Approach

The first thing we realised was that, as almost none of us even has a garden, it would be crucial to involve different kinds of experts, gardeners and users in the project. To compensate for our own lack of knowledge we decided to involve experts and users from the very start of the project, and to check back with them frequently to decide how to proceed.

![The Plant Advice Prototype](/img/blog/yga-aanpak.png)

###Full 3D Drawing

The first task was to created an improved version of our [3D Framework](/3d-framework/), with full 3D drawing with a top-down view. This means that every part of the tool, even the drawing interface, is in full 3D.

![Design tool](/img/blog/tjt-2d.png){:.with-caption}
*Drawing in full 3D with a top-down perspective.*

![Design tool](/img/blog/tjt-3d.png){:.with-caption}
*The same garden, but rotated slightly*

###Outcome: watering

To be able to give advice about watering a garden we created a 'provided graph' and a 'moisture graph', to store how much water the sprinklers provided, and how much water different parts of the garden required.
We used these to create a wizard designed to help a user choose the right kinds of sprinkers, to choose a water source and to connect these, all in a few easy steps.

![The Plant Advice Prototype](/img/blog/water2.png){:.with-caption}
*Provided graph: how much water is provided. Note that the sprinkler on the bottom-right is not connected to a water source.*

![The Plant Advice Prototype](/img/blog/water1.png){:.with-caption}
*Moisture graph: green areas receive enough water, red areas too little or possibly too much (if they do not require water, like the terrace).*

###Outcome: sunlight and shadows

The first thing here was to create a 'heatmap' to represent the areas of the garden with the most sun. To do this we created a realistic simulation of the sun in ourt ful 3D rendering of the garden. This process can be seen in more detail [a previous blog](/3d-framework/#3d-simulatie). The 'heatmap' was needed in the background for the plant advice. We also created a nice user-friendly interface for users to intuitively find which parts of the garden have the most sun in different seasons and moments of the day.

[Create a new movie]

###Outcome: plantadvice

Giving intelligent advice about which plants to use in a garden and where best to place them was arguably the most challenging part of the project. Especially since unwanted advice can very easily irritate a user a great deal. 

Based on feedback from our focusgroups and surveys we decided to adopt an approach inspired by knowledge-based systems. We created a modular system of multiple 'Advisors', all of which provide advice or warnings based on a simple rule. For instance, we created a GrowthAdvisor based on the simple rule that fast-growing plants should not be placed too close together. 

In this way we could easily create many more advisors based on all sorts of simple rules.

![Advice](/img/blog/Assistant.jpg){:.with-caption}
*Different kinds of advice*

We also put a lot of thought into possible user-interfaces to best present the most relevant advice, based on user preference. Our method and results will be described in more detail in a future blog. 

###Extra: Garden lighting
As an extra topic we took some time to investigate the possibilities offered by three.js to add different sorts of realistic light sources to our prototypes. The difficulties we encountered lead us to continue out research on this topic outside of the scope of Your GardenAssistant.

Read more on lighting in three.js:

* [Pointlight shadows in threejs](/2015/05/21/point-light-shadows-in-threejs/)
* [Pointlight shadows II](/2015/08/10/point-light-shadows-ii/)

###Thanks
We would like to thank all the participants of this project, in particular:

* The province of Gelderland, for making the project possible
* Teken je tuin, our partner for this project
* All participants in one of the focusgroups and testgroups
* The users of Draw Your Garden for provided us with much useful feedback

