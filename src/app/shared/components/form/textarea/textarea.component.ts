import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.css',
})
export class TextareaComponent implements OnChanges {
  @Input() srcIcon?: string;
  @Input() width: string = '100%';
  @Input() borderRadius: string = '8px';
  @Input() padding: string = '16px';
  @Input() bg: string = '#fff';
  @Input() label: string |undefined= '';
  @Input() fontSize: string = '16px';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() borderColor: string = '#B9B9B9';
  @Input() readonly: boolean = false;
  @Input() isOptional: boolean = false;
  @Input() control: FormControl = new FormControl();
  @Input() textareaHeight: string = '100px';
  @Input() textareaRows: number = 3;

  @Input() disabled: boolean = false;
  constructor(private translate: TranslateService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled'] ) {
    this.disabled == true?  this.control.disable():this.control.enable();


    }
    if (changes['label'] && !changes['placeholder']?.currentValue) {
      if(this.label)
      this.translate
        .get('PLEASE_SELECT', { field: this.translate.instant(this.label) })
        .pipe(take(1))
        .subscribe((translated: string) => {
          this.placeholder = translated;
        });
    }
  }
}
