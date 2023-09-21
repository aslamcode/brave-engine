import { ToastType, UiToastService } from '@brave/ui';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-doc-toast',
  templateUrl: './doc-toast.component.html',
  styleUrls: ['./doc-toast.component.scss'],
})
export class DocToastComponent implements OnInit {
  constructor(
    private toastService: UiToastService
  ) { }

  ngOnInit() { }

  showToast(type: ToastType) {
    this.toastService.toast('I`m toast', type);
  }
}
