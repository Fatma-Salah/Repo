
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { dropdown } from '../../../interfaces/dropdown';

@Component({
  selector: 'app-select',
  standalone: true,
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  imports: [SelectModule, ReactiveFormsModule, CommonModule, TranslateModule],
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() options: dropdown[] = [];
  @Input() placeholder!: string | null;
  @Input() name: string = '';
  @Input() optionValue: string = 'id';
  @Input() title!: string | undefined;
  @Input() loading!: boolean;
  @Input() translatePrefix: string = '';
  @Input() note!: string | undefined;
  @Input() control: FormControl = new FormControl();
  @Input() manualTranslateOption = false;
  @Input() disabled: boolean = false;
  @Input() isOptional: boolean = false;
  @Input() appearLabel = true;
  @Input() titleDropdown: string = '';
  @Input() addall = true;
  @Input() appendToBody = true;

  @Output() optionSelected = new EventEmitter<any>();
  @Output() option = new EventEmitter<any>();

  filteredOptions: dropdown[] = [];
  filter: boolean = true;

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    // initialize filtered options
    this.filteredOptions = [...this.options];

    this.updatePlaceholder();

    // emit changes when value changes
    this.control.valueChanges.subscribe((value) => {
      this.optionSelected.emit(value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Disable control if disabled input changes
    if (changes['disabled']) {
      this.disabled ? this.control.disable() : this.control.enable();
    }

    // Translate options if needed
    if (changes['options'] && this.options?.length) {
      this.filteredOptions = [...this.options];
      this.translateOptions();
    }

    // Enable filter if options length > 4
    if (changes['options'] && this.options && this.options.length > 4) {
      this.filter = true;
    }
  }

  private translateOptions(): void {
    if (this.manualTranslateOption) {
      this.options = this.options.map((opt) => {
        const translatedName = this.translate.instant(opt.name);
        return { ...opt, name: translatedName || opt.name };
      });
      this.filteredOptions = [...this.options];
    }
  }

  onSelectChange(event: any) {
    this.optionSelected.emit(event.value);
    this.option.emit(event);
  }

  getFlagEmoji(countryCode: string): string {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  private updatePlaceholder() {
    if (!this.placeholder && this.translatePrefix && this.title) {
      this.translate.get(this.title).subscribe((translatedTitle: string) => {
        this.translate
          .get('PLEASE_SELECT', { field: translatedTitle })
          .subscribe((translatedPlaceholder: string) => {
            this.placeholder = translatedPlaceholder;
          });
      });
    }
  }

  // Custom filter logic for PrimeNG p-select
  customFilter(event: any) {
    const filterValue = event.filter?.toLowerCase() || '';

    this.filteredOptions = this.options.filter((option) => {
      const codeMatch = option.code?.toLowerCase().startsWith(filterValue);
      const nameMatch = option.name?.toLowerCase().includes(filterValue);
      return codeMatch || nameMatch;
    });
  }
}
