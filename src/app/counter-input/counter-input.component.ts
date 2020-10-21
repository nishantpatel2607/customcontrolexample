import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'counter-input',
  template: `
    <button (click)="increment()" [disabled]="disabled">+</button>
    {{ counterValue }}
    <button (click)="decrement()" [disabled]="disabled">-</button>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CounterInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CounterInputComponent),
      multi: true,
    },
  ],
})
export class CounterInputComponent implements ControlValueAccessor {
  @Input()
  _counterValue = 0; // notice the '_'

  @Input()
  maxValue = 10;

  @Input()
  minValue = 0;

  get counterValue() {
    return this._counterValue;
  }

  set counterValue(val) {
    this._counterValue = val;
    this.propagateChange(this._counterValue);
  }

  propagateChange = (_: any) => {};

  constructor() {}

  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.counterValue = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {}

  private _disabled: boolean = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    // this._changeDetector.markForCheck();
  }

  increment() {
    this.counterValue++;
  }

  decrement() {
    this.counterValue--;
  }

  validate(c: FormControl) {
    let err = {
      rangeError: {
        given: c.value,
        max: this.maxValue,
        min: this.minValue,
      },
    };

    return c.value > this.maxValue || c.value < this.minValue ? err : null;
  }
}
