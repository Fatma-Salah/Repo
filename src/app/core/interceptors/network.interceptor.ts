import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NetworkService } from '../services/network.service';
import { filter, switchMap, take } from 'rxjs/operators';

export const networkInterceptor: HttpInterceptorFn = (req, next) => {

  const network = inject(NetworkService);

  if (!navigator.onLine) {
    return network.online$.pipe(
      filter(status => status),
      take(1),
      switchMap(() => next(req))
    );
  }

  return next(req);
};
