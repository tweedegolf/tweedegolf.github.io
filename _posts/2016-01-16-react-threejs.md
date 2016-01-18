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

Therefor we have nothing to gain performance-wise when using React with Threejs, but there is still plenty reason to use it. React encourages you to create components and move state out of components as much as possible, resulting in cleaner, better to maintain code, and the JSX notation gives you a very clear overview of the hierarchical structure of the components in your 3D scene as we will see in the code examples in the next chapter.


####Two libraries compared

The library react-three is written in es5 and react-three-renderer is newer and written in es6.

Let's have a look at the following code examples that both create a simple cube. First react-three:

{% highlight xml %}

  import React3 from 'react-three';

  let Scene = React3.Scene
  let Camera = React3.Camera;
  let AmbientLight = React3.AmbientLight;
  let Mesh = React3.Mesh;

  <Scene
    width={window.innerWidth}
    height={window.innerHeight}
  >
    <Camera
      aspect={window.innerWidth / window.innerHeight}
      far={1000}
      fov={50}
      near={1}
    />
    <AmbientLight
      color={this.props.color}
      intensity={this.props.intensity}
    />
    <Mesh
      position={this.props.position}
      geometry={new THREE.BoxGeometry(this.props.size, this.props.size, this.props.size)}
      material={new THREE.MeshBasicMaterial({color: this.props.color})}
    />
  />
{% endhighlight %}


And now the same in react-three-renderer:

{% highlight xml %}

  import Scene from 'react-three-renderer'

  <Scene
    width={window.innerWidth}
    height={window.innerHeight}
  >
    <perspectiveCamera
      aspect={window.innerWidth / window.innerHeight}
      far={1000}
      fov={50}
      near={1}
    />
    <ambientLight
      color={this.props.color}
    />
    <mesh
      position={this.props.position}
      <boxGeometry
        width={this.props.size}
        height={this.props.size}
        depth={this.props.size}
      />
      </meshBasicMaterial
        color={this.props.color}
      />
    />
  />
{% endhighlight %}


We see 2 obvious differences:

**1)** In react-three we import one object and this object contains all available components. I have given the components the same name as the properties of the imported object, but I could have used any name. The naming convention in React commands us to write custom components with an uppercase, which I obied willingly.

In react-three-renderer we import one component and the available components are known within this tag. This is because react-three-renderer uses internal component, similar to `div`, `span` and so on. Note that the names of the components start with lowercases.


**2)** In react-three the properties geometry and material of the `Mesh` component are instances of the corresponding Threejs classes whereas in react-three-renderer both the geometry and the material are components as well.

React-three has only 17 components, but react-three-renderer strives to create components for every Threejs class, thus gaining a higher granularity.



####Importing models

The model loaders for Threejs load the various 3D formats (Collada, FBX, Obj, JSON, and so on) into Threejs objects that can be added to the scene right away. Where this is very convenient when you use Threejs without React bindings, it requires an extra conversion step when we do use React bindings because we need to parse the Threejs object into components.

To accomplish this, we need to extract the geometries and the materials from the model:

{% highlight javascript %}

  let model; // the loaded 3d model
  let materialIndices = new Map();
  let materialsArray = [];
  let geometries = new Map();

  model.traverse((child) => {
    if(child instanceof THREE.Mesh){
      let uuid = child.material.uuid;
      materialIndices.set(uuid, index++);
      materialsArray.push(child.material);
      geometries.set(uuid, child.geometry);
    }
  });

  // create multimaterial
  let multiMaterial = new THREE.MeshFaceMaterial(this.materialsArray);

  let merged = new THREE.Geometry();
  // merge the geometry and apply the matrix of the new position
  geometries.forEach((g, uuid) => {
    merged.merge(g, model.matrix, this.materialIndices.get(uuid));
  });

  mergedGeometry = new THREE.BufferGeometry().fromGeometry(merged);

{% endhighlight %}


Now we can create React components from the imported models. Because multimaterials are supported in react-three we can use the merged geometry:

{% highlight javascript %}

  <Mesh
    geometry={mergedGeometry}
    material={mutliMaterial}
  />

{% endhighlight %}

In react-three-renderer we need more code:


{% highlight javascript %}



  <object3d>
    geometry={mergedGeometry}
    material={mutliMaterial}
  />

{% endhighlight %}



####Pros and cons

Using React-bindings for Threejs results in very clean code. Usually you don't have a clear hierarchical overview of your 3D scene, but with React your scene is clearly laid out in a tree of components. As as bonus, you can debug your scene with the React browser tools.

Sometimes using React requires some extra steps, for instance when loading 3D models.

Also, it is a bit more difficult to control the renderer. By default





