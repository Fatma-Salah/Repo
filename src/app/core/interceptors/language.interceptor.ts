import { HttpInterceptorFn } from '@angular/common/http';
import { StorageKeys } from '../constants/storage-keys';

export const langInterceptor: HttpInterceptorFn = (req, next) => {

  const lang = localStorage.getItem(StorageKeys.LANGUAGE) || StorageKeys.EN;

  return next(
    req.clone({
      setHeaders: {
        'Accept-Language': lang
      }
    })
  );
};
