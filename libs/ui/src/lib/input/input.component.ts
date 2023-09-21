import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  Component,
  forwardRef,
  Input,
  ElementRef,
  Injector,
  HostListener,
  ViewChild,
  Optional,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorMixin } from '../../classes/control-value-accessor-mixin.class';
import { ReadOnlyDirective } from '../../directives/readonly.directive';
import { InputOptionDirective } from './input-option.directive';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends ControlValueAccessorMixin implements OnInit, AfterContentInit {

  @ViewChild('input1', { static: false }) input1!: ElementRef<HTMLInputElement>;
  @ViewChild('input2', { static: false }) input2!: ElementRef<HTMLInputElement>;
  @ViewChild('input3', { static: false }) input3!: ElementRef<HTMLInputElement>;
  @ViewChild('input4', { static: false }) input4!: ElementRef<HTMLInputElement>;

  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() outsidePrefix!: string;
  @Input() outsideSuffix!: string;
  @Input() type: InputType = 'text';
  @Input() rows = 1;
  @Input() textMask!: string;
  @Input() textPrefix!: string;
  @Input() textSuffix!: string;
  @Input() leftIcon!: string;
  @Input() rightIcon!: string;
  @Input() info!: string;
  @Input() acceptNegativeSign = true;
  @Input() decimalDigits = 2;

  //#region Autocomplete

  @Input() optionsTop = false;
  @Input() sort = 1;
  @Input() searchByStartsWith = false;

  @ContentChildren(InputOptionDirective) inputOptionsComponents!: QueryList<InputOptionDirective>;
  @ViewChild('optionsElement', { static: true }) optionsElement!: CdkVirtualScrollViewport;

  rawOptions = new Array<InputOptionDirective>();
  get options() { return this.rawOptions.filter(elem => !elem.fallback); }
  filteredOptions?: Array<InputOptionDirective>;
  isOptionsVisible = false;


  @Output() autocompleteSelectionChange = new EventEmitter<any>();

  //#endregion Autocomplete

  // Auxiliary
  numberValue = '0';
  private lastNumberValue!: string;

  private elemRef: ElementRef;

  constructor(
    elementRef: ElementRef,
    injector: Injector,
    protected override cdr: ChangeDetectorRef,
    @Optional() readOnlyDirective?: ReadOnlyDirective,
  ) {
    super(elementRef, injector, readOnlyDirective);
    this.elemRef = elementRef;
  }

  ngOnInit() {
    this.elemRef.nativeElement.className = `brave-ui ${this.elemRef.nativeElement.className}`;
  }

  ngAfterContentInit() {
    this.rawOptions = this.inputOptionsComponents.toArray();

    if (this.rawOptions) {
      this.rawOptions.sort(this.sortOptions.bind(this));
    }

    this.inputOptionsComponents.changes.subscribe(res => {
      this.rawOptions = res.toArray();

      if (this.rawOptions) {
        this.rawOptions.sort(this.sortOptions.bind(this));
      }
    });
  }

  @Input() displayWith = (value: any) => { return value; };

  sortOptions(a: InputOptionDirective, b: InputOptionDirective) {
    if (!a.canSort || !b.canSort) {
      return 0;
    }

    if (this.sort == 1) {
      return a.description < b.description ? -1 : a.description > b.description ? 1 : 0;
    } else if (this.sort == -1) {
      return a.description < b.description ? 1 : a.description > b.description ? -1 : 0;
    } else {
      return 0;
    }
  }

  filter() {
    const startsWithSymbol = this.searchByStartsWith ? '^' : '';

    if (typeof this.value === 'string') {
      const fallbackOptions: InputOptionDirective[] = [];

      const filteredOptions = this.rawOptions.filter((elem => {
        if (elem.fallback) {
          fallbackOptions.push(elem);
          return false;
        }

        const regex = new RegExp(`${startsWithSymbol}${this.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`, 'i');
        return regex.test(elem.description?.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
      }));

      if (filteredOptions.length > 0) {
        this.filteredOptions = filteredOptions;
      } else {
        this.filteredOptions = fallbackOptions;
      }
    } else {
      this.filteredOptions = undefined;
    }
  }

  selectAutocompleteOption(data: InputOptionDirective) {
    this.value = data.value;
    this.closeOptions();

    if (data.fallback) {
      data.select.emit(data.value);
      return;
    }

    this.autocompleteSelectionChange.emit(data.value);
  }

  showOptions() {
    if (!this.isDisabled && !this.isReadOnly) {
      this.isOptionsVisible = true;
      this.focus();
    }
  }

  closeOptions() {
    if (this.isOptionsVisible) {
      this.blur();
    }

    this.isOptionsVisible = false;
  }

  @HostListener('focus')
  override focus() {
    const input = this.input1 || this.input2 || this.input3 || this.input4;
    if (input) {
      input.nativeElement.focus();
    }
    super.focus();
  }

  override writeValue(value: any) {
    if (this.type == 'number') {
      if (!isNaN(value)) {
        super.writeValue(value);
        this.typeNumberInputEvent(value, true);
      }
    } else {
      super.writeValue(value);
    }

    this.filter();

    this.cdr.detectChanges();
  }

  typeNumberInputEvent(value?: string, reset = false) {
    if (reset) {
      this.value = undefined;
      this.numberValue = '';
      this.lastNumberValue = '';
    }

    let char: string | undefined | null = value;
    if (typeof (value) == 'string') {
      if (value.length < this.numberValue.length) {
        char = null;
      } else {
        char = value[value.length - 1];
      }
    }

    if ((!this.value && char == undefined) || (char == undefined && this.value.toString().length == 1)) {
      this.value = undefined;
      this.numberValue = '';
      this.lastNumberValue = '';
    } else if (
      !isNaN(char as any) ||
      (char == '.' && this.lastNumberValue.search(/\./g) == -1) ||
      (char == ',' && this.lastNumberValue.search(/,/g) == -1) ||
      (char == '+' && this.lastNumberValue.length == 0) ||
      (char == '-' && this.lastNumberValue.length == 0 && this.acceptNegativeSign)
    ) {
      let newNumber: string;
      let useComma = false;

      // Get the new number value
      if (char != undefined) {
        newNumber = `${this.lastNumberValue || ''}${char}`;

        if (newNumber.includes(',')) {
          useComma = true;
          newNumber = newNumber.replace(/,/g, '.');
        }
      } else {
        const stringNumber: string = this.lastNumberValue;
        newNumber = stringNumber.substr(0, stringNumber.length - 1);
      }

      // Format decimal digits
      let formattedDecimalDigits = newNumber;
      if (!isNaN(Number(newNumber))) {
        if (Number(newNumber) % 1 != 0) {
          const splitedNumber = newNumber.toString().split('.');

          if (splitedNumber.length === 2) {
            const decimalPart = splitedNumber[1];

            if (decimalPart.length > 2) {
              formattedDecimalDigits = `${splitedNumber[0]}.${decimalPart.substring(0, this.decimalDigits)}`;
            }
          }

        }
      }

      // Set original decimal separator
      let formattedSeparatorDigit = formattedDecimalDigits;
      if (useComma) {
        formattedSeparatorDigit = formattedDecimalDigits.replace(/\./g, ',');
      }

      // Update the number that show in input
      this.numberValue = `${this.textPrefix || ''}${formattedSeparatorDigit}${this.textSuffix || ''}`;

      // Update lastNumberValue that was used as reference
      this.lastNumberValue = formattedSeparatorDigit;

      // Update control value
      if (!isNaN(formattedDecimalDigits as any)) {
        this.value = Number(formattedDecimalDigits);
      }
    }

    if (this.input2) {
      this.input2.nativeElement.value = this.numberValue;
    }
  }

  get optionsStyle() {
    if (this.optionsTop) {
      const height = this.optionsElement.elementRef.nativeElement.clientHeight;
      return { top: `calc(-${height}px - 39px)` };
    }

    return {};
  }

}

type InputType = 'text' | 'number';

