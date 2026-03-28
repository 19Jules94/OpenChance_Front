import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { catchError, Observable, switchMap, tap } from 'rxjs';
import { TokenService } from '../services/token.service';
import { Injectable } from '@angular/core';

console.log("AuthInterceptor cargado");
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private token: TokenService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('➡️ Interceptor intercepta request:', req.url);
    if (req.url.includes('login') || req.url.includes('refreshToken')) {
      return next.handle(req);
    }

    const accessToken = this.token.getAccessToken();
    console.log("TOKEN INTERCEPTOR:", accessToken);
    if (accessToken) {
      console.log('🔑 Añadiendo access token');
      req = req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
    }

    return next.handle(req).pipe(
      tap(() => {
        console.log('✅ Request completada:', req.url);
      }),
      catchError((error) => {
         console.log("❌ Error capturado:", error.status);
        if (error.status === 401) {
          console.log("♻️ Token expirado, intentando refresh");
          return this.auth.refreshToken().pipe(
            switchMap(() => {
              const newToken = this.token.getAccessToken();
              console.log("🆕 Nuevo token:", newToken);
              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`,
                },
              });
              console.log("🔁 Reintentando request");
              return next.handle(newReq);
            }),
          );
        }
        throw error;
      }),
    );
  }
}
