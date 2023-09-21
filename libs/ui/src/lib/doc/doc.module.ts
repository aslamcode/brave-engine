import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocToastComponent } from './doc-toast/doc-toast.component';
import { DocCardComponent } from './doc-card/doc-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocComponent } from './doc.component';
import { UiModule } from '../ui.module';
import { DocButtonComponent } from './doc-button/doc-button.component';
import { DocIconComponent } from './doc-icon/doc-icon.component';
import { DocInputComponent } from './doc-input/doc-input.component';
import { DocPageTitleComponent } from './doc-page-title/doc-page-title.component';
import { DocConfirmDialogComponent } from './doc-confirm-dialog/doc-confirm-dialog.component';
import { DocLoadingComponent } from './doc-loading/doc-loading.component';
import { DocSelectComponent } from './doc-select/doc-select.component';
import { DocCheckboxComponent } from './doc-checkbox/doc-checkbox.component';
import { DocRadioComponent } from './doc-radio/doc-radio.component';
import { DocTableComponent } from './doc-table/doc-table.component';
import { UiDirectivesModule } from '../../directives/ui-directives.module';
import { DocFontComponent } from './doc-font/doc-font.component';
import { DocChipComponent } from './doc-chip/doc-chip.component';
import { DocToggleComponent } from './doc-toggle/doc-toggle.component';

@NgModule({
  declarations: [
    DocComponent,
    DocButtonComponent,
    DocIconComponent,
    DocCardComponent,
    DocInputComponent,
    DocPageTitleComponent,
    DocConfirmDialogComponent,
    DocLoadingComponent,
    DocToastComponent,
    DocCheckboxComponent,
    DocRadioComponent,
    DocSelectComponent,
    DocTableComponent,
    DocFontComponent,
    DocChipComponent,
    DocToggleComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    UiDirectivesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [DocComponent]
})
export class DocModule { }
