import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() { }

}