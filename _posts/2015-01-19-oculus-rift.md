---
layout: post
thumb: oculus.jpg
leadimg: oculus.jpg
tags: Oculus Rift, VR, 3D
author: Daniel
contact: Daniel
about: The Oculus Rift, VR and 3D
description: The history of virtual reality (VR) dates back to the 1950's. Since then, a lot of - sometimes quite exotic - devices have been developed.
nerd: 2
---

The history of virtual reality (VR) dates back to the 1950's. Since then, a lot of - sometimes quite exotic - devices have been developed. For instance, take a look at this VR cabinet called "sensorama" developed by Morton Heilig in 1962:

![Morton Heilig Sensorama](/assets/img/blog/sensorama.jpg)

Nowadays, most VR devices take the form of head mounted devices (HMD). Probably the best known example of such a device is the [Oculus Rift](https://www.oculus.com/rift/). The device looks a bit like safety goggles. Let's dive into some technical details of the Oculus Rift.

![Oculus Rift and positional tracker](/assets/img/blog/oculus-rift-and-positional-tracker.jpg){: .with-caption}
*The Oculus Rift Developer Kit 2 and positional tracker*

### Displays and lenses

For each eye the Oculus has a full hd display on which the 3D content (for instance a game or a video) is rendered. The content has to be rendered in stereo which means that the image for the left display is taken from a slightly different angle compared to the image on the right display. This difference is analogous to the distance between our two eyes.

![Early stereo image](/assets/img/blog/early-stereo-image.jpg){: .with-caption}
*Example of an early stereo image*

![Early stereo image, different camera positions](/assets/img/blog/early-stereo-image.gif){: .with-caption}
*This shows this different camera positions of the photo*

We look at the image through a set of specially shaped lenses; these lenses distort the image in such a way that the field of view (FOV) becomes larger than the actual size of the displays in the Oculus. In the image below the letter X (in the red box) indicates the size of the real screen, the letter X' (X-prime) is the size of the screen you think you see because you look through the lenses:

![Oculus lenses](/assets/img/blog/oculus-lenses.jpg)

The distortion of the image caused by the lenses is called pinch distortion and looks like this:

![Pinch distortion](/assets/img/blog/pinch-distortion.jpg)

To cancel out the pinch distortion, the image is rendered with barrel distortion which looks like this:

![Barrel distortion](/assets/img/blog/barrel-distortion.jpg)

The netto result of the pinch distortion of the lenses and the barrel distortion of the image is that you see a straight image that is bigger than the screen size of the Oculus.

As you can see in the image, a side effect of barrel distortion is that the image is stretched out towards the edges. This means that the pixel density is less in the outer regions of the image. This is not a problem, because it is much like how our own vision works in real life: the objects we see in our peripheral vision are not as sharp as the objects we see right in front of us. Shown in the image below: the red cone is the FOV that we can really focus on, and objects in the green and blue cones are increasingly more blurry.

![FOV human eye](/assets/img/blog/FOV-human-eye.jpg)

### Tracking rotation, movement and position

The Oculus has sensors that track rotation and the velocity of your movements; in the device you find a gyroscope, an accelerometer and a magnetometer.

Furthermore, the Oculus has 40 leds that are tracked by the separate positional tracker device. This device looks a bit like a webcam and ideally you mount it on top of your computer monitor.

The data coming from all sensors and trackers gets combined in a process called [sensor fusion](http://en.wikipedia.org/wiki/Sensor_fusion). Sensor fusion roughly means that you combine data coming from different sources to calculate data that is more accurate than the data that comes from each individual source.


### Generating the 3D scene

The Oculus has to be connected to a computer; an HDMI cable for the displays and a USB cable that attaches the connector box. The connector box receives both a cable from the positional tracker and from the HMD itself.

Of all the data from the sensors are combined to create a 3D scene that is in accordance with the position and movement of your head and your body, which makes you feel like you are actually standing inside that scene.

Because the Oculus Rift blocks your vision on the real world and the fact that you are connected to a computer like a goat tied to a pole, it makes it quite hard - if not dangerous - to walk around while wearing an Oculus.

Therefore, other devices have been developed that transfer physically walking movements to the computer as well, see images below. On the other hand, it is very likely that in the near future the on-board processor of the Oculus will be fast enough to render the 3D content and thus the Oculus Rift would become a standalone device, like Microsoft's Hololens.

![VR treadmill](/assets/img/blog/VR-treadmill.jpg)

This device (currently on Kickstarter) takes it even further:

<iframe height="360" src="https://www.youtube.com/embed/bgblE3nxvNg" frameborder="0" allowfullscreen></iframe>

### Other devices

Besides the Oculus Rift there are numerous other companies that have made or announced HMD's for VR. You can roughly divide them into three categories: 1) devices that have to be connected to a computer, 2) devices that work with a mobile phone and 3) standalone devices.

The Oculus is of the first category; it needs a computer for rendering the content. On the one hand the HMD is an extra monitor to your computer, and on the other hand it is an input device that tracks your movements. In the future the connection between the HMD and the computer will probably become wireless.

Googles Cardboard is an example of the second category, the phone's gyroscope, accelerometer and magnetometer are used to track the rotation and position, and the 3D content is rendered by the phone itself.

Microsoft's Hololens is of the third category. With the increasing power of mobile processors and co-processors for rendering and motion, we will probably see more devices of this type in the future.

Advantage of the first category is that you have more processing power for rendering the 3D content, advantage of the second category is that you are not tied by wires to your computer and that it is a relatively cheap solution, provided that you already own a smartphone with decent processing power. The third category combines the advantages of the first two categories.


<!--
At Tweede Golf we are currently researching how we can use VR together with our [3D framework](http://tweedegolf.nl/3d-framework/), and therefor we have acquired both an Oculus Rift and a Google Cardboard. In the coming blog posts we will share with you the results of this research.
-->


Links:

- [Barrell distortion](https://www.youtube.com/watch?v=B7qrgrrHry0)
- [Nvidia standalone HMD](http://vrfocus.com/archives/12225/nvidia-vr-hmd-use-x1-super-chip/)
- [Oculus Rift teardown](https://www.ifixit.com/Teardown/Oculus+Rift+Development+Kit+2+Teardown/27613)


<!--
May be add a paragraph about latency and simulator sickness, see:
https://docs.google.com/a/tweedegolf.com/document/d/18ZT3Sea-Z9_Ve299WI9ui4bTmXv0Dk-cNHOjTBKzh8c/edit#
-->
