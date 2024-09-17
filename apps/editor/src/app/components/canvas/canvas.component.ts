import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EditorViewModeEnum, EditorService } from '../../app/editor.service';
import { braveEngine, BraveEngineModeEnum, Cursor } from '@brave/brave-engine';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasComponent implements OnInit, AfterViewChecked {

  @Input() width: number;
  @Input() height: number;

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  // canShowCursor = true;

  constructor(
    private elementRef: ElementRef,
    private editorService: EditorService
  ) {
  }

  ngOnInit() { }

  ngAfterViewChecked() {
    this.width = this.elementRef.nativeElement.width;
    this.height = this.elementRef.nativeElement.height;
  }

  listenEditorCameraModeChange(mode: EditorViewModeEnum) {
    if (braveEngine.mode == BraveEngineModeEnum.running || braveEngine.mode == BraveEngineModeEnum.compiled) {
      if (mode == EditorViewModeEnum.editor) {
        this.showCursor();
      } else {
        this.hideCursor();
      }
    } else {
      this.showCursor();
    }
  }

  mouseDown(event: MouseEvent) {
    if (braveEngine.mode != BraveEngineModeEnum.editor && this.editorService.viewMode == EditorViewModeEnum.scene && (event.button === 0 || event.button === 2)) {
      this.hideCursor();
      return;
    }

    if (event.button === 2 && this.editorService.viewMode == EditorViewModeEnum.editor) {
      this.hideCursor();
      return;
    }
  }

  mouseUp(event: MouseEvent) {
    if (event.button === 2 && this.editorService.viewMode == EditorViewModeEnum.editor) {
      this.showCursor();
    }
  }

  showCursor() {
    Cursor.unlock();
  }

  hideCursor() {
    Cursor.lock();
  }

  getContext(context: string) {
    return this.canvas.nativeElement.getContext(context);
  }

  get webglContext() {
    return this.canvas.nativeElement.getContext('webgl') as WebGLRenderingContext;
  }

  get webgl2Context() {
    return this.canvas.nativeElement.getContext(
      'webgl2'
    ) as WebGL2RenderingContext;
  }

  get canvasElement() {
    return this.canvas;
  }

}