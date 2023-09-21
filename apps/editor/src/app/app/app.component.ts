import { environment } from './../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UiService } from '@brave/ui';
import { CanvasComponent } from '../components/canvas/canvas.component';
import { BraveEngine, BraveRender, Camera, Cube, Scene, } from '@brave/brave-engine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  @ViewChild(CanvasComponent, { static: true }) private canvas: CanvasComponent;
  private braveEngine: BraveEngine;
  private braveRender: BraveRender;
  private scene: Scene;

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
    this.scene = this.braveEngine.addScene();

    // Create a cube and add on scene
    const cube = new Cube();
    cube.transform.position.z = -6;
    cube.transform.position.x = -3;
    this.scene.add(cube);

    const cube2 = new Cube();
    cube2.transform.position.z = -6;
    this.scene.add(cube2);

    const cube3 = new Cube();
    cube3.transform.position.z = -6;
    cube3.transform.position.x = 3;
    this.scene.add(cube3);

    // Animate cube rotations. The right way is using onUpdate lifecyle hook in game object, this is just a test.
    setInterval(() => {
      cube.transform.rotation.x += 0.1;
      cube2.transform.rotation.y += 0.1;
      cube3.transform.rotation.z += 0.1;
    });
  }

}




