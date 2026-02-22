export interface MenuItem {
  label: string;       // translation key
  path: string;
  icon: string;
  roles?: string[];    // role-based visibility
  children?: MenuItem[];
}
