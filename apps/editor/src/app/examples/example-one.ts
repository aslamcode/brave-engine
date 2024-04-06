import { BraveEngine, Cube, ScriptComponent, Time } from '@brave/brave-engine';

export function exampleOne(braveEngine: BraveEngine) {
  // Create and set camera
  const camera = braveEngine.camera;
  camera.transform.position.x = 0;
  camera.transform.position.y = 0;
  camera.transform.position.z = 10;

  // Create sceneObjects
  const scene = braveEngine.addScene();
  scene.name = 'Example one';

  // Create a cube and add on scene
  const cube = new Cube();
  cube.name = 'Cube 1';
  cube.transform.localPosition.z = -6;
  cube.transform.localPosition.x = -3;
  cube.transform.localScale.x = 0.5;
  cube.addComponent(new RotateCube1(cube));
  scene.add(cube);

  const cube2 = new Cube();
  cube2.name = 'Cube 2';
  cube2.transform.localPosition.z = -6;
  cube2.transform.localPosition.x = 0;
  cube2.addComponent(new RotateCube2(cube2));

  const cube3 = new Cube();
  cube3.name = 'Cube 3';
  cube3.transform.localPosition.z = 0;
  cube3.transform.localPosition.x = 3;
  cube3.transform.localPosition.y = 0;
  cube3.addComponent(new RotateCube3(cube3));

  cube2.addChild(cube3); // Make cube 3 child of cube 2

  scene.add(cube2);
}

class RotateCube1 extends ScriptComponent {
  onStart() {
  }

  onUpdate() {
    this.entity.transform.localPosition.x += -1 * Time.deltaTime;
    this.entity.transform.localRotation.z += 10 * Time.deltaTime;
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
    this.entity.transform.localRotation.x += 10 * Time.deltaTime;
    this.entity.transform.localRotation.y += 10 * Time.deltaTime;
    this.entity.transform.localRotation.z += 10 * Time.deltaTime;
  }
}