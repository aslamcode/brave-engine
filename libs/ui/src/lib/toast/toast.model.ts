
export enum ToastType {
  default = 0,
  error = 1,
  warning = 2,
  info = 3,
  success = 4,
}

export interface Toast {
  type?: ToastType;
  description: string;
}

export function isToast(toast: any): toast is Toast {
  return toast
      && typeof toast.type == 'number'
      && typeof toast.description == 'string';
}
