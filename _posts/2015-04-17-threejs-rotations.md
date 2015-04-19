---
layout: post
thumb: oculus-rift.jpg
leadimg:
tags: Threejs Rotation
author: Daniel
nerd: 5
---

**Rotation of 3D objects in Threejs**

In Threejs you can add a 3D object to the root scene like so:

~~~
  let scene = new THREE.Scene(); // create the root scene
  let obj3D = new THREE.Object3D(); // create a 3D object
  scene.add(obj3D);
~~~

The 3D object initially gets positioned at the origin of the system and has a rotation of 0° on all 3 axes. In Threejs a non-rotated 3D object faces towards the positive z-axis and the top is in the direction of the positive y-axis.

In the picture below the red line is the x-axis, the green line the y-axis and the blue line the z-axis. A dotted line indicates a negative axis.

<img src="/img/blog/threejs-axis.jpg" width="65%">

The arrow object is an instance of `THREE.PlaneBufferGeometry` which is a subclass of `THREE.Object3D`, the basic 3D object in Threejs. On the PlaneBufferGeometry an image of an arrow has been applied. The arrow object has been added to the root scene without any rotation or translation.

As you can see the arrow object faces the positive z-axis, it stands perpendicular to our line of sight. And the arrow's head points in the direction of the positive y-axis.

Say we want to move the arrow object one unit in the direction towards which the arrow is pointed. We use trigonometry to calculate the fraction of the unit the arrow object has to move over the x-axis and the fraction of the unit the arrow object has to move over the y-axis:

~~~
  arrow.position.x += unit * Math.cos(arrow.rotation.z);
  arrow.position.y += unit * Math.sin(arrow.rotation.z);
~~~

This boils down to:

~~~
  Math.cos(0) = 1;
  Math.sin(0) = 0;

  arrow.position.x += unit;
  arrow.position.y += 0;
~~~

The translation of the arrow object on the x-axis is 1 * unit = unit, and the translation on the y-axis is 0 * unit = 0, which means that the arrow object is moving to the right instead of upwards.

This is the result of the fact that in Threejs the top of a 3D object is in the direction of the positive y-axis. Because of this, the arrow texture suggests that arrow object is rotated upwards, which is equal to a rotation of 90°, while the arrow object actually has a rotation of 0°.

We can do 2 things to fix this, first we can compensate it while calculating the new position of the arrow object. Because a rotation of 0° in Threejs is actually a rotation of 90°, we add 90° to the rotation of the arrow object before calculating the new x and y position:

~~~
  arrow.position.x += unit * Math.cos(arrow.rotation.z + Math.PI/2);
  arrow.position.y += unit * Math.sin(arrow.rotation.z + Math.PI/2);
~~~


Now we the arrow is moving up, which is what we want:

~~~
  Math.cos(0 + Math.PI/2) = 0;
  Math.sin(0 + Math.PI/2) = 1;

  arrow.position.x += 0;
  arrow.position.y += unit;
~~~


The second solution is to fix it in the arrow object itself. If we rotate the arrow texture by -90°, the arrow's head points in the direction of the positive x-axis, and because we only rotate the texture, the rotation of the arrow object still is 0°. Now the direction of the arrow in the texture is in consistency with the rotation of the PlaneBufferGeometry that it is applied to.


<!--
Another example: we want to translate the arrow after we have rotated the arrow 45°. A positive rotation in Threejs follows the convention and is counterclockwise:


<img src="/img/blog/threejs-rotation-45-degrees.jpg" width="85%">

Now we get this:

~~~javascript
  // Math.PI/4 = 45°, Math.PI/2 = 90°
  Math.cos(Math.PI/4 + Math.PI/2) = -0.707;
  Math.sin(Math.PI/4 + Math.PI/2) = 0.707;
~~~

This results in an equal translation over both the x and the y-axis, and the translation over the x-axis is in the negative direction. This is exactly what we want.
-->


<br>
**Creating a floor**

Because a 3D object stands by default perpendicular to our viewing direction, we need to rotate a 3D object by -90° over the x-axis in order to make a floor or a ground for a 3D scene:

<video width="500" controls>
  <source src="http://data.tweedegolf.nl/videos/plane_rotation.mp4#t=0.07" type="video/mp4" loop>
</video>

Note that if you rotate a 3D object you only change its rotation in relation to the root scene; its own coordinate system is not affected. This means that if we translate the arrow object along its y-axis, it still moves in the same direction but because the arrow object has been rotated, its y-axis points towards a different direction, in this case towards the negative z-axis.



<br>
**Rotating a container or the root scene**

Usually you add quite a lot of objects to your 3D world and all these objects need to be rotated if you want to place them on a ground or a floor. Therefor you usually add all 3D objects to a container object, for instance the floor object, and apply the rotation to this container object.

Since the root scene is a container as well, you could also rotate root scene as a whole:

~~~
  let scene = new THREE.Scene();
  scene.rotation.x -= Math.PI/2;
~~~

One caveat: if you choose to rotate the scene, please make sure that you do not add the camera to the scene because that would cancel out the rotation, see this [post](/2015/04/03/webvr-and-threejs/#camera).

