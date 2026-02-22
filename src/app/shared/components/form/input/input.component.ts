
import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil, firstValueFrom, take } from 'rxjs';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    InputGroupModule,
    TranslateModule,
    InputGroupAddonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent implements OnChanges, OnDestroy {
  lang: string = '';

  @Input() disabled: boolean = false;
  @Input() srcIcon!: string;
  @Input() max!: number ;
  @Input() min: number = 0;
  @Input() type: string = 'text';
  @Input() value: any;
  @Input() label!: string|undefined;
  @Input() placeholder!: string | null;
  @Input() name: string = '';
  @Input() addon!: string;
  @Input() readonly = false;
  @Input() isOptional = false;
  @Input() appearLabel = true;
  @Input() control: FormControl = new FormControl();

  showPassword = false;

  private destroy$ = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);
  private translate = inject(TranslateService);


get finalPlaceholder() {
  // if readonly and no value → show "no_data"
  if (this.readonly && (!this.control?.value || this.control?.value === '')) {
    return this.translate.instant('shared.no_data'); // or use your translate pipe
  }

  // normal placeholder
  return this.placeholder;
}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      this.disabled ? this.control.disable() : this.control.enable();
    }
   if (changes['label'] && ( this.placeholder==null||  !changes['placeholder'])) {
        this.translate
          .get('PLEASE_ENTER', { field: this.translate.instant(`${this.label}`) })
          .pipe(take(1))
          .subscribe((translated: string) => {
            this.placeholder = translated;
          })}
    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get isPasswordField(): boolean {
    return this.type.toLowerCase() === 'password';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getInputMode(): string {
    return this.type === 'number' ? 'numeric' : '';
  }


}
