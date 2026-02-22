import { MenuItem } from "../models/menu-item.model";

export const MENU_ITEMS: MenuItem[] = [
  { label: 'menu.dashboard', path: '/', icon: 'pi pi-home' },
  { label: 'menu.users',     path: '/',     icon: 'pi pi-users', roles: ['admin'] }, 
  {
    label: 'menu.settings',  path: '/',  icon: 'pi pi-cog',
    children: [
      { label: 'menu.profile',  path: '/',  icon: 'pi pi-user' },
      { label: 'menu.security', path: '/', icon: 'pi pi-lock' },
    ]
  }
];
