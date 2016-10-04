---
layout: post
title: "Point Light Shadows In Three.js, part II"
date: "2015-08-02"
description: Follow up post on point light shadows in Three.js.
thumb: light2-shader.png
leadimg: light2-shader.png
tags: Three.js, point light, shadow casting, WebGL
author: Dennis
contact: RubenN
about: Point light shadows in Three.js
nerd: 5
---

While working on [a 3D project] that involved garden lights we stumbled upon unexpected problems with shadows cast from point lights. The shadows were either not there at all or they were just all over the place. It seemed impossible to create a decent light/shadow world (garden in our case). After recovering from the initial shock and disappointment we started investigating the problem. This should be doable. As it turns out, it sort of is. Read on.

In the [previous blog post] about this topic we talked about possible ways to implement an efficient way of calculating point light shadows in [Three.js], the javascript 3D library. 'Efficient' meaning: taking fewer texture samplers than the naive approach which takes six samplers for each point light, one for each of the principal directions.

We came up with three potential solutions:

* Divide a larger texture into smaller viewports and draw the depth map to each of these viewports
* Render each of the depth maps to one side of a cube texture map
* Use dual-hyperboloid shadow mapping

We will first discuss the three approaches and finish up with the results of the most successful one.

### Possible solutions

The first approach - dividing a larger texture into smaller viewports - proved to be difficult to integrate with the current shader and uniform variables.
The GLSL shader language requires all of the for loops to be unrollable, as the shaders can then be divided into small chunks of work for each of the stream processors of the GPU.
When handling an assortment of textures, some of which have this subdivision of smaller textures, it is a pretty complex task to write it in such a way that it is unrollable without making two separate loops for the two types of textures. Which in turn makes maintaining the shader code quite a hassle.

![viewports](/assets/img/blog/light2-viewports-grid.png){:.thumbnail}{:.with-caption}
*Image from the internal rendering in Three.js. The grid is added to clarify what happens. The grid locations correspond with +x, &minus;x, +y, &minus;y, +z and &minus;z axis, going from top left to bottom right.*

The second approach, the cube texture, was scrapped halfway through development. While the solution seemed obvious and also is used in the industry, it was very hard to debug.
Both Firefox' native canvas debugger and Chrome's WebGL debugger, called the [WebGL Inspector], did not render the cube texture properly. We could observe the switching of framebuffers (which are like internal screens to draw on) but they stayed blank while the draw calls proceeded. This means Three.js did not cull them and they should have shown up on the framebuffer. With no way to debug this step and no output it would be ill-advised to continue to develop this method.

![cube depth map](/assets/img/blog/light2-shadow-cube.png){:.thumbnail}{:.with-caption}
*Image taken from [devmaster.net] explaining shadow mapping using cube maps.*

The final approach is the dual-paraboloid shadow mapping. This approach takes two textures per point light. The [previous blog post] talked about one, but this proved to be incorrect. This fact would make it less ideal than the other two approaches. On top of that, the implementation is rather complex. If we had complete control over the OpenGL code this could be a solution, but figuring out where to adapt the Three.js code and the shaders would probably turn out to be a struggle. As it would also involve a transformation to paraboloid space it would be really hard to debug. All this would be required for a lesser effect than the other - hopefully more simple - methods, like the larger texture with viewports.

![paraboloid transformation](/assets/img/blog/light2-paraboloid-transformation.png){:.thumbnail}{:.with-caption}*Image taken from [gamedevelop.eu] explaining the paraboloid transformation.*

### The most favorable approach
In conclusion the best way to make point light shadows work, without going over the texture-sampler limit or spending too much time, is the "large texture with viewports" approach. This means we have to duplicate some code in the shader and implement two loops to do shadow calculation: one calculating shadows for all the spot lights and one for all the point lights.

After implementing this strategy we ran into another problem. This time the number of varying variables ([GLSL standard] page 31) in the shaders exceeded the WebGL implementation register limit. This limit in Chrome is fixed at 16. This meant we could only have one point light with shadows, which is even fewer than when we used the naive implementation. In Firefox the limit is higher which results from it being hardware implementation defined. On my - basic - hardware, it works smoothly with two point lights, but the performance starts to suffer when enabling three or more point lights. The result is shown in the video below.

The reason for this is that the hardware implementation of the fragment shaders only has a couple of "fast registers". These are actually separate hardware implementations of real registers which allow fast access to the data stored within. If you exceed this hardware limit, values normally stored in these fast registers will be stored in "slow registers". These are implemented by storing them in Video RAM, which is much slower relative to the fast registers.

<iframe src="https://player.vimeo.com/video/133734871" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>{: .with-caption}
*Shadows from point lights in our demo*

### Conclusion
Can we use these results for something practical? Yes, in Firefox this demo will run in real-time with a couple of point lights IF your hardware has some extra "fast registers". If you want to use more than a couple point lights, you can still use this implementation to generate screenshots of scenes that give a nice impression of the shadows being cast (in a garden, in a living room etc).

For an extensive, real-time solution you will need above average desktop hardware. Consumers using popular devices (smartphones, tablets, laptops) are obviously not part of the target audience. However, practical applications are still to found in - for example - fixed setups like a presentation in an exhibition stand.



[GLSL standard]: https://www.khronos.org/files/opengles_shading_language.pdf#page=37
[devmaster.net]: http://devmaster.net/p/3002/shader-effects-shadow-mapping
[gamedevelop.eu]: http://gamedevelop.eu/en/tutorials/dual-paraboloid-shadow-mapping.htm
[WebGL Inspector]: http://benvanik.github.io/WebGL-Inspector/ "WebGL inspector homepage"
[Three.js]: http://threejs.org/ "three.js homepage"
[previous blog post]: /2015/05/21/point-light-shadows-in-threejs/
[a 3D project]: /2015/08/14/intelligent-3d-design/
