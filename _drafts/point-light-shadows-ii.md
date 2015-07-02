---
layout: post
thumb: light2-shader.png
leadimg: light2-shader.png
tags: three.js, point light, shadow casting, WebGL
description: Follow up post made while implementing.
title: "point light shadows II"
author: Dennis
nerd: 4
---

Point Light Shadows II

So in our last blogpost we talked about possible ways to implement an efficient way of calculating point light shadows in [three.js].
Where efficient means taking less texture samplers than the naive approach which takes six, one for each of the principal directions.

We came up with 3 potential solutions.
* Dividing a larger texture up in smaller viewports and drawing the depth map to each of these viewports.
* Render each of the depth maps to one side of a cube texture map.
* Using dual-hyperboloid shadow mapping.

This first approach dividing a larger texture up in smaller viewports was impossible to integrate in the current shader and uniform variables.
Because The GLSL shader language requires all the for loops to be unrollable.
Because then it can be divided up in small chunks of work for each of the streamprocessors of the GPU.
So when handling an assortment of textures, some of which have this subdivision of smaller textures.
It is impossible to write it in such a way that it is unrollable. without making two separate loops for the 2 type of textures. Which in turn makes maintaining the shader code a hassle.

![viewports](/img/blog/light2-viewports-grid.png){:.thumbnail}{:.with-caption}
*Image from the internal rendering in threejs. The grid is added to clarify what happens. The grid locations correspond with +x, &minus;x, +y, &minus;y, +z and &minus;z axis, going from top left to bottom right.*

The Cube texture method is still under construction and is hard to debug.
The WebGL debugger [WebGL Inspector] does not seem handle cube maps that well. When rendering a depth map to one side of the cube map this doesn't show up on the texture view in the debugger. So I'm currently looking for other visualization methods to verify what happens when rendering to the cube-map.

![cube depth map](/img/blog/light2-shadow-cube.png){:.thumbnail}{:.with-caption}
*Image taken from [devmaster.net] explaining shadow mapping using cube maps.*

The last approach was the dual-paraboloid shadow mappings. Approach would take 2 texture per point light. The previous blogpost talked about 1 but this was incorrect. This would make it less ideal than the other 2 approaches. On top of that the implementation is rather complex. If we had complete control over the OpenGL code this could be a solution but figuring out where to adapt the three.js code and the shaders turns out to be a big hassle. Because it also involves a transformation to paraboloid space it is really hard to debug. All this for for less gain than the other hopefully more simple methods, for instance the cube map method.

![paraboloid transformation](/img/blog/light2-paraboloid-transformation.png){:.thumbnail}{:.with-caption}*Image taken from [gamedevelop.eu] explaining the paraboloid transformation.*

[devmaster.net]: http://devmaster.net/p/3002/shader-effects-shadow-mapping
[gamedevelop.eu]: http://gamedevelop.eu/en/tutorials/dual-paraboloid-shadow-mapping.htm
[WebGL Inspector]: http://benvanik.github.io/WebGL-Inspector/ "WebGL inspector homepage"
[three.js]: http://threejs.org/ "three.js homepage"
