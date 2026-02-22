import { Injectable } from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { mapTo, startWith, shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NetworkService {

  online$ = merge(
    fromEvent(window, 'online').pipe(mapTo(true)),
    fromEvent(window, 'offline').pipe(mapTo(false))
  ).pipe(
    startWith(navigator.onLine),
    shareReplay(1)
  );
}
