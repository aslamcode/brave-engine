import { BraveEngine, Cube, Invoke, ScriptComponent, Time } from '@brave/brave-engine';

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
  cube.transform.position.z = -6;
  cube.transform.position.x = -3;
  cube.transform.scale.x = 0.5;
  cube.addComponent(new RotateCube1(cube));
  scene.add(cube);

  // for (let i = 0; i < 3000; i++) {
  //   const cubeFor = new Cube();
  //   cubeFor.name = 'Cube for';
  //   cubeFor.transform.position.z = -6;
  //   cubeFor.transform.position.x = -3;
  //   cubeFor.transform.scale.x = 0.5;
  //   cubeFor.addComponent(new RotateCube1(cubeFor));
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
  cube3.transform.position.x = 3;
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
    cube4.transform.position.x = 6;

    Invoke.setTimeout(() => {
      this.entity.scene.add(cube4);
    }, 1000);

    Invoke.setTimeout(() => {
      this.entity.addChild(cube4);
    }, 2000);

    Invoke.setTimeout(() => {
      cube4.setParent();
    }, 3000);

    Invoke.setTimeout(() => {
      cube4.destroy();
    }, 4000);

    Invoke.setTimeout(() => {
      this.destroy();
      this.entity.removeComponent(this);
    }, 5000);

    Invoke.setTimeout(() => {
      this.entity.destroy();
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