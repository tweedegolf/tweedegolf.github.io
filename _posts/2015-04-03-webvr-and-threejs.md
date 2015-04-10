---
layout: post
thumb: oculus-rift.jpg
leadimg:
tags: VR WebVR Mozilla 3D Cardboard Oculus Rift Threejs
author: Daniel
nerd: 5
---

**WebVR**

Our first VR application consists of a simple 3D scene in Threejs that floats inside a cube. On each side of this cube we print the name and direction of the axis towards which the side is facing, so we can easily see where we are in the 3D space.

<img src="/img/blog/debug-cube.jpg" width="90%">

You can navigate through the 3D scene by using the arrow keys. The camera is controlled by the Oculus so you can look around in the scene by moving your head like in the real world.

To access the rotation and position data of the Oculus with javascript we use the WebVR API:

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

`PositionSensorVRDevice` instances are objects that contain data about rotation, position and velocity of movement.

`HMDVRDevice` instances are objects that contain information such as the distance between the lenses, the distance between the lenses and the displays, the resolution of the displays and so on.

Since early April, mobile devices are being detected as VR devices. This means that you can use the WebVR API for Cardboard applications as well; you don't need the native Cardboard API anymore.

To distinguish between mobile devices and the Oculus Rift (or other HMD's), we perform a check to determine on what operating system our application is running.

If no VR device is detected and the application is not running on a mobile device, the scene is rendered by the default WebGL renderer of Threejs.

If the application is running on a computer with a VR device connected or on a mobile device we render the scene in stereo with barrel distortion. For this we use the `OculusRiftEffect` that comes with Threejs.


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

If the application runs on a mobile device inside a browser that doesn't have the WebVR API implemented, we use Threejs' `DeviceOrientationControls` to get the rotation of the device.


