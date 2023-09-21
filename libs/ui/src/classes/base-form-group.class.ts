import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseFormControl } from './base-form-control.class';
import { BaseFormArray } from './base-form-array.class';

export class BaseFormGroup<T> extends FormGroup {

  override value!: T;
  override valueChanges!: Observable<T>;

  protected canCallValueChanges = false;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  override setValue(data: T, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }) {
    this.canCallValueChanges = false;
    super.setValue(data as any, options);
    this.canCallValueChanges = true;
  };

  override patchValue(data: Partial<T>, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }) {
    this.canCallValueChanges = false;
    super.patchValue(data, options);
    this.canCallValueChanges = true;
  }

  override getRawValue() {
    return super.getRawValue() as T;
  }

  override get<TYPE = any>(path: string) {
    return super.get(path) as any as BaseFormControl<TYPE>;
  }

  getArray<TYPE = any>(path: string) {
    return super.get(path) as any as BaseFormArray<TYPE>;
  }

  getGroup<TYPE = any>(path: string) {
    return super.get(path) as any as BaseFormGroup<TYPE>;
  }

}
