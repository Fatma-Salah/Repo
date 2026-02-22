import { FormGroup, ValidatorFn } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { FieldCalculation } from 'src/app/shared/components/form/main-form/services/FormCalculation.service';
import { dropdown } from 'src/app/shared/interfaces/dropdown';

export interface BaseFormField {
  controlName: string;
  title?: string /** Display label or title */;
  placeholder?: string /** Placeholder text */;
  required?: boolean /** Whether field is required */;
  validators?: ValidatorFn[] /** Validation rules */;
  dependsOn?: any /** Field dependency on another control */;
  dependsValue?: string | number;
  dynamicOptions?: any;
  name?: string /** For table/radio-in-row use cases */;
  mapKey?: string /** Used when backend key differs from form control name */;
  value?: string | number | null | boolean | Date;
  class?: string; // CSS class for styling,
  hidden?: boolean;
  preventUpdate?: boolean;  // add to field which need to prevent update it to appear as readonly
  optional?: boolean; //whether the field is optional
  readOnly?: boolean; resetControlName?: string;   // control name which need to reset value when field change
  skipReadOnlyMood?: boolean,
  note?: string;
  apiOnChange?: {
    url: string; // e.g., 'inventory/audits/products/:id'
    method: string
    payloadKey: string | string[]
    targetFields: string[]; // fields to fill with API response
    mapResponse?: (response: any) => Record<string, any>; // optional mapper
  };
  rules?: {
    calculate: CalculateRule;
  };
calculations?: FieldCalculation[]; // Add this
  parentControlFormArrName?: string[]
  show?: boolean
  disappearFieldTitle?: boolean; //to remove title if not needed but still kep title for logic place holder in comping phase will handel this more better

  formArrayName?: string;  // optional parent FormArray name
  arrayIndex?: number;     // optional index in FormArray
}

export interface InputFormField extends BaseFormField,InputType {
  fields?: FormField[],
  skipReadOnlyMood?: boolean,
  type: 'input' | 'textarea' | 'map' | 'quantity' | 'hidden' | 'toggle';

}
export interface InputType {
  inputType?: 'text' | 'number' | 'password' | 'email' | 'time' | 'search';
}
interface CalculateRule {
  type: string;       // e.g., 'custom', 'add', 'subtract', etc.
  from: string[];     // list of field names to calculate from
}

interface CalculatedInputField extends InputFormField {
  rules: {
    calculate: CalculateRule;
  };
}

export interface SelectableFormField extends BaseFormField {
  type: 'select' | 'multi-select' | 'radio' | 'checkbox' | 'checkboxWithAdd';
  options: dropdown[];
  selectLoading?: boolean;
  optionsUrl?: string;
  optionName?: string;
  nestedName?: string;
  optionCode?: string;
  optionQueryParam?: string;
  externalQueryParam?: string;
  // ✅ Modal support
  isHasModal?: boolean;
  modalFields?: FormField[];
  modalApiUrl?: string;
  modalTitleOfButton?: string;
  modalHeader?: string;
  manualTranslateOption?: boolean;
  notTakeParentId?: boolean;
}

export interface DateFormField extends BaseFormField {
  type: 'date';
  maxDate?: Date;
  minDate?: Date;
  minDateControl?: string;
}

export interface MediaFormField extends BaseFormField {
  type: 'media';
  acceptExtension?: string;
  acceptMultiple?: boolean;
  fileImage?: boolean;
  notTakeParentId?: boolean;
}
export interface MatrixValidationRule {
  fieldA: string;      // The controlName of the first column
  fieldB: string;      // The controlName of the second column
  operator: 'equals' | 'notEquals' | 'greaterThan' | 'lessThan';
  errorMessage: string; // The translation key
}
export interface MatrixTableConfig extends BaseFormField {
  type: 'matrix-table',
  // nodes: TreeNode[];
  nodes: any;
  mainCategoryName:string;
  mainTitleValue?:string;
  validationRules?: MatrixValidationRule[]; // The general validation bridge
  headers: MatrixFormHeader[];
  firstHeaderName?: string;
  showFooter?: boolean;
  serverErrorData?: any;
  readOnlyMode?: boolean;
}
/**
 * Function type: receives the row data and returns a boolean
 * String type: "key==value" or "key!=value"
 */
export type RowCondition = string | ((rowData: any) => boolean);
export interface MatrixFormHeader extends BaseFormField,InputType {
  mapKey?: string;  // key which get value as balance.opening.dept==>get depit
  colspan?: number;
  rowspan?: number;
  children?: MatrixFormHeader[];
 onCondition?: RowCondition;
  type?: 'input' | 'textarea' | 'map' | 'quantity' | 'hidden' | 'toggle'|'modal';
}

export interface ComplexFormField extends BaseFormField {
  type: 'table' | 'accordion' | 'card' |'modal'| 'accordionWithAdd' | 'dynamic-checkbox-table';
  fields?: FormField[]; // nested fields
  nestedFormArrayFields?: FormField[]; // for dynamic FormArray handling   must send if need to
  headerRow?: string[],
  nestedControlName?: string,
  addRowTitle?: string,  //name for btn addrow
  prefixTranslateAddBtn?: string,   //add id to send prefixTranslateAddBtn
  fieldId?: string,   //add id to send through button for actions
  actions?: accordionAction[],// for appear actions in accordion
  onRowChange?: (rowGroup: FormGroup, fieldName: string, rowIndex: number) => void;

}
export interface accordionAction {
  type: 'add' | 'update' | 'delete',
  routerLink?: string;   // for routr in new page
  endpoint?: string;     // used for delete API or any api calling in the future
}

export type FormField =
  | InputFormField
  | SelectableFormField
  | DateFormField
  | MediaFormField
  | ComplexFormField
  | MatrixTableConfig
  ;
export interface FieldComparison {
  field1: string;
  field2: string;
  operator: 'equal' | 'notEqual' | 'lessThan' | 'greaterThan' | 'lessThanOrEqual' | 'greaterThanOrEqual';
  errorMessage: string;    //form array name to check fields into
  successMessage?: string;
  errorField: string;
  tableField?: string; // For table column comparisons
  compareType?: 'tableColumns' | 'regular'; // Type of comparison
}
