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
  let obj3D = new THREE.Object3D();
  let scene = new THREE.Scene();
  scene.add(obj3D);
~~~

The 3D object initially gets positioned at the origin of the system and has a rotation of 0° on all 3 axes. In Threejs a non-rotated 3D object faces towards the positive z-axis and the top is in the direction of the positive y-axis.

In the picture below the red line is the x-axis, the green line the y-axis and the blue line the z-axis. A dotted line indicates a negative axis.

The arrow is an instance of `THREE.PlaneBufferGeometry` which is a subclass of `THREE.Object3D`, the basic 3D object in Threejs. The arrow has been added to the root scene without any rotation or translation.


<img src="/img/blog/threejs-axis.jpg" width="65%">


As you can see the arrow points in the direction of the positive y-axis. However in trigonometry a 0° rotation over the z-axis is a vector in the direction of the positive x-axis, so the real rotation of the arrow in the picture is 90°.

This is very important if we want to translate or rotate the arrow in the 3D space.

Say we want to move the arrow one unit in the direction towards which the arrow is pointed. We use trigonometry to calculate the fraction of the unit the arrow has to move over the x-axis and the fraction of the unit the arrow has to move over the y-axis:

~~~
  arrow.position.x += unit * Math.cos(arrow.rotation.z);
  arrow.position.y += unit * Math.sin(arrow.rotation.z);
~~~


But because an angle of 0° in Threejs is actually an angle of 90°, we have change the code into this:

~~~
  arrow.position.x += unit * Math.cos(arrow.rotation.z + Math.PI/2);
  arrow.position.y += unit * Math.sin(arrow.rotation.z + Math.PI/2);
~~~


Now lets see if this makes sense. The z-rotation of the arrow in the picture is 0°:

~~~
  Math.cos(0 + Math.PI/2) = 0;
  Math.sin(0 + Math.PI/2) = 1;
~~~

This means that the translation of the arrow on the x-axis is 0 * unit = 0, and the translation on the y-axis is 1 * unit = 1, which means that the arrow is moving straight up, which is exactly what we want.

If we hadn't added Math.PI/2 to the angle, then the result would have been:

~~~
  Math.cos(0) = 1;
  Math.sin(0) = 0;
~~~

Which results in the arrow moving straight to the right.


Another example: we want to translate the arrow after we have rotated the arrow 45°. A positive rotation in Threejs follows the convention and is counterclockwise:


<img src="/img/blog/threejs-rotation-45-degrees.jpg" width="85%">

Now we get this:

~~~javascript
  // Math.PI/4 = 45°, Math.PI/2 = 90°
  Math.cos(Math.PI/4 + Math.PI/2) = -0.707;
  Math.sin(Math.PI/4 + Math.PI/2) = 0.707;
~~~

This results in an equal translation over both the x and the y-axis, and the translation over the x-axis is in the negative direction. This is exactly what we want.



<br>
**Creating a floor**

Another thing that we can learn from the images above is that a 3D object stands by default perpendicular to our viewing direction. So in order to make a floor or a ground for a 3D scene, we need to rotate a the 3D object by -90° over the x-axis:

<video width="500" controls>
  <source src="http://data.tweedegolf.nl/videos/plane_rotation.mp4#t=0.07" type="video/mp4" loop>
</video>

Note that if you rotate a 3D object you only change its rotation in relation to the root scene; its own coordinate system is not affected. This means that if we translate the arrow along its x-axis, it still moves in the same direction but because the arrow has been rotated its x-axis points towards a different direction.



<br>
**Rotating a container or the root scene**

Usually you add quite a lot of objects to your 3D world and all these objects need to be rotated. Therefor you usually add all 3D objects to a container object, for instance the floor object.

Another option is to rotate the whole root scene:

~~~
  let scene = new THREE.Scene();
  scene.rotation.x -= Math.PI/2;
~~~

One caveat: if you choose to rotate the scene, please make sure that you do not add the camera to the scene because that would cancel out the rotation, see this [post](/2015/04/03/webvr-and-threejs/#camera).

