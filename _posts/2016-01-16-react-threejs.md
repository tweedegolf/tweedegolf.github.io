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

But there is more to React than the performance impact. Especially in combination with [Flux](https://facebook.github.io/flux/), [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) and the [debug tools](https://facebook.github.io/react/blog/2014/01/02/react-chrome-developer-tools.html) for the browser it is a very powerful and yet easy to use library to create complex UI's with reusable components.

Where React ultimately creates html that is rendered by the browser, there is an increasing number of libraries that provide React bindings for libraries that render to the canvas element such as [D3.js](https://github.com/esbullington/react-d3), [Flipboard](https://github.com/Flipboard/react-canvas) and [Chart.js](https://github.com/jhudson8/react-chartjs). There are also bindings for [SVG](https://github.com/brentvatne/react-native-svg) and another interesting experiment is [gl-react](https://github.com/ProjectSeptemberInc/gl-react).



####React and Threejs

For Threejs there are 2 libraries that provide React bindings:

 - [react-three](https://github.com/Izzimach/react-three)
 - [react-three-renderer](https://github.com/toxicFork/react-three-renderer)

Threejs keeps a virtual 3D scene in memory which is rendered to the WebGL context of the canvas element every time you call the render method. The render method completely clears the canvas and creates the complete scene anew, even when nothing has changed.

Therefor we have nothing to gain performance-wise when using React with Threejs, but there is still plenty reason to use it. React encourages you to create components and move state out of components as much as possible, resulting in cleaner, better to maintain code, and the JSX notation gives you a very clear overview of the hierarchical structure of the components in your 3D scene as we will see in the code examples in the next chapter.


####Two libraries compared

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


We see 2 obvious differences:

**1)** In react-three we import one object and this object contains all available components. I have given the components the same name as the properties of the imported object, but I could have used any name. The naming convention in React commands us to write custom components starting with an uppercase, which I obied willingly.

In react-three-renderer we import one component and the available components are known within this component/tag. This is because react-three-renderer uses internal components, similar to `div`, `span` and so on. Note that the names of the components start with lowercases.


**2)** In react-three the properties geometry and material of the `Mesh` component are instances of the corresponding Threejs classes whereas in react-three-renderer both the geometry and the material are components as well.

React-three has only 17 components, but react-three-renderer strives to create components for every (relevant) Threejs class, thus gaining a higher granularity.



####Importing models

The model loaders for Threejs load the various 3D formats (Collada, FBX, Obj, JSON, and so on) and parse them into Threejs objects that can be added to the scene right away. This is very convenient when you use Threejs without React bindings, but it requires an extra conversion step when we do use React bindings because we need to parse the Threejs object into components.

To accomplish this, we need to extract the geometries and the materials from the model:

{% highlight javascript %}

  let model; // the loaded 3d model
  let materialsArray = [];
  let materialIndices = new Map();
  let geometries = new Map();
  let index = 0;

  model.traverse((child) => {
    if(child instanceof THREE.Mesh){
      let uuid = child.material.uuid;
      materialIndices.set(uuid, index++);
      materialsArray.push(child.material);
      geometries.set(uuid, child.geometry);
    }
  });

  // create multimaterial
  let multiMaterial = new THREE.MeshFaceMaterial(materialsArray);

  // merge the geometries and apply the matrix of the original model
  let merged = new THREE.Geometry();
  geometries.forEach((g, uuid) => {
    merged.merge(g, model.matrix, this.materialIndices.get(uuid));
  });

  mergedGeometry = new THREE.BufferGeometry().fromGeometry(merged);

{% endhighlight %}


Now we can create React components from the imported models. Because multi-materials are supported in react-three we can simply use the merged geometry and the multi-material:

{% highlight javascript %}

  <Mesh
    geometry={mergedGeometry}
    material={multiMaterial}
  />

{% endhighlight %}


In react-three-renderer we need more code, on the one hand because multi-materials are not (yet) supported and on the other hand because of its higher granularity:


{% highlight javascript %}

  // simple method that parses a Threejs material into a component (to be extended with other types of material)
  function getMaterial(material){
    let m;
    switch(material.type){
      case 'MeshBasicMaterial':
        m = (
          <meshBasicMaterial
            color={material.color}
          />
        );
        break;
      case 'MeshLambertMaterial':
        m = (
          <meshLambertMaterial
            transparent={material.transparent}
            alphaTest={material.alphaTest}
            side={material.side}
            opacity={material.opacity}
            visible={material.visible}
            color={material.color}
            emissive={material.emissive}
            wireframe={material.wireframe}
            wireframeLinewidth={material.wireframeLinewidth}
          />
        );
        break;
    }

    return m;
  }


  let meshes = [];

  geometries.forEach((geometry, uuid) => {
    // get the right material for this geometry using the material index
    let material = materialArray[materialIndices.get(uuid)];

    meshes.push(
      <mesh
        key={uuid}
      >
        <geometry
          vertices={geometry.vertices}
          faces={geometry.faces}
        />
        {getMaterial(material)}
      </mesh>
    );
  })


  <group>
    {meshes}
  </group>

{% endhighlight %}



####Pros and cons

Using React-bindings for Threejs results in very clean code. Usually you don't have a hierarchical overview of your 3D scene, but with React your scene is clearly laid out in a tree of components. As as bonus, you can debug your scene with the React browser tools.

Sometimes using React requires some extra steps, for instance when loading 3D models.

Also, you don't have direct control over the renderer. By default both react-three and react-three-renderer call Threejs' render function continuously by passing it to `Window.requestAnimationFrame()`. While this is a good choice for 3D games and animations, it is might be overkill in applications that have a more static scene like applications that simply show 3D models.

In react-three you can turn off the automatic render function by setting a parameter in the scene component (`enableRapidRender=false`), but in react-three-renderer you need to change the code yourself to accomplish this.

Another issue is that react-three-renderer does not support Threejs' mouse and keyboard controls such as OrbitControls, FlyControls, VRControls and so on. React-three supports only the OrbitControls.

Of course you can add it yourself but notably the code of react-three-renderer will take quite some time to understand and master.


####Conclusion

Dependent on the type of application, using React bindings is very useful: not only your code will be better set up and thus better maintainable, also it will speed up your work significantly once you have acquainted yourself with the work flow of React.

Both libraries are relatively new and as you can see on Github the code gets updated on a weekly basis. I expect both libraries to mature over time and things might speed up as other developers start to contribute to the repositories.


