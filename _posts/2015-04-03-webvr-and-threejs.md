---
layout: post
thumb: threejs-barrel-distortion.jpg
leadimg: threejs-barrel-distortion.jpg
tags: VR, WebVR, 3D, Cardboard, Three.js
author: Daniel
contact: Daniel
about: VR, WebVR and Cardboard
description: Our first WebVR application is a big cube in Threejs and a simple 3D scene floating inside that cube. The 3D scene consists of ...
nerd: 3
---

Let's start simple. Our first WebVR application is a big cube in Threejs and a simple 3D scene floating inside that cube. The 3D scene consists of a transparent floor with a few simple rectangular shapes placed on it.

On each side of the cube we print the name and direction of the axis towards which the side is facing. Lets call this cube the "orientation cube", and lets call the 3D scene "the world" because that is what it is from the user's perspective. Both the orientation cube and the world are directly added to the root scene, which is the scene you create with the code `rootScene = new THREE.Scene()`.

When wearing an Oculus, you are positioned in the middle of this orientation cube and you can look to all sides of the cube by moving your head. You can move around in the world with the arrow keys of your keyboard.

<iframe src="https://player.vimeo.com/video/127927605" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

<!--
A real world analogy would be when a camera is mounted on a small cart that you can drive around in a miniature world, and this miniature world is placed inside a room that has the axis directions printed in large letters on all four walls, on the floor and on the ceiling.
-->

### The API

To get the rotation and position data of the Oculus using javascript, we first query for VR devices:

~~~javascript
if(navigator.getVRDevices){
  // getVRDevices returns a promise
  navigator.getVRDevices().then(
    // on fulfilled callback returns an array containing all detected VR devices
    function onFulFilled(data){
      detectedVRDevices = data;
      onFulfilled(deviceData);
    }
  );
}
~~~

The detected VR devices can be instances of `PositionSensorVRDevice` or instances of `HMDVRDevice`.

`PositionSensorVRDevice` instances are objects that contain data about rotation, position and velocity of movement of the headset.

`HMDVRDevice` instances are objects that contain information such as the distance between the lenses, the distance between the lenses and the displays, the resolution of the displays and so on. This information is needed for the browser to render the scene in stereo with barrel distortion, like so:

![ThreeJS barrel distortion](/assets/img/blog/threejs-barrel-distortion.jpg)

To get the rotation and position data from the `PositionSensorVRDevice` we need to call its `getState()` method as frequently as we want to update the scene.

~~~javascript
function vrRenderLoop(){
  let state = vrInput.getState();
  let orientation = state.orientation;
  let position = state.position;

  if(orientation !== null){
    // do something with the orientation,
    // for instance rotate the camera accordingly
  }

  if(position !== null){
    // do something with the position,
    // for instance adjust the distance between the camera and the scene
  }

  // render the scene
  render();

  // get the new state as soon as possible
  requestAnimationFrame(vrRenderLoop);
}
~~~

### Putting it together

For our first application we only use the orientation data of the Oculus. We use this data to set the rotation of the camera which is rather straightforward:

~~~
  let state = vrInput.getState();
  camera.quaternion.copy(state.orientation);
~~~

Usually when you want to walk around in a 3D world as a First Person you move and rotate the camera in the desired direction, but in this case this is not possible because the camera's rotation is controlled by the Oculus. Instead we do the reverse; keeping the camera at a fixed position while moving and rotating the world.

To get this to work properly, we add an extra pivot to our root scene and we add the world as a child to the pivot:

~~~
camera
root scene
  ↳ orientation cube
  ↳ pivot
        ↳ world
~~~

<!--
A real world analogy would be a room (root scene) that has the axis directions painted in large letters on all four walls, the floor and the ceiling (orientation cube). In the room we put a table (the pivot) and on this table a miniature world (the 3D scene) is placed.

The pivot is necessary because we want the current position in the scene to be the rotation point (the pivot). You can visualize how this works by putting a pencil upright on your desk and hold a piece of paper (or any other flat object) above the tip of the pencil. The desk is the root scene, the pencil is the pivot and the piece of paper is the 3D scene.

Now if we want to rotate, we rotate the piece of paper around the point where the tip of the pencil touches the paper (the pivot point), and if we want to change our position we move the piece of paper over the pencil's tip in the desired direction (thus we change the position of the pivot point). See this :
-->

The camera (the user) stays fixed at the same position as the pivot, but it can rotate independently of the pivot. This happens if you rotate your head while wearing the Oculus.

