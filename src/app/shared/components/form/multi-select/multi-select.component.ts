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
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { take } from 'rxjs';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [
    MultiSelectModule,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.css',
})
export class MultiSelectComponent implements OnInit,OnChanges {
 @Output() selectionChange = new EventEmitter<any[]>();

@Input() disabled: boolean = false;
  @Input() options:any= [{ name: '...', id: 1 }];
  @Input() placeholder!: string|null;
  @Input() name: string = '';
  @Input() title!: string|undefined;
  @Input() loading!: boolean;
  @Input() width: string = '239px';
  @Input() control: FormControl = new FormControl();

  @Input() appearLabel = true;
  @Input() isOptional = false;
  constructor(private translate: TranslateService) {}
  ngOnChanges(changes: SimpleChanges): void { if(changes['disabled'] && this.disabled==true){

      this.control.disable()
    }
  }

  ngOnInit() {
    if (this.options.length) {
      if (this.title &&( !this.placeholder||this.placeholder==null)) {
        this.translate
          .get('PLEASE_SELECT', { field: this.translate.instant(this.title) })
          .pipe(take(1))
          .subscribe((translated: string) => {
            this.placeholder = translated;
          });
      }
    }

    this.control.valueChanges.subscribe((selectedValues) => {
      this.selectionChange.emit(selectedValues);
    });
  }
  get selectedOptions() {
  if (!this.control || !this.control.value || !this.options) {
    return [];
  }

  // control.value can be single id or array of ids
  const selectedIds = Array.isArray(this.control.value) ? this.control.value : [this.control.value];

  return this.options.filter((opt:any) => selectedIds.includes(opt.id));
}

}
