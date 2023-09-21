import { Component, Input, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ui-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CollapseComponent implements AfterViewInit {

  @Input() text!: string;

  @ViewChild('content', { static: true }) content!: ElementRef<HTMLElement>;

  internalOpen = false;
  iconClasses: string[] = [];

  toggle() {
    this.internalOpen = !this.internalOpen;
    this.openClose();
  }

  ngAfterViewInit() {
    const content = this.content?.nativeElement;

    if (!content) {
      return;
    }

    if (!this.internalOpen) {
      content.style.height = '0';
    } else {
      content.style.height = content.scrollHeight + 'px';

      setTimeout(() => {
        if (this.internalOpen) {
          content.style.height = 'auto';
          content.style.overflow = 'unset';
        } else {
          content.style.height = '0';
          content.style.overflow = 'hidden';
        }
      }, 200);
    }
  }

  private openClose() {
    const content = this.content?.nativeElement;

    if (!content) {
      return;
    }

    if (!this.internalOpen) {
      this.iconClasses = [];

      content.style.height = content?.scrollHeight + 'px';

      setTimeout(() => {
        if (this.internalOpen) {
          content.style.height = 'auto';
          content.style.overflow = 'unset';
        } else {
          content.style.height = '0';
          content.style.overflow = 'hidden';
        }
      });
    } else {
      this.iconClasses = ['-open'];

      content.style.height = content.scrollHeight + 'px';

      setTimeout(() => {
        if (this.internalOpen) {
          content.style.height = 'auto';
          content.style.overflow = 'unset';
        } else {
          content.style.height = '0';
          content.style.overflow = 'hidden';
        }
      }, 200);
    }
  }

  @Input()
  set open(value: boolean) {
    this.internalOpen = value ? true : false;
    this.openClose();
  }

}
