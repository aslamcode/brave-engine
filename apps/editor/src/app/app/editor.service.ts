import { Injectable } from '@angular/core';
import { AudioSystem, braveEngine, BraveEngine, BraveEngineModeEnum, Camera, Hooks, Input } from '@brave/brave-engine';
import { CanvasComponent } from '../components/canvas/canvas.component';
import { exampleOne } from '../examples/example-one';
import { EditorCameraOrbiter } from '../scripts/editor-camera-orbiter';
import { editorViewInputEvent } from '../input-event/editor-view-input-event';
import { Subject } from 'rxjs';
import { EditorAudioListener } from '../scripts/editor-audio-listener';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  braveEngine: BraveEngine;
  canvas: CanvasComponent;
  camera: Camera;
  viewMode: EditorViewModeEnum = EditorViewModeEnum.editor;
  viewModeSubject = new Subject<EditorViewModeEnum>();
  lastCameraModeBeforeStart = this.viewMode;

  onStart(canvas: CanvasComponent) {
    this.canvas = canvas;

    editorViewInputEvent.context = this.canvas.canvasElement.nativeElement;

    const webgl2Context = this.canvas.webgl2Context;
    this.braveEngine = braveEngine;

    this.braveEngine.initialize(this.canvas.canvasElement.nativeElement, webgl2Context);
    this.braveEngine.modeSubject.subscribe(value => this.changeBraveMode(value));

    this.camera = new Camera();
    this.camera.addComponent(new EditorCameraOrbiter(this.camera));
    this.camera.addComponent(new EditorAudioListener(this.camera));

    this.braveEngine.setPriorityCamera(this.camera);

    Hooks.register(this.camera);

    // Run examples
    exampleOne(this.braveEngine);
  }

  changeBraveMode(mode: BraveEngineModeEnum) {
    switch (mode) {
      case BraveEngineModeEnum.running:
        this.lastCameraModeBeforeStart = this.viewMode;
        this.setViewMode(EditorViewModeEnum.scene);
        break;

      case BraveEngineModeEnum.editor:
        this.braveEngine.resetToSceneCamera();
        this.setViewMode(this.lastCameraModeBeforeStart);
        break;
    }
  }

  setViewMode(mode: EditorViewModeEnum) {
    this.viewMode = mode;

    if (mode === EditorViewModeEnum.editor) {
      this.camera.setActive(true);
      this.braveEngine.camera?.setActive(false); // Disable scene camera
      this.braveEngine.setPriorityCamera(this.camera);
      Input.active = false;
      return;
    }

    if (mode === EditorViewModeEnum.scene) {
      this.camera.setActive(false);
      this.braveEngine.camera?.setActive(true); // Active scene camera
      this.braveEngine.removePriorityCamera();
      Input.active = true;
      return;
    }

    this.viewModeSubject.next(this.viewMode);
  }

}

export enum EditorViewModeEnum {
  editor,
  scene
}