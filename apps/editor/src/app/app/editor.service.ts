import { Injectable } from '@angular/core';
import { BraveEngine } from '@brave/brave-engine';
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
    this.braveEngine = new BraveEngine(this.canvas.canvasElement.nativeElement, webgl2Context);

    // Run examples
    exampleOne(this.braveEngine);

    console.log(this.braveEngine.scenes);
  }

}