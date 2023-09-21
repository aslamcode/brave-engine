import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-doc-select',
  templateUrl: './doc-select.component.html',
  styleUrls: ['./doc-select.component.scss'],
})
export class DocSelectComponent implements OnInit {
  options = [
    { id: '0', description: 'Abacate' },
    { id: '1', description: 'Abacaxi' },
    { id: '2', description: 'Banana' },
    { id: '3', description: 'Morango' },
    { id: '4', description: 'Cenoura' },
  ];

  multipleSelectControl = new FormControl([0, 3]);
  disabledSelectControl = new FormControl([0]);

  constructor() {
    this.disabledSelectControl.disable();
  }

  ngOnInit() { }
}
