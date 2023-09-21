import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[download]'
})
export class DownloadDirective {

  @Input() download = '';

  @HostListener('click')
  onClick(): void {
    this.makeDownload(this.download);
  }

  private makeDownload(link: string) {
    const element = document.createElement('a');
    element.href = link;
    element.click();
  }

}
