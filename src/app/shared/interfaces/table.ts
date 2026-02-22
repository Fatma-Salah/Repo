// ============ Table Interfaces ============

import { FormField } from "src/app/core/interface/formField";
import { dropdown } from "./dropdown";

// export type actionCrud = 'show' | 'update' | 'delete' | 'add' | 'approve' | 'reject';


export type actionCrud = 'show' | 'update' | 'delete' | 'archive' | 'restore' | 'addChild'|'copy'|string;
export interface TableActionEvent {
  action: actionCrud;
  id: string | number;
  rowData?: any;
  row?: any;
}

export interface VisibilityCondition {
  field: string;
  value: any;
}

export interface AutoUpdateStatus {
  field: string;
  from: any;
  to: any;
  apiUrl: string;
  param?: string;
}


// ============ Action Type Definitions ============

interface BaseAction {
  label: string;
  icon?: string;
  classes?: string;
  visibleIf?: VisibilityCondition;
  hiddenIf?: VisibilityCondition;
  routerID?:string;
  rowLoading?: Record<string | number, boolean>;  //to load current btn
  condition?: (rowData: any) => boolean; // condition to appear action if true
    onClick?: ( row: any,setLoading?: (loading: boolean) => void ) => void;

  permission?: string | string[];
}

export interface ButtonAction extends BaseAction {
  type: 'button';
  action: actionCrud;
  routerLink?: string;
  paramName?: string;
  fields?: string[];
  customData?: Record<string, any>;
  encryptInUrl?: boolean; // If true, use URL encryption
  payload?: (row: any) => any;
  condition?: (rowData: any) => boolean; // Add this line
}

export interface ToggleAction extends BaseAction {
  type: 'toggle';
  field: string;
  apiUrl?: string;
  paramName?: string;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

export interface ModalAction extends BaseAction {
  type: 'modal';
  action: 'show' | 'update' | 'add';
  submitModalBtnTitle?: string;
  routerLink?: string;
  modalHeader: string;
  fieldsModal: FormField[];
  putMethod?: boolean;
  pathParam?: string;
  alert?:ALertData
}
export interface ALertData{
   messageAfterSuccess?: string ,
   name:string
}
export interface SelectAction extends BaseAction {
  type: 'select';
  options: dropdown[];
  translateOption?: boolean;
  onChange?: (value: any, rowData: any) => void;
}

export type ActionType = ButtonAction | ToggleAction | ModalAction | SelectAction;

// ============ Column Icon Configuration ============

export interface ColumnIconConfig {
  col: string;
  activeIcon: string;
  inactiveIcon: string;
  activeValue: any;
  tooltip?: string;
  routerID?:string;
  onClick?: (rowData: any) => void;
}

// ============ Clickable Field Configuration ============

export interface ClickableField {
  col: string;
  routerLink: string;
  queryParams?: (row: any) => any;
}

// ============ Table Configuration ============

export interface TableConfig {
  data: any[];
  columns: string[];
  actions?: ActionType[];
  translationPrefix?: string;
  showSearch?: boolean;
  showCheckboxes?: boolean;
  showMenubar?: boolean;
  deleteRowUrl?: string;
  clickableFields?: ClickableField[];
  columnIcons?: ColumnIconConfig[];
}

// ============ Row Loading State ============

export interface RowLoadingState {
  [key: string]: boolean;
}

// ============ Sort Event ============

export interface SortEvent {
  field: string;
  order: 1 | -1;
}

// ============ Toggle Event ============

export interface ToggleEvent {
  id: string | number;
  field: string;
  value: boolean;
  rowData?: any;
}

// ============ Cell Click Event ============

export interface CellClickEvent {
  rowData: any;
  col: string;
}

// ============ Select Change Event ============

export interface SelectChangeEvent {
  value: string;
  id: string | number;
}

// ============ Status Options (example) ============

// export type OrderType = 'purchase' | 'sales' | 'return' | 'transfer';

// export interface StatusOption {
//   label: string;
//   value: string;
//   icon?: string;
//   color?: string;
// }
// export function isButtonAction(action: ActionType): action is ButtonAction {
//   return action.type === 'button';
// }

// export function isToggleAction(action: ActionType): action is ToggleAction {
//   return action.type === 'toggle';
// }

// export function isModalAction(action: ActionType): action is ModalAction {
//   return action.type === 'modal';
// }

// export function isSelectAction(action: ActionType): action is SelectAction {
//   return action.type === 'select';
// }
