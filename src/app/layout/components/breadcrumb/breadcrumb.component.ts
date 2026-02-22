
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService, Breadcrumb } from '../../../core/services/breadcrumb.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule,RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs$!: Observable<Breadcrumb[]>;
  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbsObs$;
  }
}
