---
layout: post
thumb: oculus-rift.jpg
leadimg:
tags: VR WebVR Mozilla 3D Cardboard Oculus Rift Threejs
author: Daniel
nerd: 5
---


**WebVR**

Our first WebVR application consists of a big cube in Threejs, and a simple 3D scene that floats inside that cube. On each side of the cube we print the name and direction of the axis towards which the side is facing.
<!--
<img src="/img/blog/debug-cube.jpg" width="90%">
-->

<video width="500" controls>
  <source src="http://abumarkub.net/videos/debug-cube.mp4" type="video/mp4">
</video>

<br>
When wearing an Oculus, you are positioned in the middle of this cube and you can look to all sides of the cube by moving your head. The 3D scene that floats inside the cube consists of a transparent floor with a few simple rectangular shapes placed on it. The floor of the scene is positioned a bit below your viewpoint and you can move around over the floor with the arrow keys of your keyboard.

A real world analogy would be when a camera is mounted on a small cart that you can drive around in a miniature world, and this miniature world is placed inside a room that has the axis directions printed in large letters on all four walls, on the floor and on the ceiling.


<br>
**The API**

To get the rotation and position data of the Oculus with javascript we first query for VR devices:

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

<img src="/img/blog/threejs-barrel-distortion.jpg" width="65%">


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

<br>
**Putting it together**

For our first application we only use the orientation data of the Oculus. We use this data to set the rotation of the camera which is rather straightforward:

~~~
  let state = vrInput.getState();
  camera.quaternion.copy(state.orientation);
~~~

Usually when you want to walk around in a 3D scene you move and rotate the camera in the desired direction but in this case this isn't possible because the camera's rotation is controlled by the Oculus. So we do it the other way round; moving forward in the 3D scene is not done by moving the camera forward, but by moving the whole scene backwards.

To be able to walk in any direction, we add an extra pivot for the rotation of the 3D scene:

~~~
cube (room)
  ↳ container (pivot)
        ↳ scene (miniature world)
~~~

This pivot is necessary because we want the current position in the scene to be the rotation point (the pivot). You can visualize how this works by putting a pencil upright on your desk and hold a piece of paper (or any other flat object) above the tip of the pencil. The desk is the floor of the cube, the pencil is the pivot and the piece of paper is the 3D scene.

Now if we want to rotate, we rotate the piece of paper around the point where the tip of the pencil touches the paper (the pivot point), and if we want to move forward we move the piece of paper over the pencil's tip in the desired direction (thus we change the position of the pivot point). See this video:

<video width="500" controls>
  <source src="http://abumarkub.net/videos/2015-04-13-161209.webm" type="video/webm">
</video>

<br>

**Threejs specific topics**

In Threejs a non-rotated 3D object faces towards the positive z-axis and the top of a 3D object is in the direction of the positive y-axis. In the image below the red line is the x-axis, the green line the y-axis and the blue line the z-axis. A dotted line indicates a negative axis.


<img src="/img/blog/threejs-axis.jpg" width="65%">


The arrow in the picture above is rotated 0°. This is unlike the Cartesian system where a 0° rotation is in the direction of the positive x-axis, so the rotation of the arrow in the picture would be 90° in the Cartesian system.

If we want to move the arrow one unit in the direction towards which the arrow is rotated, we use a bit of trigonometry to calculate the what fraction of the unit the arrow has to move over the x-axis and over the y-axis:

~~~
  arrow.position.x += unit * Math.cos(arrow.rotation.z + Math.PI/2);
  arrow.position.y += unit * Math.sin(arrow.rotation.z + Math.PI/2);
~~~

As you see we add Math.PI/2 to the rotation of the arrow because as mentioned above, a rotation of 0° in Threejs equals a rotation of 90° in the Cartesian system.


Another thing that we can learn from the image above is that in order to make a ground for our 3D scene, we need to rotate a 3D object by -90° over the x-axis:

<video width="500" controls>
  <source src="http://abumarkub.net/videos/Screencast 2015-04-14 12:37:41.mp4#t=0.07" type="video/mp4" loop>
</video>


**Oculus specific topics**

It turned out that to get the Oculus working correctly with Threejs, we had to disconnect the camera from the scene. In Threejs you have the option not to add the camera to the scene, which is very useful if you want to rotate the scene but not the camera.



<!--
If the application runs on a mobile device inside a browser that doesn't have the WebVR API implemented, we use Threejs' `DeviceOrientationControls` to get the rotation of the device.
-->

<!--
Since early April, mobile devices are being detected as VR devices. This means that you can use the WebVR API for Cardboard applications as well; you don't need the native Cardboard API anymore.

To distinguish between mobile devices and the Oculus Rift (or other HMD's), we perform a check to determine on what operating system our application is running.

If no VR device is detected and the application is not running on a mobile device, the scene is rendered by the default WebGL renderer of Threejs. Otherwise we render the scene using the `StereoEffect` that comes with Threejs: this effect renders the scene in stereo.


<img src="/img/blog/threejs-barrel-distortion.jpg" width="65%">
-->



