---
layout: post
title: "physics in three.js"
date: "2015-07-02"
layout: post
thumb: physics-engine.jpg
leadimg: physics-engine.jpg
tags: three.js, ammo.js, ΔV
author: Dennis
nerd: 2
---

For some 3D visualisations you want to have a realistic simulation of a world.
And what is a world without proper physics?
So as a small research project we decided to add physics integration into our 3d world representation of (our home town) Nijmegen.

![ΔV](/img/blog/physics-dv.png){:.with-caption}*Image taken from our simplified 3d representation of Nijmegen project ΔV*

As a goal we decided to make a small game in which you cycle through Nijmegen and have to avoid being run over by cars.
We first looked around for some frameworks that do physics simulation in the browser. We found [Physijs] which integrates with [three.js] and uses [ammo.js] which is a javascript port of [bullet]. The plan was to build the whole prototype in just 16 hours. This turned out to be a bit too ambitious but we will come to that later.

Physijs runs all the physics simulation in a webworker. This makes sure that it does not interfere with the renderloop. To set up Physijs you need to point it to it's WebWorker and the ammo script that it requires.
When you have done that, you need to create a Physijs.Scene and call the simulate function of that scene in your update function.

After having done the basic setup, we need to add physics objects. To do this we need to create Physijs meshes instead of the default Three.Meshes.
There are a couple of Physijs meshes but the most usefull/lightweight meshes are Physijs.BoxMesh and Physijs.SphereMesh.
These use the bounding box and bounding sphere as physics objects respectively.

![Physijs demo](/img/blog/physics-physijs-demo.png){:.with-caption}*Check out [demo of Physijs] to get a feel what is possible. For more demos check out [Physijs]*

For our little game prototype we used Physijs.BoxMesh for the cars, ground, and bicycle. For the buildings we used the Physisjs.ConcaveMesh, because there are multiple buildings grouped together in chunks and this would cause collisions otherwise. We must note Physisjs.ConcaveMesh is a very costly physics object to have in your simulation, but luckily the performance turned out to be reasonable.

For the final demo we managed to get cars moving as physics objects, following the roads that we had extracted from the government database [TOP10NL](in Dutch). Moving the bicycle however was harder, because it is not a physics object. When integrating the bike into the physics we ran into errors concerning the webworker that simulates the physics. The main difference between the bike and the cars is that the bike should use the 'applyCentralImpulse' function which could not be found in the simulation and the cars use 'setLinearVelocity', which did work. During the final hour of our hack-a-ton we weren't able to get the bike working. The result however is an hilarious demo where cars mindlessly drive around, crash into each other and bounce out of the 'world' again.

<iframe src="https://player.vimeo.com/video/133123676" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

As you can see in the movie the cars behave a bit strange when tipped over. This is because the Physijs.BoxMesh allows cars to slide on their front as the physics mesh is flat at that location. Also note that not all roads match up perfectly, because of the inaccuracies in the data set. Although the demo looks mainly funny in this state, it does show correct car/house, car/car, and car/ground interaction physics wise. It just requires more tweaking to make the cars behave in a more realistic way.

[demo of Physijs]: http://chandlerprall.github.io/Physijs/examples/vehicle.html/
[Physijs]: http://chandlerprall.github.io/Physijs/
[three.js]: http://threejs.org/
[ammo.js]: https://github.com/kripken/ammo.js/
[bullet]: http://bulletphysics.org/wordpress/
[TOP10NL]: http://www.kadaster.nl/web/artikel/producten/TOP10NL.htm