If we want to rotate we world, we rotate the pivot. If we want to move forward in the world, we move the world backwards over the pivot, see this video:

<iframe src="https://player.vimeo.com/video/127927690" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

You can try it yourself with the [live version](http://data.tweedegolf.nl/vr-test4/); the arrow keys up and down control the translation of the world and the arrow keys left and right the rotation of the pivot. The source code is available at [GitHub](https://github.com/tweedegolf/vr-test4).

<!--
**Threejs specific topics**

In Threejs a non-rotated 3D object faces towards the positive z-axis and the top of a 3D object is in the direction of the positive y-axis. In the image below the red line is the x-axis, the green line the y-axis and the blue line the z-axis. A dotted line indicates a negative axis.

<img src="/assets/img/blog/threejs-axis.jpg" width="65%">

According to Threejs, the arrow in the picture above has a rotation of 0° on the z-axis (and on the other 2 axes as well for that matter). However in trigonometry a 0° rotation over the z-axis is a vector in the direction of the positive x-axis, so the real rotation of the arrow in the picture is 90°.

If we want to move the arrow one unit in the direction towards which the arrow is rotated, we use trigonometry to calculate the fraction of the unit the arrow has to move over the x-axis and over the y-axis, therefor we have to compensate for Threejs' unorthodox reading of a rotation of 0°:

~~~
  arrow.position.x += unit * Math.cos(arrow.rotation.z + Math.PI/2);
  arrow.position.y += unit * Math.sin(arrow.rotation.z + Math.PI/2);
~~~

Another thing that we can learn from the image above is that in order to make a ground for our 3D scene, we need to rotate a the arrow by -90° over the x-axis:

<video height="360" controls>
  <source src="http://data.tweedegolf.nl/videos/plane_rotation.mp4#t=0.07" type="video/mp4" loop>
</video>

Instead of rotating the arrow to make a floor, you could also choose to rotate the whole root scene. And you could perform a rotation over the z-axis at the same time to compensate for the fact that 0° in Threejs is actually a rotation of 90°:
~~~
  scene.rotation.x -= Math.PI/2
  scene.rotation.z += Math.PI/2
~~~

If you choose to rotate the scene, please make sure that you do not add the camera to the scene, see next section.
-->

### About the camera in Threejs

The camera in Threejs is on the same hierarchical level as the root scene by default. Which is like a cameraman who is filming a play on a stage while standing in the audience; theoretically both the stage and the cameraman can move, independently of each other.

If you add the camera to the root scene then it is like the cameraman stands on the stage while filming the play; if you move the stage, the cameraman will move as well.

You can also add a camera to any 3D object inside the root scene. This is like the cameraman standing on a cart on the stage while filming the play; the cameraman can move independently of the stage, but if the stage moves the cameraman and her cart will move as well.

In our application the camera is fully controlled by the Oculus, so the first scenario is the best option.

This is comes in handy, since we have applied rotations to the root scene (see in [this post](/2015/04/17/threejs-rotations/)). As a consequence, if we add the camera to the scene, the rotations of the scene will have no effect. Here is an example of a situation whereby the scene rotates while the camera is added to that same scene:

<iframe height="360" src="https://www.youtube.com/embed/R2Ch397Ipps" frameborder="0" allowfullscreen></iframe>

Note that in most Threejs examples you find online it does not make any difference whether or not the camera is added to the root scene, but in our case it is very important.


### The result

We have made two screencasts of the result from the output rendered to the Oculus:

<iframe src="https://player.vimeo.com/video/127927801" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

<iframe src="https://player.vimeo.com/video/127927800" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

<!--
If the application runs on a mobile device inside a browser that doesn't have the WebVR API implemented, we use Threejs' `DeviceOrientationControls` to get the rotation of the device.
-->

<!--
Since early April, mobile devices are being detected as VR devices. This means that you can use the WebVR API for Cardboard applications as well; you don't need the native Cardboard API anymore.

To distinguish between mobile devices and the Oculus Rift (or other HMD's), we perform a check to determine on what operating system our application is running.

If no VR device is detected and the application is not running on a mobile device, the scene is rendered by the default WebGL renderer of Threejs. Otherwise we render the scene using the `StereoEffect` that comes with Threejs: this effect renders the scene in stereo.

<img src="/assets/img/blog/threejs-barrel-distortion.jpg" width="65%">
-->
