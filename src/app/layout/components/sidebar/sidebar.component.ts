import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MenuItem } from '../../models/menu-item.model';
import { MENU_ITEMS } from '../../config/menu.config';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,RouterLink,TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  collapsed$: Observable<boolean>;
  menuItems: MenuItem[] = MENU_ITEMS;

  private openMenus = new Set<MenuItem>();

  constructor(private sidebarService: SidebarService) {
    this.collapsed$ = this.sidebarService.collapsed$;
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  toggleSubMenu(item: MenuItem) {
    if (this.openMenus.has(item)) {
      this.openMenus.delete(item);
    } else {
      this.openMenus.add(item);
    }
  }

  isOpen(item: MenuItem): boolean {
    return this.openMenus.has(item);
  }
}
