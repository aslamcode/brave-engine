import { Injectable } from '@angular/core';
import { braveEngine, BraveEngine, BraveEngineHooks } from '@brave/brave-engine';
import { CanvasComponent } from '../components/canvas/canvas.component';
import { exampleOne } from '../examples/example-one';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  public braveEngine: BraveEngine;
  public canvas: CanvasComponent;

  onStart(canvas: CanvasComponent) {
    this.canvas = canvas;

    const webgl2Context = this.canvas.webgl2Context;
    this.braveEngine = braveEngine;
    this.braveEngine.initialize(this.canvas.canvasElement.nativeElement, webgl2Context);

    BraveEngineHooks.register(this.braveEngine.camera);

    // Run examples
    exampleOne(this.braveEngine);
  }

}