
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';




//intercept http requests and add token (if exists) in header
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService._token();

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};
