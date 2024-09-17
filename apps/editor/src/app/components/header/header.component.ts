import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { EditorViewModeEnum, EditorService } from '../../app/editor.service';

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
    this.editorService.setViewMode(EditorViewModeEnum.editor);
  }

  sceneView() {
    this.editorService.setViewMode(EditorViewModeEnum.scene);
  }

}