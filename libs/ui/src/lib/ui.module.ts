import { UiConfirmDialogService } from './confirm-dialog/services/confirm-dialog.service';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';
import { LoadingModule } from './loading/loading.module';
import { SelectModule } from './select/select.module';
import { InputModule } from './input/input.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from './button/button.module';
import { IconModule } from './icon/icon.module';
import { UiService } from '../services/ui.service';
import { CardModule } from './card/card.module';
import { ToastModule } from './toast/toast.module';
import { UiToastService } from './toast/toast.service';
import { UiLoadingService } from './loading/loading.service';
import { PageTitleModule } from './page-title/page-title.module';
import { CheckboxModule } from './checkbox/checkbox.module';
import { RadioModule } from './radio/radio.module';
import { TableModule } from './table/table.module';
import { PaginatorModule } from './paginator/paginator.module';
import { CollapseModule } from './collapse/collapse.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipModule } from './chip/chip.module';
import { ModalModule } from './modal/modal.module';
import { ToggleComponent } from './toggle/toggle.component';
import { ToggleModule } from './toggle/toggle.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    IconModule,
    InputModule,
    SelectModule,
    CardModule,
    ToastModule,
    LoadingModule,
    ConfirmDialogModule,
    PageTitleModule,
    CheckboxModule,
    RadioModule,
    TableModule,
    PaginatorModule,
    CollapseModule,
    ChipModule,
    ModalModule,
    ToggleModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,

    ButtonModule,
    IconModule,
    InputModule,
    SelectModule,
    CardModule,
    ToastModule,
    LoadingModule,
    ConfirmDialogModule,
    PageTitleModule,
    CheckboxModule,
    RadioModule,
    TableModule,
    PaginatorModule,
    CollapseModule,
    ChipModule,
    ModalModule,
    ToggleModule
  ]
})
export class UiModule {
  static forRoot() {
    return {
      ngModule: UiModule,
      providers: [
        UiService,
        UiToastService,
        UiLoadingService,
        UiConfirmDialogService
      ]
    };
  }
}
