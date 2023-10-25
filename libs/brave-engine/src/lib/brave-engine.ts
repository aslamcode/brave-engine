import { BraveRender } from "./brave-render/brave-render";
import { Scene } from "./class/scene";
import { BraveEngineModeEnum } from "./enum/brave-engine-mode-enum";
import { Subject } from 'rxjs';
import { Time } from "./static/time";
import { Camera } from "./entity/camera";

export class BraveEngine {

  mode: BraveEngineModeEnum = BraveEngineModeEnum.editor;

  private canvas: HTMLCanvasElement;
  private webgl2Context: WebGL2RenderingContext;

  camera: Camera;
  braveRender: BraveRender;
  scenes: Scene[] = [];

  modeSubject = new Subject<BraveEngineModeEnum>();

  private lastUpdatedTime = 0;

  constructor(canvas: HTMLCanvasElement, webgl2Context: WebGL2RenderingContext) {
    this.canvas = canvas;
    this.webgl2Context = webgl2Context;

    this.camera = new Camera();
    this.braveRender = new BraveRender(this, this.webgl2Context);
    this.braveRender.setCamera(this.camera);

    this.onStart();
  }

  private onStart() {
    requestAnimationFrame(this.onUpdate.bind(this)); // Request to browser call engine update
  }

  private onUpdate(elapsedTime: number) {
    // Calculate delta time and update lastUpdatedTime
    const timeInSeconds = elapsedTime * 0.001;
    const deltaTime = timeInSeconds - this.lastUpdatedTime;
    this.lastUpdatedTime = timeInSeconds;
    Time.deltaTime = deltaTime;

    // Set render size
    // Render size is used to calculate aspect ratio
    this.braveRender.setRenderSize(
      this.canvas?.clientWidth || 0,
      this.canvas?.clientHeight || 0
    );

    // Render the scene
    this.braveRender.render();

    // Call update to render the next frame
    requestAnimationFrame(this.onUpdate.bind(this));
  }

  // #region Play controls

  play() {
    this.mode = BraveEngineModeEnum.running;
    this.modeSubject.next(this.mode);
  }

  pause() {
    this.mode = BraveEngineModeEnum.paused;
    this.modeSubject.next(this.mode);
  }

  stop() {
    this.mode = BraveEngineModeEnum.editor;
    this.modeSubject.next(this.mode);
  }

  // #endregion Play controls

  addScene() {
    const scene = new Scene(this, this.webgl2Context);
    this.scenes.push(scene);
    return scene;
  }

  setCamera(camera: Camera) {
    this.camera = camera;
    this.braveRender.setCamera(camera);
  }
}
