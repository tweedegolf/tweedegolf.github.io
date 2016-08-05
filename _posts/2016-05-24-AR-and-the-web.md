---
layout: post
title: "Augmented Reality with web technologies"
date: "24-05-2016"
tags: Three.js, 3D, WebGL, Augmented Reality, JSAruco, JSARToolkit, Augmented Web
thumb: jsaruco.jpg
leadimg: jsaruco.jpg
author: Daniel
contact: Daniel
about: augmented reality with web technologies 
description: Using solely web technologies for creating augmented reality applications
github: https://github.com/tweedegolf/web-ar
nerd: 3
---

#### Augmented Reality with web technologies

With the start of the implementation of the WebRTC API around 2012, javascript developers gained access to the video and audio streams coming from webcams and microphones. This paved the way for augmented reality (AR) applications that were build solely with web technologies. Using webtechnologies for AR is also called "the augmented web".

Most AR applications use a webcam feed that gets analyzed for certain patterns, for instance a simple color field, a movement or a marker. Nowadays there are several other ways to augment the reality of a webpage, for instance using geolocation or devices such as the Leapmotion.

In this post I will focus on AR with markers.

#### Two libraries

While some developers have created their own AR libraries, most developers use either [JSAruco](https://github.com/jcmellado/js-aruco) or [JSARToolkit](https://github.com/kig/JSARToolKit). Both libraries are javascript ports from ancient C++ libraries. JSAruco is based on [OpenCV](http://opencv.org/) and JSARToolkit is a port of [ARToolkit](http://www.hitl.washington.edu/artoolkit/) via the in-between ports NyARToolkit (Java) and FLARToolkit (Actionscript).

The inner-workings of the libraries is as follows: a snapshot of the video feed is taken by copying image data from the video to a canvas on every animation frame. This image data gets analyzed for markers, and the position and rotation of every detected marker is returned. This information can subsequently be used to render a 3D object on top of the video feed, thus augmenting the reality.

Three.js works very well with both JSAruco and JSARToolkit and I made 2 simple examples that show you how to use the libraries with Three.js, the code and some markers are available at [Github](https://github.com/tweedegolf/web-ar).

![AR](/assets/img/blog/jsaruco.jpg){: .with-caption}
*3D model rendered on a marker*


#### Markers

A marker is usually a grid of small black and white squares and there are certain rules for how these black and white squares must be patched together. Diogok has put [code on github](https://github.com/diogok/js-aruco-markers) that generates all possible JSAruco markers.

Note that JSAruco markers can not be used with JSARToolkit; you have to use the markers that you can find in the repository on Github, in the [markers folder](https://github.com/kig/JSARToolKit/tree/master/demos/markers).

Both libraries support multiple markers, which means that each distinct marker gets its own id, and this id can be used to couple a model (or an action) to a specific marker.

For instance I made this small test using multiple markers:

<video height="360" controls>
  <source src="http://data.tweedegolf.nl/web-ar/tjt-web-ar.mp4">
</video>


#### Conditions

In the process of analyzing, the image is turned into an inverted plain black and white image. This means that a pixel is either white or black and this makes it very easy to detect a marker. For the best results, good bright lighting is mandatory. Also putting the marker on a surface with a plain color is recommended. If possible, using backlight is ideal. In general you should turn off the auto focus of your webcam.

![Marker detection](/assets/img/blog/inverted.jpg){: .with-caption}
*Marker detection*


#### Performance

In JSARToolkit you can set the size of the image data that will be processed: parsing smaller images is faster but on the other hand smaller images have less detail. Besides tweaking the size of the image being processed, you can set the threshold, which is the color value that classifies whether a pixel will become white or black.

In JSAruco the size of the image data has to match the size of the canvas that you use to render the 3D scene (in our case: where we render the Three.js scene). I have noticed that if the width of the canvas is more than about 700 pixels, JSAruco starts to have difficulties detecting markers, and the wider the canvas, the more severe this problem becomes.

In general JSARToolkit performs better than JSAruco, but both libraries suffer from missed or wrongly positioned markers, resulting in an unsteady presentation. You can compare both libraries yourself using the simple test applications that I mentioned earlier. Code is at [Github](https://github.com/tweedegolf/web-ar).


#### Web or native

On iOS you don't have access to the streams coming from a camera or a microphone due to restrictions put in place by Apple. So on this platform it is impossible to create an AR application with only web technologies. Since mobile devices have become ubiquitous, you see an increasing number of native AR libraries for mobile platforms appear on Github, especially for iOS.

The benefits of native are twofold: better performance and control over all camera settings (contrast, brightness, auto focus, etc.). Better performance means faster and more accurate marker detection and control over camera settings provide tools for optimizing the incoming feed.

Moreover you can use the light sensor of your device to detect the light intensity and adjust the camera settings accordingly. Currently you can't use the light sensor API on iOS, but on Android, Ubuntu, FirefoxOS and Windows you can.


#### Conclusion

Technically you can build an AR application using web technologies but the performance isn't as good as native AR apps such as Layar and Roomle. For some applications web technologies might suffice, for instance art installations or applications that just want to show the possibilities of AR.

The advantage of using web technologies is obvious: it is much simpler to set up an application and it runs on any platform (iOS being the sad exception).

The lesser performance is partly because analyzing the image data is done in the main javascript thread, and partly because the lack of control over the camera settings which leads to a poor quality of the incoming feed, for instance due to bad or fluctuating light conditions.

On the short term using webworkers may improve the analyzing and detection step, and on the longer term the ever improving performance of browsers will eventually lead to a more reliable marker detection.

Furthermore Web API's keep evolving so in the near future we might get more control over the camera settings via javascript. The draft version of the [MediaCapture API](http://w3c.github.io/mediacapture-main/#dictionary-mediatrackcapabilities-members) already shows some useful future capabilities. Also there is a draft Web API for the [light sensor](https://w3c.github.io/ambient-light/) that is currently only implemented in [Firefox](https://developer.mozilla.org/en-US/docs/Web/API/DeviceLightEvent/Using_light_sensors).

The future of the augmented web looks bright.








