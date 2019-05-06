import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';




@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() {}

     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
// tslint:disable-next-line: max-line-length
         const copiedReq = req.clone({headers: req.headers.append('Authorization', 'Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2NjMzVkYmJkZWYxMDJiMzgwOTY2ZDkiLCJ1c2VybmFtZSI6InNlZnUiLCJyb2xlIjoiYWRtaW4iLCJhY3RpdmUiOnRydWUsImlhdCI6MTU1NzEzODE3NH0.CyQgGQ3prWbR-lC9uq973DMC92rliVSG4kyMMYt12zg')});
         return next.handle(copiedReq).pipe(catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error.error.error,
                    status: error.status
                };
                console.log(data); // send it to error handeling service
                return throwError(error);
            }));
     }
}


// return next.handle(request).pipe(
//   map((event: HttpEvent<any>) => {
//       if (event instanceof HttpResponse) {
//           console.log('event--->>>', event);
//           // this.errorDialogService.openDialog(event);
//       }
//       return event;
//   }),
//   catchError((error: HttpErrorResponse) => {
//       let data = {};
//       data = {
//           reason: error && error.error.reason ? error.error.reason : '',
//           status: error.status
//       };
//       this.errorDialogService.openDialog(data);
//       return throwError(error);
//   }));
