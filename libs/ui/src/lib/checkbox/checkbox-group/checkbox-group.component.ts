import { ControlValueAccessorGroupMixin } from './../../../classes/control-value-accessor-group-mixin.class';
import { Component, Input, ElementRef, Injector, forwardRef, ChangeDetectorRef, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'ui-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxGroupComponent extends ControlValueAccessorGroupMixin implements OnInit {

  @Input() label!: string;

  private elemRef: ElementRef;

  constructor(
    elementRef: ElementRef,
    injector: Injector,
    protected override cdr: ChangeDetectorRef
  ) {
    super(elementRef, injector);
    this.arrayMode = true;
    this.replicateValidators = false;
    this.elemRef = elementRef;
  }

  ngOnInit() {
    this.elemRef.nativeElement.className = `brave-ui ${this.elemRef.nativeElement.className}`;
  }

  override writeValue(value: any) {
    super.writeValue(value);
    this.cdr.detectChanges();
  }

}
