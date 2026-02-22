
import { HttpInterceptorFn } from '@angular/common/http';
import { StorageKeys } from '../constants/storage-keys';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN);

  if (!token) return next(req);

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  );
};
