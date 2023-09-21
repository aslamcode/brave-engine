import { BraveRender } from "./brave-render/brave-render";
import { Scene } from "./class/scene";
import { BraveEngineModeEnum } from "./enum/brave-engine-mode-enum";

export class BraveEngine {

  mode: BraveEngineModeEnum = BraveEngineModeEnum.editor;

  private canvas: HTMLCanvasElement;
  private webgl2Context: WebGL2RenderingContext;

  braveRender: BraveRender;
  scenes: Scene[] = [];

  constructor(canvas: HTMLCanvasElement, webgl2Context: WebGL2RenderingContext) {
    this.canvas = canvas;
    this.webgl2Context = webgl2Context;
    this.onStart();
  }

  private onStart() {
    this.braveRender = new BraveRender(this, this.webgl2Context); // Create a new Brave Render
    requestAnimationFrame(this.onUpdate.bind(this)); // Request to browser call engine update
  }

  private onUpdate(time: number) {
    // Set render size
    // Render size is used to calculate aspect ratio
    this.braveRender.setRenderSize(
      this.canvas?.clientWidth || 0,
      this.canvas?.clientHeight || 0
    );

    // Render the scene
    this.braveRender.render(time);

    // Call update to render the next frame
    requestAnimationFrame(this.onUpdate.bind(this));
  }

  play() {
    this.mode = BraveEngineModeEnum.running;
  }

  pause() {
    this.mode = BraveEngineModeEnum.paused;
  }

  stop() {
    this.mode = BraveEngineModeEnum.editor;
  }

  addScene() {
    const scene = new Scene(this, this.webgl2Context);
    this.scenes.push(scene);
    return scene;
  }

  setCamera() {

  }
}
