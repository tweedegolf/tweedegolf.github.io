---
layout: post
title: "Intelligent design"
date: "2015-08-14"
layout: post
thumb: yga-beregening2-5.png
leadimg: yga-beregening2-5.png
tags: intelligent advice, knowledge based systems, 3d framework, heat map
author: Bram
nerd: 2
---

In 2014 we won an innovation grant from the province of Gelderland based on our proposal to provide 'intelligent' gardening advice to users of [Draw Your Garden](http://tekenjetuin.nl), a web application we created for our client and have been gradually expanding since its release. In the app users can design their garden, view it in 3D, order different products and even contact gardeners that can submit proposals based on the users' design. 

![Draw Your Garden](/img/blog/tekenjetuin.png){:.with-caption}
*Draw Your Garden / Teken je Tuin*


Partnered with Draw Your Garden we proposed to develop a number of prototypes aimed at assisting users in several areas, areas which hitherto required much expert knowledge. Appropriately, we named this project 'Your GardenAssistant'. 

For the project we focused on three areas of garden design:

* **Advice on watering a garden**; placing different kinds of sprinklers, what kind of plants need more water, which types of sprinklers are suited to different parts of the garden and how sprinklers should be connected to what kinds of water source.
* **The presence and influence of sunlight and shadow in the garden**; to show which areas of the garden receive the most light in different seasons and parts of the day, where to place a terrace and where to plant different sorts of plant. 
* **Advice on the properties of plants and trees;** which plants would prosper in different parts of the garden, how many plants flower this month, what plants are edible or poisonous?

###Domain knowledge and user feedback

The first thing we realised was that it would be crucial to involve different kinds of experts, gardeners and users in the project. We decided to involve them from the very start of the project, and to check back with them frequently to decide how to proceed.

![The Plant Advice Prototype](/img/blog/yga-aanpak.png)

###3D design

The first task was to create a suitable 3D design and drawing application based on our [3D Framework](/3d-framework/). Our approach is to use a full 3D environment with an top-down view for drawing. This view, a kind of orthographic projection, provides the advantages of 'flat', easy-to-use interaction during drawing and design, with the full 3D experience just one camera shift away.

![Design tool](/img/blog/tjt-2d.png){:.with-caption}
*Drawing in full 3D with a top-down perspective.*

![Design tool](/img/blog/tjt-3d.png){:.with-caption}
*The same garden, but rotated slightly*

###Watering

To be able to give advice about watering a garden we created a 'provided graph' and a 'moisture graph', to store how much water the sprinklers provided, and how much water different parts of the garden required.
We used these to create a wizard designed to help a user choose the right kinds of sprinkers, to choose a water source and to connect these, all in a few easy steps.

![The Plant Advice Prototype](/img/blog/water2.png){:.with-caption}
*Provided graph: how much water is provided. Note that the sprinkler on the bottom-right is not connected to a water source.*

![The Plant Advice Prototype](/img/blog/water1.png){:.with-caption}
*Moisture graph: green areas receive enough water, red areas too little or possibly too much (if they do not require water, like the terrace).*

###Sunlight and shadows

The first thing here was to create a 'heat map' to represent the areas of the garden with the most sun. To do this we created a realistic simulation of the sun in our 3D environment of the garden. This process can be seen in more detail [in this simulation](/3d-framework/#3d-simulatie). The 'heat map' was needed in the background for the plant advice. We also created a nice user-friendly interface for users to intuitively find which parts of the garden have the most sun in different seasons and moments of the day.

[TODO: Create a new Zonnestand movie]

###Plant advice

Giving intelligent advice about which plants to use in a garden and where best to place them was arguably the most challenging part of the project. Especially since unwanted advice can very easily irritate a user a great deal. 

Based on feedback from our focus groups and surveys we decided to adopt an approach inspired by knowledge-based systems. We created a modular system of multiple 'Advisors', all of which provide advice or warnings based on a simple rule. For instance, we created a GrowthAdvisor based on the simple rule that fast-growing plants should not be placed too close together. 

In this way we could easily create many more advisors based on all sorts of simple rules.

![Advice](/img/blog/Assistant.jpg){:.with-caption}
*Different kinds of advice*

We also put a lot of thought into possible user interfaces to best present the most relevant advice, based on user preference. Our method and results will be described in more detail in a future blog. 

###Light sources
As an extra topic we took some time to investigate the possibilities offered by Three.js, the javascript 3D library, to add different sorts of realistic light sources to our prototypes. The difficulties we encountered led us to continue our research on this topic outside of the scope of Your GardenAssistant.

Read more on lighting in Three.js:

* [Pointlight shadows in Three.js](/2015/05/21/point-light-shadows-in-threejs/)
* [Pointlight shadows in Three.js, part II](/2015/08/10/point-light-shadows-ii/)

###Conclusions
Creating a design application is not an easy task. Creating a design application where users receive meaningful advice during the design process is, well, a major challenge. The grant gave us the opportunity to seriously engage these challenges.
Looking back we are very happy with the results. The translation from data (i.e. plant properties as well as data generated from simulations) to guidance, by means of advisors, turned out to be both feasible and elegant.  
Looking to other domains: we feel this approach is suitable for design apps and product configurators in many domains. Don't hesitate to [contact us](/#contact) if you want to explore the possibilities.

###Thanks
We would like to thank all the participants of this project, in particular:

* The province of Gelderland, for making the project possible
* Teken je tuin, our partner for this project
* All participants from the focus groups and test groups
* The users of Draw Your Garden for providing us with much useful feedback

