import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Directive({
  selector: '[upload]',
  exportAs: 'upload'
})
export class UploadDirective {

  private inputElement!: HTMLInputElement;

  @Input() accept = '';
  @Input() draggable = false;
  @Input() disableClick = false;
  @Input() multiple = true;

  @Output() fileChange = new EventEmitter<IUploadDirectiveData>();

  @HostBinding('class.dragging') dragging = false;

  constructor(
    private elementRef: ElementRef
  ) {
    this.createInput();
  }

  @HostListener('click')
  onClick(): void {
    if (!this.disableClick) {
      this.inputElement.accept = this.accept;
      this.inputElement.click();
    }
  }

  @HostListener('dragleave', ['$event'])
  dragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.dragging = false;
  }

  @HostListener('dragover', ['$event'])
  dragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer?.types.length) {
      this.dragging = true;
    }
  }

  @HostListener('drop', ['$event'])
  drop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.dragging = false;

    if (this.draggable) {
      const dataTransfer = e.dataTransfer as DataTransfer;
      this.loadFile(dataTransfer.files);
    }
  }

  private onChangeCallback(value?: IUploadDirectiveData) {
    if (this.elementRef) {
      const event = new CustomEvent('change', { detail: value });
      this.elementRef.nativeElement.dispatchEvent(event);
    }
    this.fileChange.emit(value);
  }

  private createInput() {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';

    if (this.multiple) {
      inputElement.setAttribute('multiple', '');
    }

    inputElement.onchange = () => {
      this.loadFile(this.inputElement.files as FileList);
    };

    this.inputElement = inputElement;
  }

  private loadFile(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i) as File;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.onChangeCallback({
          rawData: e.target.result,
          file
        });
      };

      if (file) {
        reader.readAsDataURL(file); // Read the file as base64
      } else {
        this.onChangeCallback();
      }
    }

    this.inputElement.files = null;
    this.inputElement.value = '';
  }

}

export interface IUploadDirectiveData {
  rawData: string;
  file: File;
}
