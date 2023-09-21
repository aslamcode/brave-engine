import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './click-outside.directive';
import { UploadDirective } from './upload.directive';
import { DownloadDirective } from './download.directive';
import { MouseupOutsideDirective } from './mouseup-outside.directive';
import { AutoFocusDirective } from './autofocus.directive';
import { ReadOnlyDirective } from './readonly.directive';
import { AnimatedIfDirective } from './animated-if.directive';
import { InfiniteScrollDirective } from './infinite-scroll.directive';
import { ForDirective } from './for.directive';

@NgModule({
  declarations: [
    ClickOutsideDirective,
    UploadDirective,
    DownloadDirective,
    MouseupOutsideDirective,
    AutoFocusDirective,
    ReadOnlyDirective,
    AnimatedIfDirective,
    InfiniteScrollDirective,
    ForDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClickOutsideDirective,
    UploadDirective,
    DownloadDirective,
    MouseupOutsideDirective,
    AutoFocusDirective,
    ReadOnlyDirective,
    AnimatedIfDirective,
    InfiniteScrollDirective,
    ForDirective
  ]
})
export class UiDirectivesModule { }
