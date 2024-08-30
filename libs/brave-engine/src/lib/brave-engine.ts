import { BraveRender } from "./brave-render/brave-render";
import { Scene } from "./class/scene";
import { BraveEngineModeEnum } from "./enum/brave-engine-mode-enum";
import { Subject } from 'rxjs';
import { Time } from "./static/time";
import { Camera } from "./entity/camera";
import { BraveEngineVsyncModeEnum } from "./enum/brave-engine-vsync-mode.enum";

export class BraveEngine {

  mode = BraveEngineModeEnum.editor;
  vSyncMode = BraveEngineVsyncModeEnum.sync;

  private canvas: HTMLCanvasElement;
  private webgl2Context: WebGL2RenderingContext;

  camera: Camera;
  braveRender: BraveRender;
  scenes: Scene[] = [];

  modeSubject = new Subject<BraveEngineModeEnum>();

  private lastUpdatedTime = 0;
  private updateInterval?: ReturnType<typeof setInterval>;

  initialize(canvas: HTMLCanvasElement, webgl2Context: WebGL2RenderingContext) {
    this.canvas = canvas;
    this.webgl2Context = webgl2Context;

    this.camera = new Camera();
    this.braveRender = new BraveRender(this, this.webgl2Context);
    this.braveRender.setCamera(this.camera);

    this.onStart();

    // setInterval(() => {
    //   console.log("FPS", Time.fps);
    //   console.log("Theorical FPS", Time.tFps);
    // }, 1000);
  }

  private onStart() {
    if (this.vSyncMode == BraveEngineVsyncModeEnum.sync) {
      requestAnimationFrame(this.onUpdate.bind(this)); // Request to browser call engine update
    } else {
      this.onUpdate(0);
    }
  }

  private onUpdate(elapsedTime: number) {
    const renderStartTime = window.performance.now();

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

    const renderEndTime = window.performance.now();

    Time.renderTime = (renderEndTime - renderStartTime) * 0.001;

    // Call update to render the next frame
    if (this.vSyncMode == BraveEngineVsyncModeEnum.sync) {
      if (this.updateInterval != undefined) {
        this.cancelUpdateInterval();
      }

      requestAnimationFrame(this.onUpdate.bind(this));
    } else if (this.updateInterval == undefined) {
      this.createUpdateInterval();
    }
  }

  private createUpdateInterval() {
    this.updateInterval = setInterval(() => {
      this.onUpdate(Date.now());
    }, 0);
  }

  private cancelUpdateInterval() {
    clearInterval(this.updateInterval);
    this.updateInterval = undefined;
  }

  // #region Play controls

  play() {
    this.mode = BraveEngineModeEnum.running;
    this.modeSubject.next(this.mode);
  }

  pause() {
    if (this.mode == BraveEngineModeEnum.running) {
      this.mode = BraveEngineModeEnum.paused;
      this.modeSubject.next(this.mode);
    }
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

export const braveEngine = new BraveEngine();