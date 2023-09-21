import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormArray, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseFormControl } from './base-form-control.class';
import { BaseFormGroup } from './base-form-group.class';

export class BaseFormArray<T> extends FormArray {

  override value!: T[];
  override valueChanges!: Observable<T[]>;

  protected canCallValueChanges = false;

  override setValue(data: T[], options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }) {
    this.canCallValueChanges = false;
    super.setValue(data, options);
    this.canCallValueChanges = true;
  }

  override patchValue(data: Partial<T[]>, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }) {
    this.canCallValueChanges = false;
    super.patchValue(data, options);
    this.canCallValueChanges = true;
  }

  constructor(
    controls: AbstractControl[] = [],
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(
      controls,
      validatorOrOpts,
      asyncValidator,
    );
  }

  override getRawValue() {
    return super.getRawValue() as T[];
  }

  override get<TYPE = any>(path: string) {
    return super.get(path) as any as BaseFormControl<TYPE>;
  }

  override at<TYPE = T>(index: number) {
    return super.at(index) as any as BaseFormGroup<TYPE>;
  }

  /**
   * Return controls as form group
   */
  get groups() {
    return this.controls as BaseFormGroup<T>[];
  }

  /**
 * Return all controls as form control
 */
  get formControls() {
    return this.controls as BaseFormControl<T>[];
  }

}
