import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable(
  { providedIn: 'root' }
)
export class SidebarService {
  private collapsed = new BehaviorSubject<boolean>(false);
  collapsed$ = this.collapsed.asObservable();

  toggle() {
    this.collapsed.next(!this.collapsed.value);
  }
  collapse() {
    this.collapsed.next(true);
  }
  expand() {
    this.collapsed.next(false);
  }
}
