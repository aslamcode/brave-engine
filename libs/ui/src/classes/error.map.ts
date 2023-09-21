import { NgControl, FormControl } from '@angular/forms';

export const errorMapper = new Map([

  ['greaterThan', (errors: string, control: NgControl | FormControl, param: any) => ({
    type: errors,
    params: {
      value1: control.errors?.['greaterThan'].controlName
    }
  })],
  ['greaterOrEqualThan', (errors: string, control: NgControl | FormControl, param: any) => ({
    type: errors,
    params: {
      value1: control.errors?.['greaterOrEqualThan'].controlName
    }
  })],
  ['lessThan', (errors: string, control: NgControl | FormControl, param: any) => ({
    type: errors,
    params: {
      value1: control.errors?.['lessThan'].controlName
    }
  })],
  ['lessOrEqualThan', (errors: string, control: NgControl | FormControl, param: any) => ({
    type: errors,
    params: {
      value1: control.errors?.['lessOrEqualThan'].controlName
    }
  })],

  ['minlength', (errors: string, control: NgControl | FormControl, param: any) => ({
    type: errors,
    params: {
      value1: control.errors?.['minlength'].requiredLength
    }
  })],
  ['maxlength', (errors: string, control: NgControl | FormControl, param: any) => ({
    type: errors,
    params: {
      value1: control.errors?.['maxlength'].requiredLength
    }
  })],
  ['min', (errors: string, control: NgControl | FormControl, param: any) => ({
    type: errors,
    params: {
      value1: control.errors?.['min'].min
    }
  })],
  ['max', (errors: string, control: NgControl | FormControl, param: any) => ({
    type: errors,
    params: {
      value1: control.errors?.['max'].max
    }
  })],

  ['onlyInteger', (errors: string, control: NgControl | FormControl, param: any) => ({ type: errors })],
  ['required', (errors: string, control: NgControl | FormControl, param: any) => ({ type: errors })],
  ['email', (errors: string, control: NgControl | FormControl, param: any) => ({ type: errors })],
  ['passwordNotSame', (errors: string, control: NgControl | FormControl, param: any) => ({ type: errors })],
  ['cnpj', (errors: string, control: NgControl | FormControl, param: any) => ({ type: errors })],
  ['cpf', (errors: string, control: NgControl | FormControl, param: any) => ({ type: errors })]

]);
