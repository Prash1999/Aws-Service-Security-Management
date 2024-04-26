import { HttpInterceptor, HttpRequest, HttpHeaders, } from "@angular/common/http";
import { HttpEvent, HttpHandler, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { from } from "rxjs";
import { EMPTY } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { catchError } from "rxjs/operators";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class RequestinterceptorInterceptor implements HttpInterceptor {

    constructor(private router: Router, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): any {
        return from(this.addHeaders(request)).pipe(mergeMap((clonedReq: any) => {
            return next.handle(clonedReq).pipe(map(resp => resp), catchError(error => {
                if (error.status === 401) {
                    this.toastr.error("Something went wrong", "Error", { closeButton: true });
                    this.spinner.hide();
                    return this.router.navigate(["/login"]);
                } 
                else {
                    this.toastr.error("Something went wrong", "Error", { closeButton: true });
                    this.spinner.hide();
                    console.log(error);
                    return EMPTY;
                }
            }));
        }
        ));
    }

    async addHeaders(request: any) {
        const headerParams: any = {};
        const token = sessionStorage.getItem("token");
        if (token != null) {
            headerParams["Authorization"] = "Bearer " + token;
        }
        return new Promise((resolve, reject) => {
            const headers = new HttpHeaders(headerParams);
            return resolve(request.clone({ headers }));
        });
    }
}
