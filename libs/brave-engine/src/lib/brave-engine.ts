import { BraveRender } from "./brave-render/brave-render";
import { Scene } from "./class/scene";
import { BraveEngineModeEnum } from "./enum/brave-engine-mode-enum";
import { Subject } from 'rxjs';
import { Time } from "./static/time";
import { Camera } from "./entity/camera";
import { BraveEngineVsyncModeEnum } from "./enum/brave-engine-vsync-mode.enum";
import { Invoke } from "./static/invoke";
import { Hooks } from "./static/hooks";

export class BraveEngine {

  mode = BraveEngineModeEnum.editor;
  vSyncMode = BraveEngineVsyncModeEnum.sync;

  private canvas: HTMLCanvasElement;
  private webgl2Context: WebGL2RenderingContext;
  private renderWidth = 0;
  private renderHeight = 0;

  camera?: Camera;
  priorityCamera?: Camera;
  braveRender: BraveRender;
  scenes: Scene[] = [];

  modeSubject = new Subject<BraveEngineModeEnum>();
  compiled = false;

  private lastUpdatedTime = 0;
  private updateInterval?: ReturnType<typeof setInterval>;

  initialize(canvas: HTMLCanvasElement, webgl2Context: WebGL2RenderingContext, compiled = false) {
    window.addEventListener('contextmenu', event => event.preventDefault());

    this.canvas = canvas;
    this.webgl2Context = webgl2Context;
    this.compiled = compiled;

    this.braveRender = new BraveRender(this, this.webgl2Context);

    this.onStart();

    if (compiled) {
      this.play();
    }

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
    Time.unscaledDeltaTime = deltaTime;

    // Set render size
    // Render size is used to calculate aspect ratio
    if (this.renderWidth != this.canvas?.clientWidth || this.renderHeight != this.canvas?.clientHeight) {
      this.renderWidth = this.canvas?.clientWidth;
      this.renderHeight = this.canvas?.clientHeight;

      this.braveRender.setRenderSize(
        this.renderWidth,
        this.renderHeight
      );
    }

    // Update brave hooks
    Hooks.onRenderUpdate();
    if (this.mode == BraveEngineModeEnum.compiled || this.mode == BraveEngineModeEnum.running) {
      Hooks.onUpdate();
    }

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
    const mode = this.compiled ? BraveEngineModeEnum.compiled : BraveEngineModeEnum.running;
    if (this.mode == mode) {
      return;
    }

    this.mode = mode;
    this.modeSubject.next(this.mode);
    Time.scale = 1;
    Hooks.onStart();
  }

  pause() {
    if (this.mode === BraveEngineModeEnum.compiledPaused || this.mode === BraveEngineModeEnum.paused) {
      return;
    }

    if (this.mode == BraveEngineModeEnum.running) {
      this.mode = BraveEngineModeEnum.paused;
    } else if (this.mode == BraveEngineModeEnum.compiled) {
      this.mode = BraveEngineModeEnum.compiledPaused;
    }

    this.modeSubject.next(this.mode);
  }

  stop() {
    if (!this.compiled) {
      if (this.mode === BraveEngineModeEnum.editor) {
        return;
      }

      this.mode = BraveEngineModeEnum.editor;
      this.modeSubject.next(this.mode);

      Invoke.cancelAllInvokes();

      Hooks.onDestroy();
    }
  }

  // #endregion Play controls

  addScene() {
    const scene = new Scene(this, this.webgl2Context);
    this.scenes.push(scene);
    return scene;
  }

  setCamera(camera: Camera) {
    this.camera = camera;

    if (!this.priorityCamera) {
      this.braveRender.setCamera(camera);
    }
  }

  setPriorityCamera(camera: Camera) {
    this.priorityCamera = camera;
    this.braveRender.setCamera(camera);
  }

  removePriorityCamera() {
    this.priorityCamera = null;
    this.braveRender.setCamera(this.camera);
  }
}

export const braveEngine = new BraveEngine();