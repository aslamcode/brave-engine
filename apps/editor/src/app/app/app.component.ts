import { environment } from './../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UiService } from '@brave/ui';
import { CanvasComponent } from '../components/canvas/canvas.component';
import { BraveEngine, BraveRender, Camera, Cube, ScriptComponent, Time, } from '@brave/brave-engine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  @ViewChild(CanvasComponent, { static: true }) private canvas: CanvasComponent;
  private braveEngine: BraveEngine;
  private braveRender: BraveRender;

  constructor(
    private uiService: UiService,
  ) {
    this.uiService.assetsUrl = environment.assetsUrl;
  }

  ngOnInit() {
    this.onStart();
  }

  onStart() {
    this.braveEngine = new BraveEngine(this.canvas.canvasElement.nativeElement, this.canvas.webgl2Context);
    this.braveRender = this.braveEngine.braveRender;

    // Create and set camera
    const camera = new Camera();
    camera.transform.position.x = 0;
    camera.transform.position.y = 0;
    camera.transform.position.z = -3;
    this.braveRender.setCamera(camera);

    // Create sceneObjects
    const scene = this.braveEngine.addScene();

    // Create a cube and add on scene
    const cube = new Cube();
    cube.transform.position.z = -6;
    cube.transform.position.x = -3;
    cube.addComponent(new RotateCube1());
    scene.add(cube);

    const cube2 = new Cube();
    cube2.transform.position.z = -6;
    cube2.addComponent(new RotateCube2());
    scene.add(cube2);

    const cube3 = new Cube();
    cube3.transform.position.z = -6;
    cube3.transform.position.x = 3;
    cube3.addComponent(new RotateCube3());
    scene.add(cube3);

    setTimeout(() => this.braveEngine.play(), 2000);
    // setTimeout(() => this.braveEngine.stop(), 10000);
  }

}


class RotateCube1 extends ScriptComponent {
  onStart() {
    console.log('Cube 1');
  }

  onUpdate() {
    this.entity.transform.rotation.x += 10 * Time.deltaTime;
  }
}

class RotateCube2 extends ScriptComponent {
  onStart() {
    console.log('Cube 2');
  }

  onUpdate() {
    this.entity.transform.rotation.y += 10 * Time.deltaTime;
  }
}

class RotateCube3 extends ScriptComponent {
  onStart() {
    console.log('Cube 3');
  }

  onUpdate() {
    this.entity.transform.rotation.z += 10 * Time.deltaTime;
  }
}