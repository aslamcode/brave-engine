import { Component, Input, HostListener, AfterContentChecked, OnInit, HostBinding, ChangeDetectorRef, ElementRef } from '@angular/core';
import { RadioGroupComponent } from '../radio-group/radio-group.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ui-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit, AfterContentChecked {
  @HostBinding('attr.tabindex') get tabindex() {
    return (this.isDisabled) ? '-1' : '0';
  }

  @Input() value: any;
  @Input() selected = false;
  self = this;

  control?: FormControl;

  innerDisabled = false;

  constructor(
    public radioGroup: RadioGroupComponent,
    protected cdr: ChangeDetectorRef,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.elementRef.nativeElement.className = `brave-ui ${this.elementRef.nativeElement.className}`;

    if (this.selected) {
      this.value = this.radioGroup.value;
    }
  }

  ngAfterContentChecked() {
    // Update control
    this.control = this.radioGroup.control;

    // Check the radio is selected
    if (this.radioGroup.value != undefined && this.radioGroup.value == this.value) {
      this.radioGroup.selectedRadio = this;
      this.value = this.radioGroup.value;
    }
  }

  @HostListener('click')
  @HostListener('keyup.enter')
  toggle() {
    if (!this.control || this.control && this.control.enabled && !this.radioGroup.isReadOnly && !this.isDisabled) {
      this.radioGroup.selectedRadio = this;
      this.radioGroup.value = this.value;
      this.radioGroup.onTouchedCallback();
    }
  }

  @Input()
  set disabled(value: boolean) {
    setTimeout(() => {
      if (value) {
        this.innerDisabled = true;
      } else {
        this.innerDisabled = false;
      }

      this.cdr.detectChanges();
    });
  }

  get isDisabled() {
    return this.control?.disabled || this.innerDisabled;
  }

}
