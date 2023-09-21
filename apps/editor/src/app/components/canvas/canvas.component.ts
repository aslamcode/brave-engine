import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasComponent implements OnInit {

  @Input() width = 100;
  @Input() height = 100;

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  ngOnInit() { }

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