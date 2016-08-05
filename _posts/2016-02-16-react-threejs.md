---
layout: post
title: "React and Three.js"
date: "16-02-2016"
tags: React, Three.js, 3D, WebGL
thumb: minecraft.jpg
leadimg: minecraft.jpg
author: Daniel
contact: Daniel
about: the examples mentioned in this post, react-three and react-three-renderer
description: Using React for creating 3D front-ends with Three.js
github: https://github.com/tweedegolf/minecraft-character-configurator
nerd: 5
---

In the autumn of 2015, we got to know the popular javascript library [React](https://facebook.github.io/react/) very well, when we used it to create the fun quiz app [B-Slash](/#portfolio-b-slash). Soon the idea arose to research the usage of React in combination with Three.js, the leading javascript library for 3D. We've been using Three.js for some years now in our projects, for example in [Tekenjetuin](/#portfolio-tekenjetuin). We expected that using React could improve code quality in 3D projects a lot.

Currently, there are two libaries that provide React bindings for Three.js. This post will explore their differences using working examples. We hope it will help you to make up your mind which one to choose.

#### React

React has become a popular choice for creating user interfaces. React keeps a virtual DOM and changes in the UI are applied to this virtual DOM first. Then React calculates the minimal set of changes that are needed to update the real DOM to match with the virtual DOM. This process is called reconciliation. Because DOM operations are expensive, the performance benefit of React is substantial.

But there is more to React than the performance impact. Especially in combination with [Flux](https://facebook.github.io/flux/), [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) and the [debug tools](https://facebook.github.io/react/blog/2014/01/02/react-chrome-developer-tools.html) for the browser it is a very powerful and yet easy to use library to create complex UI's with reusable components.

Where React ultimately creates html that is rendered by the browser, there is an increasing number of libraries that provide React bindings for libraries that render to the canvas element such as [D3.js](https://github.com/esbullington/react-d3), [Flipboard](https://github.com/Flipboard/react-canvas) and [Chart.js](https://github.com/jhudson8/react-chartjs). There are also bindings for [SVG](https://github.com/brentvatne/react-native-svg) and another interesting experiment is [gl-react](https://github.com/ProjectSeptemberInc/gl-react).

#### React and Three.js

For Three.js there are two libraries that provide React bindings:

 - [react-three](https://github.com/Izzimach/react-three)
 - [react-three-renderer](https://github.com/toxicFork/react-three-renderer)

Three.js keeps a virtual 3D scene in memory which is rendered to the WebGL context of the canvas element every time you call the render method. The render method completely clears the canvas and creates the complete scene anew, even when nothing has changed.

Therefor we have nothing to gain performance-wise when using React with Three.js, but there is still plenty reason to use it. React encourages you to create components and move state out of components as much as possible, resulting in cleaner, better to maintain code, and the JSX notation gives you a very clear overview of the hierarchical structure of the components in your 3D scene as we will see in the code examples in the next chapter.


#### Two libraries compared

React-three is written in es5, react-three-renderer is newer and written in es6. The following code examples, that both create a simple cube, show us the differences between the libraries. First react-three:

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


We see two obvious differences:

**1)** In react-three we import one object and this object contains all available components. I have given the components the same name as the properties of the imported object, but I could have used any name. The naming convention in React commands us to write custom components starting with an uppercase, which I obied willingly.

In react-three-renderer we import one component and the available components are known within this component/tag. This is because react-three-renderer uses internal components, similar to `div`, `span` and so on. Note that the names of the components start with lowercases.


**2)** In react-three the properties geometry and material of the `Mesh` component are instances of the corresponding Three.js classes whereas in react-three-renderer both the geometry and the material are components as well.

React-three has only 17 components, but react-three-renderer strives to create components for every (relevant) Three.js class, thus gaining a higher granularity.


#### Creating components

The following example is a Minecraft character configurator that we can use to change the sizes of all the cubes that the character consists of.

![Minecraft character configurator](/assets/img/blog/minecraft_configurator_screen.png){: .with-caption}
*Screenshot of the Minecraft character configurator*

It shows you how easy it is to create 3D components with both libraries and how your code benefits from using React both in terms of being well-organised and maintainable.

All code is available at [github](https://github.com/tweedegolf/minecraft-character-configurator) and you can find the live examples [here](http://data.tweedegolf.nl/minecraft/).

The code of the main component looks as follows:

{% highlight javascript %}

  <Controls
    headSize={this.state.headSize}
    bodyWidth={this.state.bodyWidth}
    bodyHeight={this.state.bodyHeight}
    bodyDepth={this.state.bodyDepth}
    armLength={this.state.armLength}
    armSize={this.state.armSize}
    legLength={this.state.legLength}
    legSize={this.state.legSize}
  />
  <Scene3D
    sliderBusy={this.state.sliderBusy}
    cameraPosition={this.state.cameraPosition}
    cameraQuaternion={this.state.cameraQuaternion}
  >
    <World
      position={new THREE.Vector3(0, 0, 0)}
      worldRotation={this.state.worldRotation}
    >
      <Minecraft
        key={THREE.Math.generateUUID()}
        position={new THREE.Vector3(0, 0, 0)}
        quaternion={new THREE.Quaternion()}
        scale={new THREE.Vector3(1, 1, 1)}
        config={this.state.config}
      />
    </World>
  </Scene3D>

{% endhighlight %}


First we create a section that contains all controls, then we create the scenegraph containing a plane (World) on which the Minecraft character gets placed. As you can see all code specific to the Minecraft character is tucked away in its own component, leaving the hierarchal structure very clear despite its complexity.

When we take a look at the code of the Minecraft character component we see how much complexity is actually abstracted away:

{% highlight javascript %}

  <group
    key={'character'}
    position={this.props.position}
    quaternion={this.props.quaternion}
    scale={this.props.scale}
  >
    <Box
      key={'head'}
      size={config.head.size}
      color={config.head.color}
      position={config.head.position}
    />
    <Box
      key={'body'}
      size={config.body.size}
      color={config.body.color}
      position={config.body.position}
    />
    <Box
      key={'leftLeg'}
      size={config.leftLeg.size}
      color={config.leftLeg.color}
      position={config.leftLeg.position}
    />
    <Box
      key={'rightLeg'}
      size={config.rightLeg.size}
      color={config.rightLeg.color}
      position={config.rightLeg.position}
    />
    <Box
      key={'leftArm'}
      size={config.leftArm.size}
      color={config.leftArm.color}
      position={config.leftArm.position}
    />
    <Box
      key={'rightArm'}
      size={config.rightArm.size}
      color={config.rightArm.color}
      position={config.rightArm.position}
    />
  </group>

{% endhighlight %}

Here we see a component named Box which is some wrapper code around a cube. By using this component we not only reduce the amount of code in the Minecraft character module, we also abstract away differences between the 2 libraries.

This means that we can use the Minecraft character component both in projects that use react-three and in projects that use react-three-renderer.

To see the different implementations of the Box component please take a look at the code on github: [react-three](https://github.com/tweedegolf/minecraft-character-configurator/blob/master/react-three/js/components/three/box.react.js) and [react-three-renderer](https://github.com/tweedegolf/minecraft-character-configurator/blob/master/react-three-renderer/js/components/three/box.react.js).


#### Importing models

The model loaders for Three.js load the various 3D formats (Collada, FBX, Obj, JSON, and so on) and parse them into Three.js objects that can be added to the scene right away. This is very convenient when you use Three.js without React bindings, but it requires an extra conversion step when we do use React bindings because we need to parse the Three.js object into components.

I have written some utility code for this which is available at [github](https://github.com/tweedegolf/parsed-model). You can find two working examples of how to use this code with both libraries in a separate repository at [github](https://github.com/tweedegolf/parsed_model_examples).

The utility is a parser and a loader in one and this is how you use it:

{% highlight javascript %}

  let parsedModel = new ParsedModel();
  parsedModel.load('path/to/model.json');

{% endhighlight %}

After the model is loaded it is parsed right-away. During the parsing step a map containing all geometries is generated. All these geometries are merged into one single large geometry as well and for this merged geometry a multi-material is created.

Now we can use it in a React component, in react-three like so:

{% highlight javascript %}

  <Mesh
    geometry={parsedModel.mergedGeometry}
    material={parsedModel.multiMaterial}
  />

{% endhighlight %}


In react-three-renderer we need more code, on the one hand because multi-materials are not (yet) supported so we can not use the merged geometry, and on the other hand because of its higher granularity:


{% highlight javascript %}

  let meshes = [];

  parsedModel.geometries.forEach((geometry, uuid) => {
    // get the right material for this geometry using the material index
    let material = parsedModel.materialArray[materialIndices.get(uuid)];

    meshes.push(
      <mesh
        key={uuid}
      >
        <geometry
          vertices={geometry.vertices}
          faces={geometry.faces}
        />
        {createMaterial(material)}
      </mesh>
    );
  })

  <group>
    {meshes}
  </group>

{% endhighlight %}

The `createMaterial` method parses a Three.js material into a react-three-renderer component, see this code at [github](https://github.com/tweedegolf/parsed-model/blob/master/create_material.js).


#### Pros and cons

Using React-bindings for Three.js results in very clean code. Usually you don't have a hierarchical overview of your 3D scene, but with React your scene is clearly laid out in a tree of components. As as bonus, you can debug your scene with the React browser tools.

As we have seen in the Minecraft character configurator, using React is very efficient for applications that use composite components, and we have seen how smoothly React GUI controls can be connected to a 3D scene.

In applications with a flat structure, for instance when you have a lot of 3D objects placed on the scene, the JSX code of your scenegraph becomes merely a long list which might be as hard to understand as the original Three.js representation of the scenegraph.

However, with React you can split up such a long list in a breeze, for example by categorizing the 3D objects:

{% highlight javascript %}

<Scene3D>
  <models type={"characters"} />
  <models type={"buildings"} />
  <models type={"trees"} />
</Scene3D>

{% endhighlight %}


Sometimes using React requires some extra steps, for instance when loading 3D models, and sometimes it might take a bit time to find the right way of implementing common Three.js functionality like for instance user controls or calling Three.js' own render method manually.

To elaborate on the latter example: by default both react-three and react-three-renderer call Three.js' render function continuously by passing it to `Window.requestAnimationFrame()`. While this is a good choice for 3D games and animations, it is might be overkill in applications that have a more static scene like applications that simply show 3D models, or our Minecraft character configurator. In both libraries it is possible to turn off automatic rendering by setting a parameter on the scenegraph component, as you can see in the code of the Minecraft character configurator.


#### Conclusion

For the types of project that I have discussed above I would definitely recommend using React bindings for Three.js. Not only your code will be better set up and thus better maintainable, it will also speed up your work significantly once you have acquainted yourself with the workflow of React as well.

Whether you should use react-three or react-three-renderer depends on your project. Both libraries are relatively new but as you can see on Github the code gets updated on a weekly basis, and moreover there are lively discussions going on in the issue trackers and issues and suggestions are quite swiftly picked up.

Some final remarks that can help you make up your mind:

- react-three depends on Three.js r72 React version 0.14.2, react-three-renderer works with the most recent versions of both Three.js and React.
- react-three-renderer has not yet implemented all Three.js features, react-three does (mainly because its lesser granularity).
- in react-three the ray caster doesn't work i.c.w. controls like the OrbitControls, in react-three-renderer it does.
- both libraries provide excellent examples, studying these will give you a good grasp of the basic principles.

Don't hesitate to get in touch with us, if you have any questions or remarks about this post. Feedback is much appreciated.
