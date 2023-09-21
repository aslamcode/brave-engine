import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ui-doc-checkbox',
  templateUrl: './doc-checkbox.component.html',
  styleUrls: ['./doc-checkbox.component.scss'],
})
export class DocCheckboxComponent implements OnInit {
  options = [
    { id: '0', description: 'Abacate' },
    { id: '1', description: 'Abacaxi' },
    { id: '2', description: 'Banana' },
    { id: '3', description: 'Morango' },
    { id: '4', description: 'Cenoura' },
  ];

  checkboxBasicValue = false;

  checkboxGroupFormControl = new FormControl();
  checkboxGroupInlineFormControl = new FormControl();

  constructor() { }

  ngOnInit() { }
}
