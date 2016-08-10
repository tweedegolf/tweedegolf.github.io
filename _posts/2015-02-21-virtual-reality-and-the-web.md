---
layout: post
thumb: google-cardboard2.jpg
leadimg: google-cardboard2.jpg
tags: VR, WebVR
author: Daniel
contact: Daniel
about: VR and WebVR
description: Virtual reality and the web. The state of WebVR.
nerd: 2
---

Nowadays most VR applications are native games that are developed with tools like Unity and Unreal. These games have to be downloaded from the regular app stores, or from other app stores that have been set up by manufacturers of virtual reality headsets, like the [Samsungs Gear VR app store](https://www.oculus.com/gear-vr/).

The biggest benefit of native applications is their unbeatable performance, which is crucial for games. However, you can use VR for other purposes as well. For instance, you can add VR to [panorama viewers](http://www.emanueleferonato.com/2014/12/10/html5-webgl-360-degrees-panorama-viewer-with-three-js/) to make them more immersive. Likewise, you could build 3D scenes that are architectural or historical recreations of buildings that you can enter and walk around in with your VR headset. These kind of applications are relatively easy to develop using web technologies.

<iframe src="https://player.vimeo.com/video/127931214" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>{: .with-caption}
*Panorama viewer by Emanuele Feronato*

The benefits of developing using open web technologies are obvious; you can publish your content instantly without gate keepers (app stores), you can use your own cheap or free tools, there is a culture of collaboration in the web developers' community, and so on. Both Mozilla and Google saw the potential of VR on the web and started to develop an API that provides access to VR devices. Currently only the Oculus Rift is supported, which will probably change as soon as new devices hit the market.

Mozilla and Google are working on one and the same API for WebVR, unlike what happened in the past with the development of the WebAudio API. Mozilla has also implemented WebVR in the nightly build of Opera. It is not yet known whether Spartan, Microsoft's new browser for Windows 10, is going to support WebVR. However, it probably is going to support WebVR, since so far Spartan has made a show of virtue as it comes to new browsers standards.

Google also created an open source hardware VR device, the [Google Cardboard](https://www.google.com/get/cardboard/). This is a device made of cardboard that turns a mobile device into a standalone VR headset. The mobile device's gyroscope, accelerometer and magnetometer are used to track the rotation and position, and the 3D content is rendered by the device itself. The Google Cardboard combined with the WebVR API and web technologies for generating the 3D scene makes creating VR application achievable for a large audience.

![Google Cardboard](/assets/img/blog/google-cardboard2.jpg)

The WebVR API is able to detect a connected VR device, or if the browser is running on a device that can be used as a standalone VR device such as a mobile phone or a tablet. A single physical VR device shows up as a HMDVRDevice object and as a PositionSensorVRDevice object, but both objects share the same hardware id so you know they are linked. The first object contains information related to the display and the lenses such as the resolution, the distance between the lenses and the distance from your eyes to the lenses. The latter object contains information about the position, rotation and velocity of movement of the device.

To create the 3D content you can use a myriad of javascript 3D libraries, but Threejs is by far the most popular and easiest to use library. At Tweede Golf we continually check other libraries but so far we have stuck with Threejs. What's more, Threejs already supports VR devices; there are controllers that relay the tracking data from the sensors available, and renderers that do the stereo rendering for you.

Now that [WebGL](http://caniuse.com/#feat=webgl) has landed in all browsers across all operating systems, both mobile and desktop, the biggest hurdle for rendering 3D content in a browser is taken away. VR opens great opportunities to change the way we experience the web. For instance, Mozilla is experimenting to render existing web pages with CSS3 and WebGL for VR devices.

In the next blog post we show you our first test with WebVR.

Links:

- [The Current Status of Browser-based Virtual Reality in HTML5](http://www.infoq.com/news/2015/01/vr-html5)
- [A series of videos shot a the SFHTML5 meetup about VR and HTML5](https://www.youtube.com/playlist?list=PLUj8-Hhrb-a0Z3f70ygX5fXLk8Sa4mTQZ)

<!--
These are benefits that Tony Parisi mentioned in his speech for the SFHTML5 meetup that was held 16th of January this year:

- instant access
- no gatekeepers (app stores)
- instant publishing
- you can use your own (cheap or free) tools
- culture of collaboration
- source code (open)
- no entry barriers
-->
