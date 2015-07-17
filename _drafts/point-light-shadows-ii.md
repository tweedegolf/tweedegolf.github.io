---
layout: post
thumb: light2-shader.png
leadimg: light2-shader.png
tags: three.js, point light, shadow casting, WebGL
description: Follow up post on point light shadows in Three.js.
title: "Point light shadows II"
author: Dennis
nerd: 4
---

In a [previous blogpost] we talked about possible ways to implement an efficient way of calculating point light shadows in [Three.js].
Efficient meaning taking less texture samplers than the naive approach which takes six samplers for each pointlight, one for each of the principal directions.

We came up with 3 potential solutions:

* Dividing a larger texture up in smaller viewports and drawing the depth map to each of these viewports.
* Render each of the depth maps to one side of a cube texture map.
* Using dual-hyperboloid shadow mapping.

The first approach - dividing a larger texture up in smaller viewports - proved to be difficult to integrate with the current shader and uniform variables.
The GLSL shader language requires all of the for loops to be unrollable as the shaders can then be divided into small chunks of work for each of the streamprocessors of the GPU.
So when handling an assortment of textures, some of which have this subdivision of smaller textures, it is a pretty complex task to write it in such a way that it is unrollable without making two separate loops for the two types of textures. Which in turn makes maintaining the shader code a hassle.

![viewports](/img/blog/light2-viewports-grid.png){:.thumbnail}{:.with-caption}
*Image from the internal rendering in Three.js. The grid is added to clarify what happens. The grid locations correspond with +x, &minus;x, +y, &minus;y, +z and &minus;z axis, going from top left to bottom right.*

As for the cube texture, it was scrapped halfway trough development. While the solution seemed obvious and also is used in the industry, it was very hard to debug.
Both Firefox' native canvas debugger and Chrome's WebGL debugger, called the [WebGL Inspector], did not render the cube texture properly. I could observe the switching of framebuffers (which are like internal screens to draw on) but they stayed blank while the draw calls proceeded. This means Three.js did not cull them and they should have shown up on the framebuffer. With no way to debug this step and no output it would be foolhardy to actually continue developing this method.

![cube depth map](/img/blog/light2-shadow-cube.png){:.thumbnail}{:.with-caption}
*Image taken from [devmaster.net] explaining shadow mapping using cube maps.*

The last approach was the dual-paraboloid shadow mapping. This approach would take two textures per point light. (The previous blogpost talked about one, but this proved to be incorrect.) This would make it less ideal than the other two approaches. On top of that the implementation is rather complex. If we had complete control over the OpenGL code this could be a solution but figuring out where to adapt the three.js code and the shaders turns out to be a big hassle. As it would also involves a transformation to paraboloid space it would be really hard to debug. All this would be required for a lesser effect than the other - hopefully more simple - methods, like the larger texture with viewports.

![paraboloid transformation](/img/blog/light2-paraboloid-transformation.png){:.thumbnail}{:.with-caption}*Image taken from [gamedevelop.eu] explaining the paraboloid transformation.*

In conclusion the best way to make point light shadows work without going over the texture-sampler limit and without spending too much time is the large texture with viewports approach. This means we have to duplicate some code in the shader and implement 2 loops to do shadow calculation. One calculating shadows for all the spot lights and one for all the point lights.

After implementing this strategy we ran into another problem. This time the number of varying variables ([GLSL standard] page 31) in the shaders exceeded the WebGL implementation register limit. This limit in Chrome is fixed at 16. This meant we could only have one point light with shadows, actually less than when we used the naive implementation. In Firefox the limit is higher which results in it being hardware implementation defined. So on my hardware it works smoothly with 2 point lights, but the performance starts to suffer when enabling 3 or more point lights.

This is because the hardware implementation of the fragment shaders only has a couple of "fast registers". These are actually separate hardware implementations of real registers which allow fast access to the data stored within. If you go over this hardware limit, values normally stored in these "fast registers" will be stored in "slow registers". These are implemented by storing them in Video RAM. Which is much slower relative to the "fast registers".

So in Firefox at least the demo can be run in real-time with a couple of point lights IF your hardware has a couple of extra "fast registers". After that you can still use this implementation to generate screenshots of scenes, which can still give you a nice impression of the shadows being cast in a garden, something we wanted to use this application for. But of course it would be very nice to have a real-time solution, unfortunately this requires at least some desktop hardware to achieve.

&lt;movie to be included and uploaded to vimeo https://drive.google.com/open?id=0B0Dw6JAvH1c9aWM3UXp1Z0dicGs &gt;

[GLSL standard]: https://www.khronos.org/files/opengles_shading_language.pdf#page=37
[devmaster.net]: http://devmaster.net/p/3002/shader-effects-shadow-mapping
[gamedevelop.eu]: http://gamedevelop.eu/en/tutorials/dual-paraboloid-shadow-mapping.htm
[WebGL Inspector]: http://benvanik.github.io/WebGL-Inspector/ "WebGL inspector homepage"
[Three.js]: http://threejs.org/ "three.js homepage"
[previous blogpost]: /2015/05/21/point-light-shadows-in-threejs/