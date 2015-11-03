---
layout: post
thumb:
leadimg:
tags: Collada, Three.js, 3D, optimization, webgl
author: Daniel
description: Optimizing 3D models by converting Collada's to JSON
nerd: 3
---


So far we have been using 3D models in Collada format in our 3D projects. Our 3D artist [Boris Ignjatovic](http://www.borisignjatovic.com/) works in Maya 3D and after quite some experimenting we found that Collada was the export format that worked best for us.

However, the Collada format is an interchange format, not a delivery format. Where a delivery format should be as small as possible and moreover optimized for parsing by the receiving end, an interchange format doesn't have such requirements. Collada is XML and thus rather bloated, and to parse a Collada Threejs has to loop over every node of the tree and convert it to a Threejs 3D object.

So we decided to try Threejs' own JSON format. JSON is a less verbose and because it is Threejs' own format, parsing is done in a breeze. After some fruitless experiments with Maya's Threejs JSON exporter and some existing Collada to JSON converters, we tried our luck with Threejs' built in `toJSON()` method.

Every 3D object inherits the `toJSON()` method from the class Object3D, so you can convert a loaded Collada model to JSON and then save it to disk. We wanted to wrap this idea into a Nodejs app but unfortunately there none of the XML parsers for Nodejs is capable of parsing Collada XML.



