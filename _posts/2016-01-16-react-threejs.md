---
layout: post
title: "React and Threejs"
date: "16-01-2016"
tags: React, Three.js, 3D, WebGL
author: Daniel
description: Using React for creating 3D front-ends with Threejs
nerd: 3
---

####React


React has become a popular choice for creating user interfaces. React keeps a virtual DOM and changes in the UI are applied to this virtual DOM first. Then React calculates the minimal set of changes that are needed to update the real DOM to match with the virtual DOM. This process is called reconciliation. Because DOM operations are expensive, the performance benefit of React is substantial.

But there is more to React than the performance impact. Especially in combination with [Flux](https://facebook.github.io/flux/), [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) and the [debug tools](https://facebook.github.io/react/blog/2014/01/02/react-chrome-developer-tools.html) for the browser it is a very powerful and yet easy library to create complex UI's with reusable components.

Where React ultimately creates html that is rendered by the browser, there is an increasing number of libraries that provide React bindings for libraries that render to the canvas element such as [D3.js](https://github.com/esbullington/react-d3), [Flipboard](https://github.com/Flipboard/react-canvas) and [Chart.js](https://github.com/jhudson8/react-chartjs). There are also bindings for [SVG](https://github.com/brentvatne/react-native-svg) and another interesting experiment is [gl-react](https://github.com/ProjectSeptemberInc/gl-react).



####React and Threejs

For Threejs there are 2 libraries that provide React bindings:
 - [react-three](https://github.com/Izzimach/react-three)
 - [react-three-renderer](https://github.com/toxicFork/react-three-renderer)

Threejs keeps a virtual 3D scene in memory which is rendered to the WebGL context of the canvas element every time you call the render method. The render method completely clears the canvas and creates the complete scene anew, even when nothing has changed.

Therefor we have nothing to gain performance-wise when using React with Threejs, but there is still plenty reason to use it. React encourages you to create components and move state out of components as much as possible, resulting in cleaner, better to maintain code, and the JSX notation gives you a very clear overview of the hierarchical structure of the components in your 3D scene. For example, your scene in react-tree might look like this:

{% highlight xml %}
  <Scene
    width={window.innerWidth}
    height={window.innerHeight}
    camera={'camera'}
  >
    <Camera
      aspect={window.innerWidth / window.innerHeight}
      far={1000}
      fov={50}
      near={1}
      position={new THREE.Vector3(0, 300, 500)}
    />
    <Mesh
      geometry={new THREE.BoxGeometry(this.props.size, this.props.size, this.props.size)}
      key={THREE.Math.generateUUID()}
      material={new THREE.MeshBasicMaterial({color: this.props.color})}
      position={this.props.position}
    />
  </Scene>
{% endhighlight %}


This creates a scene with a simple cube. Note that the properties of the components can be instances of Threejs classes as well, for instance the geometry parameter of the `Mesh` component is an instance of `THREE.BoxGeometry`.

####Two libraries compared

 - react-three:

   - written in es5
   - uses composite components


 - react-three-renderer:

   - written in es6
   - no composite components






