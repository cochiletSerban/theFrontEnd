import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() {}

     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
// tslint:disable-next-line: max-line-length
         const copiedReq = req.clone({headers: req.headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2NjMzVkYmJkZWYxMDJiMzgwOTY2ZDkiLCJ1c2VybmFtZSI6InNlZnUiLCJyb2xlIjoiYWRtaW4iLCJhY3RpdmUiOnRydWUsImlhdCI6MTU1Njg4NzAxNH0.Yl3D0y7oxr5RwTrQ6Cst0GpIQDrwWoiPuIRASHfzbfA')});
         return next.handle(copiedReq);
     }
}
