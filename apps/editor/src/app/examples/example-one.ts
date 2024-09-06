import { BraveEngine, Cube, Entity, Hooks, Invoke, MaterialComponent, MaterialCullingModeEnum, ScriptComponent, Time } from '@brave/brave-engine';
import { EditorCameraOrbiter } from '../scripts/editor-camera-orbiter';

export function exampleOne(braveEngine: BraveEngine) {
  // Create and set camera
  const camera = braveEngine.camera;
  camera.transform.position.x = 0;
  camera.transform.position.y = 1;
  camera.transform.position.z = 1;
  camera.transform.rotation.y = 0;

  // Create sceneObjects
  const scene = braveEngine.addScene();
  scene.name = 'Example one';

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
  cube.transform.position.z = -6;
  cube.transform.position.x = -1.5;
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
  cube2.transform.position.z = -6;
  cube2.transform.position.x = 0;
  cube2.addComponent(new RotateCube2(cube2));

  const cube3 = new Cube();
  cube3.name = 'Cube 3';
  cube3.transform.position.z = 0;
  cube3.transform.position.x = 1.5;
  cube3.transform.position.y = 0;
  cube3.addComponent(new RotateCube3(cube3));

  cube2.addChild(cube3); // Make cube 3 child of cube 2

  scene.add(cube2);
}

class RotateCube1 extends ScriptComponent {
  onStart() {
    const cube4 = new Cube();
    cube4.name = 'Cube 4';
    cube4.transform.position.z = -6;
    cube4.transform.position.x = 3;

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