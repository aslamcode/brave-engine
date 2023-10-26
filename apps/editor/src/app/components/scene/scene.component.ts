import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../../app/editor.service';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneComponent implements OnInit {

  @Input() title: string;

  constructor(
    public editorService: EditorService
  ) {
  }

  ngOnInit() {
  }

  get scenes() {
    return this.editorService.braveEngine.scenes;
  }

}