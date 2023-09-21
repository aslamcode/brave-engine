import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-doc-radio',
  templateUrl: './doc-radio.component.html',
  styleUrls: ['./doc-radio.component.scss'],
})
export class DocRadioComponent implements OnInit {
  options = [
    { id: '0', description: 'Abacate' },
    { id: '1', description: 'Abacaxi' },
    { id: '2', description: 'Banana' },
    { id: '3', description: 'Morango' },
    { id: '4', description: 'Cenoura' },
  ];

  radioGroupControl = new FormControl(['disabled']);
  radioGroupInlineControl = new FormControl();

  constructor() {
  }

  ngOnInit() { }
}
