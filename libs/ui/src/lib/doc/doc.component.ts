import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss'],
})
export class DocComponent implements OnInit {
  btnLoading = false;

  constructor() { }

  ngOnInit() { }

  showLoadingButton() {
    this.btnLoading = true;
    setTimeout(() => {
      this.btnLoading = false;
    }, 2000);
  }
}
