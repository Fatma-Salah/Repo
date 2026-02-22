import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from '../input/input.component';
import { SelectComponent } from '../select/select.component';
import { MultiSelectComponent } from '../multi-select/multi-select.component';
import { ApiService } from '../../../../core/services/http/api.service';

import {
  DateFormField,
  FormField,
  InputFormField,
  MediaFormField,
  SelectableFormField,
} from '../../../interfaces/formField';
import { errorFormat } from '../../../interfaces/errorFormat';
import { ErrorMessageComponent } from "../error-message/error-message.component";

@Component({
  selector: 'app-form-body-ui',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    MultiSelectComponent,
    ErrorMessageComponent
],
  templateUrl: './form-body-ui.component.html',
  styleUrl: './form-body-ui.component.css',
/*   changeDetection: ChangeDetectionStrategy.OnPush,
 */})
export class FormBodyUIComponent {
  @Input() form!: FormGroup;
  @Input() fields!: FormField[];
  @Input() readOnly = false;
  @Input() Put: boolean = false;
  @Input() translationPrefix = 'form';
  @Input() appendSelectToBody = true;
  @Input() isLoading = false;
  @Input() isHasModal: boolean = false;
  @Input() serverMsgErr?: string;
  @Input() title!: string;
  @Input() serverErrorData?: errorFormat[];
  @Output() optionSelected = new EventEmitter<any>();

  // Functions provided from logic component
  @Input({required:true}) getFormControlFn!: (field: FormField) => FormControl;
  @Input() getErrorsForFieldFn!: (field: FormField) => string[];
  @Input() getMatchedServerErrorFn!: (name: string) => any;
  @Input() hasGlobalServerErrorFn!: () => boolean;
  // In your component class
  constructor(private _ApiService: ApiService, private cdr: ChangeDetectorRef,
  ) {

  }
  getInputType(field: FormField): string {
    return (field as InputFormField).inputType || 'text';
  }

  getSelectLoading(field: FormField): boolean {
    return (field as SelectableFormField).selectLoading || false;
  }

  optionsStore: Record<string, any[]> = {};

  fetchOptionsFromApi(field: any): void {
    const endpoint = field.optionsUrl;
    /*    console.log(field.optionsUrl);
       console.log(field); */

    this._ApiService.Get(endpoint).subscribe({
      next: (res) => {
        (field as SelectableFormField).options = res.data || [];
      },
      error: (err) => {
        console.error('Error fetching options for', field.controlName, err);
      },
    });
  }
  getAcceptMultiple(field: FormField): boolean {
    return (field as MediaFormField).acceptMultiple || false;
  }

  getAcceptExtension(field: FormField): string {
    return (field as MediaFormField).acceptExtension || '';
  }
  getMinDateControl(field: FormField): string | null {
    return (field as DateFormField).minDateControl || null;
  }

  ngOnChanges() {
  }
  ngOnInit() {
    /*         console.log(this.fields,"dddddddddddddddddddddd");
     */
    this.fields.forEach(field => {
      if (field.dependsOn) {
        const dependsControl = this.form.get(field.dependsOn);
        if (dependsControl) {
          dependsControl.valueChanges.subscribe(() => {
            this.cdr.detectChanges(); // re-render visible fields
          });
        }
      }
    });
  }
  getVisibleFields(): FormField[] {
    if (!this.fields || !this.form) return this.fields || [];

    return this.fields.filter(field => {
      if (!field.dependsOn) return true; // no dependency → always visible

      const control = this.form.get(field.dependsOn);
      if (!control) return true;

      const value = control.value;

      if (field.dependsValue !== undefined) {
        // support multiple values (array)
        if (Array.isArray(field.dependsValue)) {
          return field.dependsValue.includes(value);
        }
        // single value
        return value === field.dependsValue;
      }

      // if only dependsOn is defined, show when that control has any value
      return !!value;
    });
  }
  getOptiaons(event: any) {
    this.optionSelected.emit(event);
  }


}
