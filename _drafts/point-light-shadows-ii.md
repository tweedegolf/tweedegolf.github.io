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
Where efficient means taking less texture samplers than the naive approach which takes six samplers for each pointlight, one for each of the principal directions.

We came up with 3 potential solutions.

* Dividing a larger texture up in smaller viewports and drawing the depth map to each of these viewports.
* Render each of the depth maps to one side of a cube texture map.
* Using dual-hyperboloid shadow mapping.

This first approach dividing a larger texture up in smaller viewports was impossible to integrate in the current shader and uniform variables.
Because The GLSL shader language requires all the for loops to be unrollable.
Because then it the shaders can be divided up in small chunks of work for each of the streamprocessors of the GPU.
So when handling an assortment of textures, some of which have this subdivision of smaller textures.
It is impossible to write it in such a way that it is unrollable. without making two separate loops for the 2 type of textures. Which in turn makes maintaining the shader code a hassle.

![viewports](/img/blog/light2-viewports-grid.png){:.thumbnail}{:.with-caption}
*Image from the internal rendering in threejs. The grid is added to clarify what happens. The grid locations correspond with +x, &minus;x, +y, &minus;y, +z and &minus;z axis, going from top left to bottom right.*

The Cube texture is scrapped half trough development. While the solution seemed obvious and also is used in the industry, it was very hard to debug.
Both the native canvas debugger of Firefox or the WebGL debugger from chrome called [WebGL Inspector] did not show the rendering to this cube texture properly. I could observe the switching of frame buffers (which are like internal screens to draw on) but they stayed blank. while the draw calls proceeded, which means threejs did not cull them and they should show up on the framebuffer. So with no way to debug this step, and no output it would be foolhardy to actually continue developing this method.

![cube depth map](/img/blog/light2-shadow-cube.png){:.thumbnail}{:.with-caption}
*Image taken from [devmaster.net] explaining shadow mapping using cube maps.*

The last approach was the dual-paraboloid shadow mappings. Approach would take 2 texture per point light. The previous blogpost talked about 1 but this was incorrect. This would make it less ideal than the other 2 approaches. On top of that the implementation is rather complex. If we had complete control over the OpenGL code this could be a solution but figuring out where to adapt the three.js code and the shaders turns out to be a big hassle. Because it also involves a transformation to paraboloid space it is really hard to debug. All this for for less gain than the other hopefully more simple methods, for instance the larger texture with viewports.

![paraboloid transformation](/img/blog/light2-paraboloid-transformation.png){:.thumbnail}{:.with-caption}*Image taken from [gamedevelop.eu] explaining the paraboloid transformation.*

So The only way to make point light shadows work without going over the texture-sampler limit and not taking too large amount of development time is the large texture with viewports approach. This means we have to duplicate some code in the shader and implement 2 loops to do shadow calculation. One calculating shadows for all the spot lights and one for all the point lights. These two loops share large amounts of code and might be merged somewhat efficiently when refactored, but this has not been done yet.

After implementing this strategy we ran into another problem. This time the number of varying variables ([GLSL standard] page 31) in the shaders exceeded the WegGL implementation register limit. This limit in chrome is fixed at 16. This meant we could only have 1 point light with shadows, Something which is actually lower than when we used the naive implementation. Unfortunately the limit in Firefox is higher, so at least the case in which we use more than 16 varying registers it is implementation defined how smoothly it runs. So on this specific laptop it works smoothly with 2 point lights, but starts to take a large performance hit when enabling 3 or more point lights.

This is because the hardware implementation of the fragment shaders only have a couple of so called "fast registers", these are actually separate hardware implementations of real registers which allow fast access to the data stored within. If you go over this hardware limit, values normally stored in these "fast registers" will be stored in "slow registers". These are implemented by storing them in Video RAM. Which is relatively much slower than the "fast registers".

So at least in firefox the demo can be run in real time with a couple of point lights IF your hardware has a couple of extra "fast registers". After that you can still use this implementation to generate screenshots of scenes. Which still can give you a nice impression of the shadows are being cast in your garden. Something we wanted to use this application for, but offcourse it would be very nice to have a real-time solution. Unfortunately this requires at least some desktop hardware to achieve.

&lt;movie to be included and uploaded to vimeo https://drive.google.com/open?id=0B0Dw6JAvH1c9aWM3UXp1Z0dicGs &gt;

[GLSL standard]: https://www.khronos.org/files/opengles_shading_language.pdf#page=37
[devmaster.net]: http://devmaster.net/p/3002/shader-effects-shadow-mapping
[gamedevelop.eu]: http://gamedevelop.eu/en/tutorials/dual-paraboloid-shadow-mapping.htm
[WebGL Inspector]: http://benvanik.github.io/WebGL-Inspector/ "WebGL inspector homepage"
[three.js]: http://threejs.org/ "three.js homepage"
