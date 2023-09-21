import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-doc-button',
  templateUrl: './doc-button.component.html',
  styleUrls: ['./doc-button.component.scss'],
})
export class DocButtonComponent implements OnInit {
  btnLoading: boolean[] = [];

  constructor(
    public cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  showLoadingButton(index: number) {
    this.btnLoading[index] = true;
    setTimeout(() => {
      this.btnLoading[index] = false;
    }, 2000);
  }
}
