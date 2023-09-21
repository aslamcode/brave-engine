import { environment } from './../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UiService } from '@brave/ui';
import { CanvasComponent } from '../components/canvas/canvas.component';
import { BraveRender, Camera, Cube, Scene, } from '@brave/brave-engine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  @ViewChild(CanvasComponent, { static: true }) private canvas: CanvasComponent;
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
    // Get the Webgl context
    const glContext = this.canvas.webgl2Context;

    // Create a new Brave Render
    this.braveRender = new BraveRender(glContext);

    // Create and set camera
    const camera = new Camera();
    camera.transform.position.x = 0;
    camera.transform.position.y = 0;
    camera.transform.position.z = -3;
    this.braveRender.setCamera(camera);

    // Create sceneObjects
    this.scene = new Scene(glContext);
    this.braveRender.scenes.push(this.scene);

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

    requestAnimationFrame(this.onUpdate.bind(this));
  }

  onUpdate(time: number) {
    // Set render size
    // Render size is used to calculate aspect ratio
    this.braveRender.setRenderSize(
      this.canvas?.canvasElement?.nativeElement.clientWidth || 0,
      this.canvas?.canvasElement?.nativeElement.clientHeight || 0
    );

    // Render the scene
    this.braveRender.render(time);

    // Call update to render the next frame
    requestAnimationFrame(this.onUpdate.bind(this));
  }

}




