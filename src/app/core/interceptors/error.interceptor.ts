import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    catchError(error => {

      if (error.status === 500) {
        console.error('Server Error');
      }

      if (error.status === 0) {
        console.error('Network Error');
      }

      return throwError(() => error);
    })
  );
};
