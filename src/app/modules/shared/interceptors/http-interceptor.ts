import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommonService } from "../services/common/common.service";

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private commonService: CommonService) { }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        request.clone({
            headers: request.headers.set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
        });

        this.commonService.loading = true;
        return next.handle(request).pipe(
            tap(
                event => {
                    if (event instanceof HttpResponse) {
                        this.commonService.loading = false;
                    }
                },
                error => {
                    if (error instanceof HttpErrorResponse) {
                        this.commonService.loading = false;
                        let alert = { severity: 'danger', message: "Something went wrong" };
                        this.commonService.createAlertMessage(alert);
                    }
                }
            )
        );
    }
}