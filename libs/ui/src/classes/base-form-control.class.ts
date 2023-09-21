import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseFormArray } from './base-form-array.class';
import { BaseFormGroup } from './base-form-group.class';

export class BaseFormControl<T> extends FormControl {

  override value!: T;
  override valueChanges!: Observable<T>;

  override setValue(data: T, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }) {
    return super.setValue(data, options);
  }

  override patchValue(data: Partial<T>, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }) {
    return super.patchValue(data, options);
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
