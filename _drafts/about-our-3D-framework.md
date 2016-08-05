---
layout: post
thumb: pointcloud-leadimg.jpg
leadimg: pointcloud-leadimg.jpg
tags: 3D, VR, first person, 3D visualisation
author: Daniel
description: About our 3D framework
nerd: 1
---


Our [3D framework](http://tweedegolf.nl/3d-framework/) is a very versatile multi-purpose framework that can be used in a wide range of products.

The type of application that can be build on top of our 3D framework ranges from a 3D configuration tool for configuring or creating an object in 3D space by using predefined parts, to a drawing tool that allows you to draw anything you can imagine and render that anything to 3D or materialize it with a 3D printer. The framework can also be used for complex data visualization.

> example of a 3D configuration tool

![Nike 3D configurator](/assets/img/blog/nike-3D-configurator-small.jpg)


#### Features

The framework has a 2D mode and 3D mode. You can for instance draw an object in 2D mode and then view it from all angles in 3D mode. Or vice versa, draw a building in 3D mode and study the floor-plans in 2D mode.

You can also import existing 3D artwork and export to several 3D formats. There are also importers available for 3D data sets such as point clouds and heat maps.

The framework has been setup in a modular way and so far we can divide the framework into the following modules:

- 2D drawing tool
- 3D modules:
  1. a serverside image generator that renders static images of the 3D scene
  2. live 3D scene that you can walk through in several modes (first person, bird view, automated camera path and more)
  3. same as 2. but you interact with the scene by using a virtual reality (VR) headset such as the Oculus Rift or Microsoft Hololens
  4. same as 2. but with added augmented reality (AR) layers
  5. interface to a 3D printer
- importers:
  1. Collada
  2. glTF
  3. point cloud
- serverside administration modules for registration and user profile management, including storage of content created by the user such as drawings

> point cloud 3D rendering

![point cloud](/assets/img/blog/pointcloud.jpg)

> heat map

![heat map](/assets/img/blog/heatmap.png)



#### Interactivity

Besides the regular navigation interaction, each object in the framework can be made interactive. This is very useful, especially when you are designing technical objects like an assembly line or an electric circuit. To elaborate on the latter example: you can define and add logic to the objects/elements that are available to build your circuit.

Then you can check your wiring by virtually powering your circuit; this means that a current will be simulated, and the logic of the elements will be evaluated as soon as the current reaches an element.


#### Test cases

Besides implementations for our customers, we have made several test cases for demoing purposes. In our last test case we have combined almost all features described above. With the [burglar alarm tool](http://tweedegolf.nl/3d-framework/#visualisatie-en-gamification) you can design the floor-plan of a building and add several burglar detection devices to it. Subsequently you can add wiring between the detection devices to connect them for instance to a monitoring system.

![burgler alarm](/assets/img/blog/burgler-alarm-small.jpg)

After you are done designing your alarm setup, you can switch to 3D mode and move the 3D representation of a burglar around in the scene to check if there are still spots in the building that are not covered by a detection device. And with a VR headset you can actually step in the shoes of a burglar and try to break into your own building.


#### Other use cases

The use cases that our customers come up with continues to surprise us and inspires us to develop the tool in new directions. We are confident that our drawing tool can be used in a wide range of applications, and that it can be easily extended and adapted to meet your requirements.

Please do not hesitate to contact us for a more in-depth explanation or demonstration of our tool. We are always delighted to think along with you and find the best solution for your business.


<!--
In 2011 we started to develop a 2D drawing tool for gardens. From the ground up it has been build as a generic tool so it can be used very easily for other types of drawing tools.

Initially, you could only see your drawing in 2D, but later we added a 3D view. With the advent of WebGL support in all major browsers, rendering 3D in a browser is fast enough on almost any device.

A next step could be drawing and editing in 3D but experience learned us that drawing in 3D is not in all cases as handy as it might seem. A 2D view is better suited for drawing floor-plans for for instance gardens, buildings and maps.


configuration tool vs free design

-->


<!--
Our [2D drawing tool](http://tweedegolf.nl/3d-framework/#ontwerpen-en-3d) is very suited for drawing objects that are made up from other objects. Examples:

- draw a garden with objects like trees, plants and flowers
- create an assembly line with parts like conveyor belts, cameras and sensors
- draw walls to separate an office floor into smaller work units
- draw an electric circuit

The drawing tool is less suited for designing new original objects, like for instance the trees in the garden or the conveyor belt of the assembly line. However you can draw surfaces like lawns, terraces and other shapes that are made up from one single material such as hedges, walls and piping.
-->

<!--
Typically you will use our drawing tool to design something that will, or already exists in real life. We have added a 3D view mode to give you a better impression of what your design will look like when materialized.

We made two versions of the 3D view mode; one version that simply renders pictures of the generated 3D scene from several viewing angles, and a first person view whereby you can walk through the 3D representation of your design.

The newest iteration of the tool adds VR as an extra 3D view mode; with VR you can immerse yourself in your own drawing while wearing a headset like the Oculus Rift.

Note that the edit/drawing mode of our tool is always 2D; you can not (yet) edit or draw in 3D.
-->
