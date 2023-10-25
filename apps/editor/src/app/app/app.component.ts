import { environment } from './../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UiService } from '@brave/ui';
import { CanvasComponent } from '../components/canvas/canvas.component';
import { BraveEngine, Cube, ScriptComponent, Time } from '@brave/brave-engine';
import { EditorService } from './editor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  @ViewChild('canvasScene', { static: true }) private canvasScene: CanvasComponent;

  constructor(
    private uiService: UiService,
    private editorService: EditorService,
  ) {
    this.uiService.assetsUrl = environment.assetsUrl;
  }

  ngOnInit() {
    this.editorService.onStart(this.canvasScene);
  }

}

