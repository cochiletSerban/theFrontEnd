import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import * as M from 'materialize-css';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const copiedReq = req.clone({headers: req.headers.append('Authorization', 'Bearer ' + this.authService.getToken())});
        console.log(req);
        return next.handle(copiedReq).pipe(tap((event: HttpEvent<any>) => {}, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                M.toast({classes: 'interceptorErrToast' , html: err.message +
                    `<button class="btn-flat toast-action" onclick="M.Toast.getInstance($('.toast')).dismiss()">Dismiss</button>`
                });
            }
        }));
    }

}
