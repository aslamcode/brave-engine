import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../../app/editor.service';
import { Entity } from '@brave/brave-engine';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SceneComponent implements OnInit {

  @Input() name = 'Scenes';
  itemSelected: Entity;

  constructor(
    public editorService: EditorService
  ) {
  }

  ngOnInit() {
  }

  setItemSelected(e: Event, item: Entity) {
    e.stopPropagation();
    this.itemSelected = item;
  }

  get scenes() {
    return this.editorService.braveEngine.scenes;
  }

}