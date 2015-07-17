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
containing some numbers will most of the time not help you much. Especially when
the amount of numbers gets large. To get a better understanding of data, people
typically use some kind of visualization or graph. In the case of geospational
data (i.e. data which is dependent on some location) a 2D map is the traditional
solution.

Visualizing your data on a 2D map in stead of in a spreadsheet can really mean a
big improvement. Cartographers (map-makers) use projections and symbolism
to create a 2D interpretation of the actual world. This way of working has
carried on in the internet age, with most mapping tools using only two
dimensions for displaying data. On the resulting 2D projection, mapping tools
these days add colors, markers and highlighted areas to indicate special points
of interest and to try to provide as much insight to the data as possible.

![City size in Devon, England](/img/blog/circle_map.png){:.thumbnail}

But as you can see in the map above (which is a visualization of city sizes in
Devon, England), visualizing data in just two dimensions has its limitations:
did you notice the tiny 35 (Topsham) under Exeter? Or how large are Torquay and
Paignton really? Their bubles overlap, making it harder to identify their sizes.

Instead, if we could use the third dimension as well, we could use a height
instead of the circle radius to indicate city sizes. And we can simply pick a
radius which makes sure there are no overlaps, making it easier to interpret
the data.

There are other problems in 2D projections: sometimes color is used to indicate
some value (as in a heatmap). But how does green compare to red? Take a look at
the height map below from Mount Taranaki in New Zealand and the respective 3D
model in which the height map was actually given a height. As you can see you
can see much more details in the 3D version and the 3D model has a much more
intuitive feel than the colorized height map.

![Mt. Taranaki, New Zealand](/img/blog/mt-taranaki-colors.png){:.thumbnail}{:.with-caption}
*&copy; CC BY-SA [Koordinates](https://koordinates.com)*

![Mt. Taranaki, New Zealand](/img/blog/mt-taranaki-3d.png){:.thumbnail}{:.with-caption}
*&copy; CC BY-SA*

All this can be run in your webbrowser using WebGL with vector based approaches
instead of the pixel based tile maps often used for 2D cartography on the web.
And besides that it looks great, it has some more advantages: interaction
becomes easier to achieve and scrolling and zooming can be made into a more
smooth experience for the user.

Given these advantages, we created a small prototype of a 3D map. In this
prototype we used building data provided by the Dutch government (specifically
the [BAG]{:target="_blank"} and [AHN2]{:target="_blank"} datasets) to determine
where buildings are located and how tall they are. We then picked some houses in
our neighbourhood from Funda (a Dutch website listing properties on sale and for
rent) for which we could then assign a color based on whether they were on sale
or for rent. We also built a quick animation for when the user clicks on a
building, giving the user access to more details at the top of the screen.

![Protype](/img/blog/skauti.png){:.thumbnail}

Below you will find a screencast of how typical user interaction in this
prototype is. We see a lot of potential for this technique, as this prototype
was created in just two days of programming using our framework.

<iframe src="https://player.vimeo.com/video/133463503" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

[BAG]: https://data.overheid.nl/data/dataset/basisregistratie-adressen-en-gebouwen-bag-
[AHN2]: https://data.overheid.nl/data/dataset/ahn2-0-5-meter-ruw-raster
