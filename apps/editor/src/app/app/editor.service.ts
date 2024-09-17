import { Injectable } from '@angular/core';
import { braveEngine, BraveEngine, BraveEngineModeEnum, Camera, Hooks, Input } from '@brave/brave-engine';
import { CanvasComponent } from '../components/canvas/canvas.component';
import { exampleOne } from '../examples/example-one';
import { EditorCameraOrbiter } from '../scripts/editor-camera-orbiter';
import { editorViewInputEvent } from '../input-event/editor-view-input-event';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  braveEngine: BraveEngine;
  canvas: CanvasComponent;
  camera: Camera;
  cameraMode: EditorCameraModeEnum = EditorCameraModeEnum.editor;
  lastCameraModeBeforeStart = this.cameraMode;

  onStart(canvas: CanvasComponent) {
    this.canvas = canvas;

    editorViewInputEvent.context = this.canvas.canvasElement.nativeElement;

    const webgl2Context = this.canvas.webgl2Context;
    this.braveEngine = braveEngine;

    this.braveEngine.initialize(this.canvas.canvasElement.nativeElement, webgl2Context);
    this.braveEngine.modeSubject.subscribe(value => this.changeBraveMode(value));

    this.camera = new Camera();
    this.camera.addComponent(new EditorCameraOrbiter(this.camera));
    this.braveEngine.setPriorityCamera(this.camera);

    Hooks.register(this.camera);

    // Run examples
    exampleOne(this.braveEngine);
  }

  changeBraveMode(mode: BraveEngineModeEnum) {
    switch (mode) {
      case BraveEngineModeEnum.running:
        this.lastCameraModeBeforeStart = this.cameraMode;
        this.setCameraMode(EditorCameraModeEnum.scene);
        break;

      case BraveEngineModeEnum.editor:
        this.braveEngine.resetToSceneCamera();
        this.setCameraMode(this.lastCameraModeBeforeStart);
        break;
    }
  }

  setCameraMode(mode: EditorCameraModeEnum) {
    this.cameraMode = mode;

    if (mode === EditorCameraModeEnum.editor) {
      this.camera.setActive(true);
      this.braveEngine.setPriorityCamera(this.camera);
      Input.active = false;
      return;
    }

    if (mode === EditorCameraModeEnum.scene) {
      this.camera.setActive(false);
      this.braveEngine.removePriorityCamera();
      Input.active = true;
      return;
    }
  }

}

export enum EditorCameraModeEnum {
  editor,
  scene
}