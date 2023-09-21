import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, forwardRef, Injector, Input, OnInit, Optional, QueryList, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorMixin } from '../../classes/control-value-accessor-mixin.class';
import { ReadOnlyDirective } from '../../directives/readonly.directive';
import { SelectOptionDirective } from './select-option.directive';

@Component({
  selector: 'ui-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
})
export class SelectComponent extends ControlValueAccessorMixin implements OnInit, AfterContentInit {

  @Input() label!: string;
  @Input() placeholder = '';
  @Input() info!: string;
  @Input() multiple = false;
  @Input() sort = 1;
  @Input() optionsTop = false;
  @Input() autoSelectWhenHasOneOption = false;
  @Input() searchByStartsWith = false;
  @Input() keyValue = ''; // Used when value is an object

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
  @ViewChild('optionsElement', { static: true }) optionsElement!: CdkVirtualScrollViewport;
  @ContentChildren(SelectOptionDirective) selectOptionsComponents!: QueryList<SelectOptionDirective>;

  private selectedOption?: SelectOptionDirective;
  private selectedOptions!: Set<SelectOptionDirective>;
  isOptionsVisible = false;
  searchValue = '';
  rawOptions = new Array<SelectOptionDirective>();
  get options() { return this.rawOptions.filter(elem => !elem.fallback); }
  filteredOptions?: Array<SelectOptionDirective>;
  description?: string | number;

  private elemRef: ElementRef;

  constructor(
    elementRef: ElementRef,
    injector: Injector,
    protected override cdr: ChangeDetectorRef,
    @Optional() readOnlyDirective?: ReadOnlyDirective
  ) {
    super(elementRef, injector, readOnlyDirective);
    this.elemRef = elementRef;
  }

  ngOnInit() {
    this.elemRef.nativeElement.className = `brave-ui ${this.elemRef.nativeElement.className}`;
  }

  ngAfterContentInit() {
    this.loadOptions(this.selectOptionsComponents.toArray());

    // Listen changes in options
    this.selectOptionsComponents.changes.subscribe((res: QueryList<SelectOptionDirective>) => {
      this.loadOptions(res.toArray());
    });
  }

  loadOptions(data: SelectOptionDirective[]) {
    this.rawOptions = data;

    if (this.rawOptions) {
      this.rawOptions.sort(this.sortOptions.bind(this));
    }

    this.trySelectOptionsWithValue();

    // Check can select if has just one option
    if (
      this.value == undefined &&
      this.autoSelectWhenHasOneOption &&
      this.options?.length == 1
    ) {
      this.selectOption(this.options[0]);
    }

    this.cdr.detectChanges();
  }

