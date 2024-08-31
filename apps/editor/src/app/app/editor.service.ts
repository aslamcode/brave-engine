import { Injectable } from '@angular/core';
import { braveEngine, BraveEngine, Camera, Hooks } from '@brave/brave-engine';
import { CanvasComponent } from '../components/canvas/canvas.component';
import { exampleOne } from '../examples/example-one';
import { EditorCameraOrbiter } from '../scripts/editor-camera-orbiter';
import { editorViewInputEvent } from '../input-event/editor-view-input-event';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  public braveEngine: BraveEngine;
  public canvas: CanvasComponent;
  public camera: Camera;

  onStart(canvas: CanvasComponent) {
    this.canvas = canvas;

    const webgl2Context = this.canvas.webgl2Context;
    this.braveEngine = braveEngine;

    this.braveEngine.initialize(this.canvas.canvasElement.nativeElement, webgl2Context);

    editorViewInputEvent.setContext(this.canvas.canvasElement.nativeElement);

    this.camera = this.braveEngine.camera;
    this.camera.addComponent(new EditorCameraOrbiter(this.camera));

    editorViewInputEvent.setContext(this.canvas.canvasElement.nativeElement);

    Hooks.register(this.camera);

    // Run examples
    exampleOne(this.braveEngine);
  }

}