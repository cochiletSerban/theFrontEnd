import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() {}

     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
// tslint:disable-next-line: max-line-length
         const copiedReq = req.clone({headers: req.headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzlmYmIzYWUzNjMwNjBhNWMyYzllNjYiLCJ1c2VybmFtZSI6InNlZnUiLCJhY3RpdmUiOnRydWUsImlhdCI6MTU1Njc5MTkyN30.9QxZ8uUb1-8O4kio2RYizCG20SZSwbtGjDK4apA86GU')});
         return next.handle(copiedReq);
     }
}
