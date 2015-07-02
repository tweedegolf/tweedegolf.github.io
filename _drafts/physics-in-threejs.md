---
layout: post
title: "physics in three.js"
date: "2015-07-02"
---

For some 3D visualisations you want to have a realistic simulation of a world.
And what is a world without proper physics.
So as a small research project we decided to add physics integration into our 3d world representation of Nijmegen.

![ΔV](/img/blog/physics-dv.png){:.thumbnail}{:.with-caption}*Image taken from our simplified 3d representation of Nijmegen project ΔV*

As a goal we decided to make a small game where you as a cyclist have to move around Nijmegen avoiding to be run over by cars.
So we first looked around for some frameworks that do physics simulation in the browser.
We found [Physijs] which integrates with [three.js] and uses [ammo.js] which is a javascript port of [bullet]. All of this in only 16 hours. This turned out to be a bit too ambitious but we will come to that later.

So to use Physijs you need to point Physijs to it's WebWorker and the ammo script.
All the physics simulation is run in a webworker.
So it does not interferes with the renderloop.
When you have done that you need to create a Physijs.Scene and call the simulate function of that scene in your update function.

Now that we have done all the setup we need to add physics objects. To do this we need to create Physijs meshes instead of the default Three.Meshes.
There are a couple of Physijs meshes but the most usefull/lightweight meshes are Physijs.BoxMesh and Physijs.SphereMesh.
Which use the bounding box and bounding sphere as physics objects respectively.

[![Physijs demo](/img/blog/physics-physijs-demo.png)](http://chandlerprall.github.io/Physijs/examples/vehicle.html){:.thumbnail}{:.with-caption}*Check out this demo of Physijs to get a feel what is possible. For more demos check out [Physijs]*

So for our little game prototype we used Physijs.BoxMesh for the cars, ground, and Bycicle. For the buildings we used the Physisjs.ConcaveMesh, because there are multiple buildings grouped together in chunks and this would cause collisions otherwise, but this is a very nasty and costly physics object to have in your simulation. But luckily it turned out to not be that bad for performance.

So for the final demo we managed to get cars moving as physics objects, following the roads that we have extracted from the government database [TOP10NL] (in dutch). The bike however is not a physics object. When integrating the bike into the physics we ran into errors concerning the webworker that simulates the physics. The difference between the bike and the cars is that the bike should use applyCentralImpulse function which could not be found in the simulation and the cars use setLinearVelocity, which did work. During the final hour of our hack-a-ton we weren't able to get the bike working. The result however is an hilarious demo where cars mindlessly drive around and crash into each other.

&lt;PLACE MOVIE HERE: https://drive.google.com/open?id=0B0Dw6JAvH1c9blpBWTFoeVpaNGs &gt;

As you can see in the movie the cars behave a bit strange when tipped over this is because the Physijs.BoxMesh allows cars to slide on their front as the physics mesh is flat at that location. Also not al roads match up perfectly, this is because of the inaccuracies in the data set. The demo does show correct car/house, car/car, and car/ground interaction physics wise. It just needs more tweaking to make it more realistic.

[Physijs]: http://chandlerprall.github.io/Physijs/
[three.js]: http://threejs.org/
[ammo.js]: https://github.com/kripken/ammo.js/
[bullet]: http://bulletphysics.org/wordpress/
[TOP10NL]: http://www.kadaster.nl/web/artikel/producten/TOP10NL.htm
