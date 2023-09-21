import {
  Component,
  OnInit,
  forwardRef,
  ElementRef,
  HostListener,
  Injector,
  Optional,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorMixin } from '../../classes/control-value-accessor-mixin.class';
import { ReadOnlyDirective } from '../../directives/readonly.directive';

@Component({
  selector: 'ui-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleComponent extends ControlValueAccessorMixin implements OnInit {

  @HostBinding('attr.tabindex') get tabindex() {
    return (this.control && this.control.disabled) || this.isReadOnly || this.isDisabled ? '-1' : '0';
  }

  private elemRef: ElementRef;
  innerDisabled = false;

  constructor(
    elementRef: ElementRef,
    injector: Injector,
    protected override cdr: ChangeDetectorRef,
    @Optional() readOnlyDirective: ReadOnlyDirective
  ) {
    super(elementRef, injector, readOnlyDirective);
    this.elemRef = elementRef;
    this.innerValue = false;
  }

  ngOnInit() {
    this.elemRef.nativeElement.className = `brave-ui ${this.elemRef.nativeElement.className}`;
  }

  @HostListener('click')
  @HostListener('keyup.enter')
  toggle() {
    if (!this.control && !this.isDisabled || (this.control && this.control.enabled && !this.isReadOnly)) {
      this.value = !this.value;
      this.onTouchedCallback();
      this.cdr.detectChanges();
    }
  }

  override writeValue(value: any) {
    super.writeValue(value);
    this.cdr.detectChanges();
  }

  @Input()
  set disabled(value: boolean) {
    setTimeout(() => {
      if (value) {
        this.innerDisabled = true;
        this.control?.disable({ onlySelf: true, emitEvent: false });
      } else {
        this.innerDisabled = false;
        this.control?.enable({ onlySelf: true, emitEvent: false });
      }

      this.cdr.detectChanges();
    });
  }

  override get isDisabled() {
    return super.isDisabled || this.innerDisabled;
  }

}
