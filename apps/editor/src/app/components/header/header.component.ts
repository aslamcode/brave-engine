import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { EditorCameraModeEnum, EditorService } from '../../app/editor.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Input() title: string;

  constructor(
    private editorService: EditorService
  ) { }

  ngOnInit() { }

  play() {
    this.editorService.braveEngine.play();
  }

  pause() {
    this.editorService.braveEngine.pause();
  }

  stop() {
    this.editorService.braveEngine.stop();
  }

  editorView() {
    this.editorService.setCameraMode(EditorCameraModeEnum.editor);
  }

  sceneView() {
    this.editorService.setCameraMode(EditorCameraModeEnum.scene);
  }

}