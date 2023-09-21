import { ControlValueAccessorMixin } from './control-value-accessor-mixin.class';
import { QueryList, ElementRef, Injector, Input, AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  template: ''
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ControlValueAccessorGroupMixin extends ControlValueAccessorMixin implements AfterContentChecked {

  @Input() replicateValidators = true;
  @Input() public arrayMode = false;

  form!: FormGroup;
  formArrayValues!: any[];

  isControlLastStatusTouched!: boolean;

  constructor(
    elementRef: ElementRef,
    injector: Injector,
    protected override cdr?: ChangeDetectorRef
  ) {
    super(elementRef, injector);
    this.createAndListenForm();
  }

  ngAfterContentChecked() {
    this.checkTouchedStatus();
  }

  init(customAcessors: ControlValueAccessorMixin[] | QueryList<ControlValueAccessorMixin>) {
    this.createAndListenControls(customAcessors);

    if (this.replicateValidators) {
      this.control.clearValidators();
      this.control.setValidators(this.validate.bind(this) as any);
      this.control.updateValueAndValidity();
    }
  }

  override writeValue(value: any) {
    if (value) {
      super.writeValue(value);

      if (!this.arrayMode) {
        this.createFormControlsOnForm(value);
      } else {
        this.formArrayValues = value;
        this.form.reset();
        this.matchArrayValuesWithFormControls(value);
      }
    }
  }

  matchArrayValuesWithFormControls(value: any[]) {
    if (this.form && this.form.controls) {
      // Search value on form and on array value
      const keys = Object.keys(this.form.controls);
      keys.forEach(key => {
        const externalValue = value.find(elem => key == elem);
        if (externalValue) {
          this.form.get(key)?.setValue(externalValue);
        }
      });
    }
  }

  createArrayValueFromFormControls() {
    const array: any[] = [];

    if (this.form) {
      const keys = Object.keys(this.form.controls);
      keys.forEach(key => {
        if (this.form.get(key)?.value) {
          array.push(key);
        }
      });
    }

    return array;
  }

  override setDisabledState(
    isDisabled: boolean,
    opts?: {
      onlySelf?: boolean | undefined;
      emitEvent?: boolean | undefined;
    } | undefined
  ) {
    if (isDisabled) {
      this.form.disable(opts);
    } else {
      this.form.enable(opts);
    }
    this.cdr?.detectChanges();
  }

  validate(control: FormControl) {
    if (this.control == control && this.isFormInvalid) {
      return {
        errors: this.form.errors
      };
    }

    return null;
  }

  private checkTouchedStatus() {
    if (this.form.touched && this.control && this.control.untouched && !this.isControlLastStatusTouched) {
      this.isControlLastStatusTouched = true;
      this.control.markAsTouched();
    } else if (this.control && this.control.touched && this.form.untouched) {
      this.form.markAllAsTouched();
    } else if (this.isControlLastStatusTouched && this.control && this.control.untouched) {
      this.isControlLastStatusTouched = false;
      this.form.markAsUntouched();
    }
  }

  private createFormControlsOnForm(value: object) {
    for (const key of Object.keys(value)) {
      // Check the control exists before
      const control = this.form.get(key);
      if (!control) {
        // Check need replication validations
        let validators: ValidatorFn | undefined;
        if (this.replicateValidators) {
          validators = this.validators;
        }

        this.form.setControl(key, new FormControl(null, validators));
      }
    }

    this.form.setValue(value);
  }

  private createAndListenForm() {
    this.form = new FormGroup({});
    this.form.valueChanges.subscribe((res) => {
      if (!this.arrayMode) {
        this.value = res;
      } else {
        this.value = this.createArrayValueFromFormControls();
      }
    });
  }

  createAndListenControls(data: ControlValueAccessorMixin[] | QueryList<ControlValueAccessorMixin>) {
    // Create each form control to form
    data.forEach(elem => {
      this.createAndConnectFormControlWithCustomControlAndFormControl(elem);
    });
  }

  createAndConnectFormControlWithCustomControlAndFormControl(data: ControlValueAccessorMixin) {
    // Check need replication validations
    let validators: ValidatorFn | undefined;
    if (this.replicateValidators) {
      validators = this.validators;
    }

    const controlName = `${data.name}`;

    // Check the control exists
    // Create if don't exists
    if (!this.form.get(controlName)) {
      const formControl = new FormControl(undefined, validators);
      this.form.setControl(controlName, formControl, { emitEvent: false });
    }

    // Get the control
    const control: FormControl = this.form.get(controlName) as FormControl;

    if (control) {
      // Check is array mode and set value
      if (this.arrayMode && this.formArrayValues) {
        const externalValue = this.formArrayValues.find(elem => data.name == elem);
        if (externalValue) {
          control.setValue(externalValue, { emitEvent: false });
        }
      }

      // Create change function
      let canEmitEvent = false;
      data.registerOnChange((value: any) => {
        control.setValue(value, { emitEvent: canEmitEvent });
        canEmitEvent = true;
      });

      // Create touched function
      data.registerOnTouched(() => {
        control.markAsTouched();
      });

      // Create write value function
      control.valueChanges.subscribe((value: any) => {
        data.writeValue(value);
      });

      // Set form control on custom control
      data.control = control;

      // update disabled state
      this.setDisabledState(this.isDisabled, { emitEvent: false });
    }

    return control;
  }

  get isFormInvalid() {
    return this.form && this.form.invalid && (this.form.touched || this.form.dirty);
  }

  private get validators() {
    const control = this.control;
    if (control && control.validator) {
      return control.validator;
    }

    return undefined;
  }

}
