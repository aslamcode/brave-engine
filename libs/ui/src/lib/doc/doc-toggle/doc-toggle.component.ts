import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-doc-toggle',
  templateUrl: './doc-toggle.component.html',
  styleUrls: ['./doc-toggle.component.scss'],
})
export class DocToggleComponent implements OnInit {

  toggleFormControl = new FormControl<boolean | null>(null);

  constructor() { }

  ngOnInit() { }
}