  sortOptions(a: SelectOptionDirective, b: SelectOptionDirective) {
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

  override writeValue(value: any) {
    this.reset();
    super.writeValue(value);
    this.trySelectOptionsWithValue();
    this.cdr.detectChanges();
  }

  trySelectOptionsWithValue() {
    if (this.value != undefined) {
      if (this.multiple) {
        this.value.forEach((valueElem: any) => {
          this.options.forEach(optionElem => {
            if (this.tryMatchOptionByValue(optionElem, valueElem)) {
              this.selectOption(optionElem, false);
            }
          });
        });
      } else {
        this.options.forEach(elem => {
          if (this.tryMatchOptionByValue(elem, this.value)) {
            this.selectOption(elem, false);
          }
        });
      }
    }
  }

  tryMatchOptionByValue(option: SelectOptionDirective, selectValue?: any) {
    if (option.value == undefined || selectValue == undefined) {
      return false;
    }

    const optionValue = option.keyValue ? option.value[option.keyValue] : option.value;
    const value = this.keyValue ? selectValue[this.keyValue] : selectValue;

    if (optionValue == value) {
      return true;
    }
    return false;
  }

  hasOption(data: SelectOptionDirective) {
    if (data.fallback) {
      return false;
    }

    if (this.multiple && this.selectedOptions) {
      let hasOption = false;

      if (this.keyValue) {
        this.selectedOptions.forEach(elem => {
          if (data.value[this.keyValue] === elem.value[this.keyValue]) {
            hasOption = true;
          }
        });
      } else {
        hasOption = this.selectedOptions.has(data);
      }

      return hasOption;
    } else {
      if (this.keyValue && this.selectedOption) {
        if (data.value[this.keyValue] === this.selectedOption.value[this.keyValue]) {
          return true;
        }
        return false;
      } else {
        return this.selectedOption == data;
      }
    }
  }

  toggleOption(data: SelectOptionDirective, propaggateChanges = true) {
    if (data.disabled) {
      return;
    }

    if (data.fallback) {
      data.select.emit();
      this.closeOptions();
      return;
    }

    if (this.multiple) {
      this.selectMultipleOption(data);
    } else {
      this.selectSingleOption(data);
      this.closeOptions();
    }

    // Set value accessor
    if (propaggateChanges) {
      this.value = this.createOptions();
    }

    data.select.emit();
  }

  private selectOption(data: SelectOptionDirective, propaggateChanges = true) {
    if (this.multiple) {
      this.selectMultipleOption(data, false);
    } else {
      this.selectSingleOption(data, false);
      this.closeOptions();
    }

    // Set value accessor
    if (propaggateChanges) {
      this.value = this.createOptions();
    }
  }

  showOptions() {
    if (!this.isDisabled && !this.isReadOnly) {
      this.isOptionsVisible = true;
      this.searchInput.nativeElement.focus();
      this.focus();
    }
  }

  closeOptions() {
    if (this.isOptionsVisible) {
      this.blur();
    }

    this.isOptionsVisible = false;
    this.clearFilter();
  }

  filter() {
    const startsWithSymbol = this.searchByStartsWith ? '^' : '';

    const fallbackOptions: SelectOptionDirective[] = [];

    const filteredOptions = this.rawOptions.filter((elem => {
      if (elem.fallback) {
        fallbackOptions.push(elem);
        return false;
      }

      const regex = new RegExp(`${startsWithSymbol}${this.searchValue.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`, 'i');
      return regex.test(elem.description?.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
    }));

    if (filteredOptions.length > 0) {
      this.filteredOptions = filteredOptions;
    } else {
      this.filteredOptions = fallbackOptions;
    }
  }

  clearFilter() {
    this.searchValue = '';
    this.filteredOptions = undefined;
  }

  get optionsStyle() {
    if (this.optionsTop) {
      const height = this.optionsElement.elementRef.nativeElement.clientHeight;
      return { top: `calc(-${height}px - 39px)` };
    }

    return {};
  }

  private selectMultipleOption(data: SelectOptionDirective, toggle = true) {
    if (!this.selectedOptions) {
      this.selectedOptions = new Set();
    }

    // Check if options don't exists
    if (!this.hasOption(data)) {
      this.selectedOptions.add(data);
    } else if (toggle) {
      if (this.keyValue) {
        this.selectedOptions.forEach(elem => {
          if (data.value[this.keyValue] === elem.value[this.keyValue]) {
            this.selectedOptions.delete(elem);
          }
        });
      } else {
        this.selectedOptions.delete(data);
      }
    }

    // Update description
    let description = '';
    this.selectedOptions.forEach((elem) => {
      if (!description) {
        description = `${elem.description}`;
      } else {
        description += `, ${elem.description}`;
      }
    });

    this.description = description;
  }

  private selectSingleOption(data: SelectOptionDirective, toggle = true) {
    if (toggle && this.selectedOption == data) {
      this.selectedOption = undefined;
      this.description = undefined;
    } else {
      this.selectedOption = data;
      this.description = data.description;
    }
  }

  private createOptions() {
    if (this.multiple) {
      const options = new Array<SelectOptionDirective>();

      this.selectedOptions.forEach(elem => {
        options.push(elem.value);
      });

      return options;
    } else {
      return this.selectedOption?.value;
    }
  }

  private reset() {
    this.innerValue = undefined;
    this.selectedOption = undefined;
    this.description = undefined;

    if (this.selectedOptions) {
      this.selectedOptions.clear();
    }
  }
}




