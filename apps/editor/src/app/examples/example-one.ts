import { AudioListenerComponent, AudioSourceComponent, braveEngine, BraveEngine, Camera, Cube, Entity, eventActive, FreeCameraComponent, Hooks, Input, Invoke, MaterialComponent, MaterialCullingModeEnum, MovingAverage, Plane, Pyramid, Quad, ScriptComponent, Sphere, Time, Vector2, Vector3 } from '@brave/brave-engine';
import { EditorCameraOrbiter } from '../scripts/editor-camera-orbiter';

export function exampleOne(braveEngine: BraveEngine) {
  // Create and set camera
  const editorCamera = braveEngine.priorityCamera;
  editorCamera.transform.position.x = 0;
  editorCamera.transform.position.y = 0;
  editorCamera.transform.position.z = 0;
  editorCamera.transform.rotation.y = 0;

  // Create sceneObjects
  const scene = braveEngine.addScene();
  scene.name = 'Example one';

  // Add a main camera
  const camera = new Camera();;
  camera.mainCamera = true;
  camera.transform.position.x = 0;
  camera.transform.position.y = 1;
  camera.transform.position.z = 10;
  camera.transform.rotation.y = 0;
  camera.addComponent(new FreeCameraComponent(camera));
  camera.addComponent(new AudioListenerComponent(camera));

  scene.add(camera);

  const plane = new Plane();
  plane.transform.position.x = 0;
  plane.transform.position.y = 0;
  plane.transform.position.z = 0;
  scene.add(plane);

  // const empty = new Cube();
  // empty.transform.position.z = -1;
  // empty.transform.position.y = -0.5;
  // empty.transform.scale.x = 0.5;
  // empty.transform.scale.y = 0.5;
  // empty.transform.scale.z = 0.5;
  // scene.add(empty);
  // empty.addChild(camera);
  // // // camera.addChild(empty);
  // // // scene.add(camera);
  // empty.addComponent(new EditorCameraOrbiter(empty));
  // Hooks.register(empty);

  // Create a cube and add on scene
  const cube = new Cube();
  cube.name = 'Cube 1';
  cube.transform.position.x = -1.5;
  cube.transform.position.y = 0.5;
  cube.transform.position.z = 0;
  cube.transform.scale.x = 0.5;
  cube.addComponent(new RotateCube1(cube));
  scene.add(cube);

  // for (let i = 0; i < 3000; i++) {
  //   const cubeFor = new Cube();
  //   cubeFor.name = 'Cube for';
  //   cubeFor.transform.position.z = -6;
  //   cubeFor.transform.position.x = -3;
  //   cubeFor.transform.scale.x = 0.5;
  //   // cubeFor.addComponent(new RotateCube1(cubeFor));
  //   scene.add(cubeFor);
  // }

  const cube2 = new Cube();
  cube2.name = 'Cube 2';
  cube2.transform.position.x = 0;
  cube2.transform.position.y = 0.5;
  cube2.transform.position.z = 0;
  cube2.addComponent(new RotateCube2(cube2));

  const cube3 = new Cube();
  cube3.name = 'Cube 3';
  cube3.transform.position.x = 1.5;
  cube3.transform.position.y = 0;
  cube3.transform.position.z = 0;
  cube3.addComponent(new RotateCube3(cube3));

  cube2.addChild(cube3); // Make cube 3 child of cube 2
  scene.add(cube2);

  const pyramid = new Pyramid();
  pyramid.transform.position.x = 0;
  pyramid.transform.position.y = 0.5;
  pyramid.transform.position.z = 3;
  pyramid.transform.rotation.z = 0;
  scene.add(pyramid);

  // Create audio source and put on pyramid
  const audioSource = new AudioSourceComponent(pyramid);
  audioSource.loop = true;
  pyramid.addComponent(new RotatePyramid(pyramid));
  pyramid.addComponent(audioSource);

  const sphere = new Sphere();
  sphere.transform.position.x = 0;
  sphere.transform.position.y = 0.5;
  sphere.transform.position.z = -3;
  sphere.transform.rotation.z = 0;
  scene.add(sphere);
}

class RotateCube1 extends ScriptComponent {
  onStart() {
    const cube4 = new Cube();
    cube4.name = 'Cube 4';
    cube4.transform.position.x = 3;
    cube4.transform.position.y = 0.5;
    cube4.transform.position.z = 0;

    Invoke.setTimeout(() => {
      this.entity.scene.add(cube4);
    }, 1000);

    Invoke.setTimeout(() => {
      this.entity.addChild(cube4);
      Time.scale = 4;
    }, 2000);

    Invoke.setTimeout(() => {
      cube4.setParent();
    }, 3000);

    Invoke.setTimeout(() => {
      cube4.destroy();
      Time.scale = 0.2;
    }, 4000);

    Invoke.setTimeout(() => {
      this.destroy();
      this.entity.removeComponent(this);
    }, 5000);

    Invoke.setTimeout(() => {
      this.entity.destroy();
      Time.scale = 1;
    }, 6000);
  }

  onUpdate() {
    // this.entity.transform.position.x += -1 * Time.deltaTime;
    this.entity.transform.rotation.z += 10 * Time.deltaTime;
  }
}

class RotateCube2 extends ScriptComponent {
  onStart() {
  }

  onUpdate() {
    this.entity.transform.rotation.y += 10 * Time.deltaTime;
  }
}

class RotateCube3 extends ScriptComponent {
  onStart() {
  }

  onUpdate() {
    this.entity.transform.rotation.x += 10 * Time.deltaTime;
    this.entity.transform.rotation.y += 10 * Time.deltaTime;
    this.entity.transform.rotation.z += 10 * Time.deltaTime;
  }
}

class RotatePyramid extends ScriptComponent {
  onStart() {
  }

  onUpdate() {
    this.entity.transform.rotation.y += 30 * Time.deltaTime;
  }
}