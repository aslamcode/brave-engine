import { Input, ElementRef, Injector, ViewChild, HostListener, HostBinding, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlDirective, ControlContainer } from '@angular/forms';
import { noop } from 'rxjs';
import { errorMapper } from './error.map';
import { ReadOnlyDirective } from '../directives/readonly.directive';

@Component({
  template: ''
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ControlValueAccessorMixin<T = any> implements ControlValueAccessor {

  @ViewChild(FormControlDirective, { static: true }) formControlDirective!: FormControlDirective;

  @Input() name!: string;
  @Input() formControl!: FormControl;
  @Input() formControlName!: string;

  @Output() valueChange = new EventEmitter<T>();

  isMouseOver!: boolean;
  isOnFocus!: boolean;
  get isRequired() {
    const control: FormControl = this.control;

    if (control && control.validator) {
      const validators = control.validator(new FormControl());

      if (validators && validators['required']) {
        return true;
      }
    }

    return false;
  }

  errorParams: any;

  constructor(
    private elementRef?: ElementRef,
    private injector?: Injector,
    private readOnlyDirective?: ReadOnlyDirective,
    protected cdr?: ChangeDetectorRef
  ) {
  }

  @HostListener('mouseenter') mouseenter() {
    this.isMouseOver = true;
  }

  @HostListener('mouseleave') mouseleave() {
    this.isMouseOver = false;
  }

  // The internal data model
  // eslint-disable-next-line @typescript-eslint/member-ordering
  innerValue!: T;

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  // eslint-disable-next-line @typescript-eslint/member-ordering
  private onTouchedControlAccessorCallback: () => void = noop;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  private onChangeControlAccessorCallback: (_: T) => void = noop;

  // get accessor
  get value(): T {
    return this.innerValue;
  }

  // Set accessor including call the onchange callback
  @Input() set value(value: T) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.valueChange.emit(value);
      this.onChangeCallback(value);
    }
  }

  // ControlValueAccessor methods
  writeValue(value: T) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: (_: T) => void) {
    this.onChangeControlAccessorCallback = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouchedControlAccessorCallback = fn;
  }

  onChangeCallback(value: T) {
    this.onChangeControlAccessorCallback(value);

    if (this.elementRef) {
      const event = new Event('change');
      this.elementRef.nativeElement.value = value;
      this.elementRef.nativeElement.dispatchEvent(event, value);
    }
  }

  onTouchedCallback() {
    this.onTouchedControlAccessorCallback();
  }

  @HostBinding('class.-disabled')
  get isDisabled() {
    if (this.control) {
      return this.control.disabled;
    }

    return false;
  }

  focus() {
    this.isOnFocus = true;
  }

  blur() {
    this.isOnFocus = false;
    if (this.control) {
      this.control.markAsTouched();
    }
  }

  set control(control: FormControl) {
    this.formControl = control;
    this.value = this.control.value;
  }

  get control() {
    if (this.formControl) {
      return this.formControl;
    } else if (this.formControlName) {
      return this.controlContainer?.control?.get(this.formControlName) as FormControl;
    }

    return undefined as any as FormControl;
  }

  private get controlContainer() {
    // tslint:disable-next-line: deprecation
    return this.injector && this.injector.get(ControlContainer);
  }

  setDisabledState(isDisabled: boolean) {
    this.cdr?.detectChanges();
  }

  @HostBinding('class.-readonly')
  get isReadOnly() {
    if (this.readOnlyDirective && this.readOnlyDirective.readonly) {
      return true;
    }

    return false;
  }

  get isInvalidAndTouched() {
    return this.control && this.control.invalid && this.control.touched;
  }

  get errors() {
    return this.control && this.control.invalid ? Object.entries(this.control?.errors || {}).map(
      ([type, param]) => this.getErrorWithParameters(type, this.control, param)) : [];
  }

  get hasErrors() {
    return this.errors.length > 0;
  }

  private getErrorWithParameters(error: string, control: FormControl, param?: any) {
    const fn = (errorMapper.get(error) || errorMapper.get('custom'));
    return fn ? fn(error, control, param) : undefined;
  }

}
