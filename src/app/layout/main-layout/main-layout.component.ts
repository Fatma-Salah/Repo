import { Component } from '@angular/core';
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { HeaderComponent } from "../components/header/header.component";
import { BreadcrumbComponent } from "../components/breadcrumb/breadcrumb.component";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../components/footer/footer.component";

@Component({
  selector: 'app-main-layout',
  imports: [SidebarComponent, HeaderComponent, BreadcrumbComponent, RouterOutlet, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
currentDir: any;
sidebarCollapsed = false;

toggleSidebar() {
  this.sidebarCollapsed = !this.sidebarCollapsed;
}
}
