import { UiConfirmDialogService } from './../../confirm-dialog/services/confirm-dialog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-doc-confirm-dialog',
  templateUrl: './doc-confirm-dialog.component.html',
  styleUrls: ['./doc-confirm-dialog.component.scss'],
})
export class DocConfirmDialogComponent implements OnInit {
  constructor(
    private confirmDialogService: UiConfirmDialogService
  ) { }

  ngOnInit() { }

  showDialog() {
    const message = 'Tem certeza que deseja cancelar a solicitação? Essa ação não poderá ser desfeita';
    this.confirmDialogService.open('Cancelar solicitação', message);
  }
}
