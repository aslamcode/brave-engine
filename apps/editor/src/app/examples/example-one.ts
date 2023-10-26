import { BraveEngine, Cube, ScriptComponent, Time } from '@brave/brave-engine';

export function exampleOne(braveEngine: BraveEngine) {
  // Create and set camera
  const camera = braveEngine.camera;
  camera.transform.position.x = 0;
  camera.transform.position.y = 0;
  camera.transform.position.z = 3;
  camera.transform.rotation.z = 0;

  // Create sceneObjects
  const scene = braveEngine.addScene();

  // Create a cube and add on scene
  const cube = new Cube();
  cube.name = 'Cube 1';
  cube.transform.position.z = -6;
  cube.transform.position.x = -3;
  cube.addComponent(new RotateCube1(cube));
  scene.add(cube);

  const cube2 = new Cube();
  cube2.name = 'Cube 2';
  cube2.transform.position.z = -6;
  cube2.addComponent(new RotateCube2(cube2));

  const cube3 = new Cube();
  cube3.name = 'Cube 3';
  cube3.transform.position.z = -6;
  cube3.transform.position.x = 3;
  cube3.transform.position.y = 0;
  cube3.addComponent(new RotateCube3(cube3));

  cube2.addChild(cube3); // Make cube 3 child of cube 2

  scene.add(cube2);

  setTimeout(() => braveEngine.play(), 2000);
  // setTimeout(() => braveEngine.stop(), 10000);
}

class RotateCube1 extends ScriptComponent {
  onStart() {
    // const cube = new Cube();
    // cube.transform.position.x = -4;
    // cube.transform.position.y = 2;
    // cube.transform.position.z = -3;
    // this.entity.scene.add(cube);
  }

  onUpdate() {
    this.entity.transform.rotation.x += 10 * Time.deltaTime;
  }
}

class RotateCube2 extends ScriptComponent {
  onStart() {
  }

  onUpdate() {
    this.entity.transform.localRotation.y += 10 * Time.deltaTime;
  }
}

class RotateCube3 extends ScriptComponent {
  onStart() {
  }

  onUpdate() {
    this.entity.transform.localRotation.z += 10 * Time.deltaTime;
  }
}