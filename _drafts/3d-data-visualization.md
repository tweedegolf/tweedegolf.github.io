---
layout: post
thumb: ~
leadimg: ~
tags: Threejs, WebGL, 3D, Data, Visualization
description: 3D Data Visualization
title: 3D Data Visualization
author: Ruben
nerd: 2
---

Having data to base a descision on is useful, but just having a data sheet
containing some numbers will most of the time not help you much. To get a better
understanding of your data, people typically use some kind of visualization or
graph. In the case of geospational data, that is data which is dependent on some
location, a 2D map is the traditional solution.

However, while the world around us has three dimensions, maps on a piece of
paper can only use two. Cartographers (map-makers) use projections and symbolism
to create a 2D interpretation of the actual world. This way of working has
carried on in the internet age, with most mapping tools using only two
dimensions for displaying data. On this 2D projection mapping tools these days
add colors, markers and highlighted areas to indicate special points of interest
and to visualize data.

![City size in Devon, England](/img/blog/circle_map.png){:.thumbnail}

But as you can see in the map above (which is a visualization of city sizes in
Devon, England), visualizing data in two dimensions has its limitations: did you
notice the tiny 35 (Topsham) under Exeter? Or how large are Torquay and Paignton
really? Their bubles overlap, making it harder to identify their sizes.

Instead, if we could use the third dimension, we could use height instead of
circle radius to indicate city sizes. Now we can simply pick a size which makes
sure there are no overlaps, making it easier to interpret the data.

There are other problems in 2D projections: sometimes color (as a heatmap) is
used to indicate some value. But how much does green compare to red? Take a look
at the height map below from Mount Taranaki in New Zealand and the respective 3D
model in which the height map was given a height. As you can see, more detail is
easily visible in the 3D version and the 3D model has a more intuitive feel than
the colorized height map.

![Mt. Taranaki, New Zealand](/img/blog/mt-taranaki-colors.png){:.thumbnail}{:.with-caption}
*&copy; CC BY-SA [Koordinates](https://koordinates.com)*

![Mt. Taranaki, New Zealand](/img/blog/mt-taranaki-3d.png){:.thumbnail}{:.with-caption}
*&copy; CC BY-SA*

Having all this run in your webbrowser using WebGL using vector based approaches
instead of the pixel based tile maps often used for 2D cartography on the web
has other advantages. Interaction becomes easier to achieve and scrolling and
zooming can be made into a more smooth experience for the user.

Given all these advantages, we tried to create a prototype of a 3D map. In this
prototype we used building data provided by the Dutch government (specifically
the [BAG] and [AHN2] datasets) to determine where buildings are located and how
tall they are. We then picked some houses in our neighbourhood from Funda (a
Dutch website listing properties on sale and for rent) for which we could then
assign a color based on whether they were on sale or for rent. We also built a
quick animation for when the user clicks on a building, giving the user access
to more details at the top of the screen.

![Protype](/img/blog/skauti.png){:.thumbnail}

Below you will find a screencast of how typical user interaction in this
prototype is. We can see a lot of potential for this technique, as this
prototype was created in just two days of programming.

[BAG]: https://data.overheid.nl/data/dataset/basisregistratie-adressen-en-gebouwen-bag-
[AHN2]: https://data.overheid.nl/data/dataset/ahn2-0-5-meter-ruw-raster
