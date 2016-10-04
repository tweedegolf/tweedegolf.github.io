---
layout: post
title: "Some fun with physics in Three.js"
date: "2015-09-04"
layout: post
thumb: physics-engine.jpg
leadimg: physics-engine.jpg
tags: WebGL, physics, 3D, Three.js, ammo.js
author: Dennis
contact: RubenN
about: Three.js
nerd: 3
---

We all want our 3D visualisations to be as real as possible. A basic premise seems to be that they adhere to the laws of physics. No small feat! Or is it?

We decided to give it a go during a two-day programming contest. Our team's idea was to develop a web-based game where the user cycles around and has to avoid crashing into cars. To create the game, we needed a physics engine.

As could be expected, 48 hours later we found out we had been overly ambitious. There really was no game experience to speak of. However, we did manage to create a 3D world with basic physics. Hopefully, our experiences will give you some insight into using physics in 3D.

![ΔV](/assets/img/blog/physics-dv.png){:.with-caption}*Image taken from our simplified 3d representation of the city of Nijmegen*

### Making a game with Physijs

Our goal was to make a small game in which you cycle through Nijmegen and have to avoid being run over by cars.
We first looked into some frameworks that offer physics simulation in the browser. We found [Physijs] which integrates with [Three.js] and uses [ammo.js], which is a javascript port of [bullet].

Physijs runs all the physics simulation in a web worker. The worker makes sure that it does not interfere with the renderloop. To set up Physijs you need to point it to its web worker and the ammo script that it requires.
The next step is to create a Physijs.Scene and call the simulate function of that scene in your update function.

After having done the basic setup, we needed to add physics objects. To do this we needed to create Physijs meshes instead of the default Three.Meshes. There are a couple of Physijs meshes but the most useful, lightweight meshes are Physijs.BoxMesh, which uses the bounding box as physics object, and Physijs.SphereMesh, which uses the bounding sphere.

![Physijs demo](/assets/img/blog/physics-physijs-demo.png){:.with-caption}*Check out [demo of Physijs] to get a feel of what is possible. For more demos check out [Physijs]*

### Crashing cars

For our little game prototype we used Physijs.BoxMesh for the cars, the surfaces and the bicycle. For the buildings we used the Physisjs.ConcaveMesh, because multiple buildings needed to be grouped together in chunks and this would cause collisions otherwise. We must note Physisjs.ConcaveMesh is a very costly physics object to have in your simulation, but luckily the performance turned out to be reasonable.

In our final demo we managed to get cars moving as physics objects, following the roads that we had extracted from the government database [TOP10NL] (in Dutch). Moving the bicycle proved to be harder, because it is not a physics object. When we integrated the bike into the physics we ran into errors concerning the web worker that simulates the physics. The main difference between the bike and the cars is that the bike should have used the 'applyCentralImpulse' function which unfortunately could not be found in the simulation and the cars used 'setLinearVelocity', which did work. During the final hour of our hackathon we still weren't able to get the bike working. The result is the hilarious demo in which you can see cars mindlessly drive around, crash into each other and then bounce out of the 'world' again.

<iframe src="https://player.vimeo.com/video/133123676" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Room for improvement

As you can see in the movie the cars behave a bit strangely when tipped over. This is because the Physijs.BoxMesh allows cars to slide on their front as the physics mesh is flat at that location. Also note that not all roads match up perfectly, because of inaccuracies in the data set. Even though the demo mainly looks funny in this state, it does show correct car/house, car/car, and car/surface interaction as far as physics is concerned. It just requires more tweaking to make the cars behave in a more realistic way. Given an extra day or two, we *surely* would've succeeded in making a mind-blowing game!

[demo of Physijs]: http://chandlerprall.github.io/Physijs/examples/vehicle.html/
[Physijs]: http://chandlerprall.github.io/Physijs/
[Three.js]: http://threejs.org/
[ammo.js]: https://github.com/kripken/ammo.js/
[bullet]: http://bulletphysics.org/wordpress/
[TOP10NL]: http://www.kadaster.nl/web/artikel/producten/TOP10NL.htm
