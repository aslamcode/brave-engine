import { Component, AfterContentChecked, ElementRef, ViewChild, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'ui-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class IconComponent implements OnInit, AfterContentChecked {
  @ViewChild('content', { static: true }) content!: ElementRef<HTMLElement>;

  @Input() colorful = false;
  @Input() embedded = false;

  maskStyle: any = {};
  backgroundStyle: any = {};

  constructor(
    private uiService: UiService,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit() {
    this.elementRef.nativeElement.className = `brave-ui ${this.elementRef.nativeElement.className}`;
  }

  ngAfterContentChecked() {
    this.loadIcon();
  }

  private loadIcon() {
    if (this.embedded) {
      return;
    }

    if (this.content && this.content.nativeElement) {
      const name = this.content.nativeElement.innerHTML.trim();
      const url = `url('${this.uiService.assetsUrl}/icon/${name}.svg')`;

      this.maskStyle['mask'] = url;
      this.maskStyle['-webkit-mask'] = url;

      this.backgroundStyle['background-image'] = url;
    }
  }
}
