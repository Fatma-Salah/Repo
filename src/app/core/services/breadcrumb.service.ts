import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {

  private breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbsObs$: Observable<Breadcrumb[]> = this.breadcrumbs$.asObservable();

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const root = this.route.root;
        const breadcrumbs: Breadcrumb[] = this.createBreadcrumbs(root);
        this.breadcrumbs$.next(breadcrumbs);
      });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
