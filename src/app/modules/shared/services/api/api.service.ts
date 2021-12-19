import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedModule } from '../../shared.module';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: SharedModule
})
export class ApiService {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  httpHeaders: any = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' };
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error');
  }

  getApi(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(this.commonService.apiUrl + path, { headers: this.httpHeaders, params });
  }

  postApi(path: string, body: Object = {}): Observable<any> {
    return this.http.post(this.commonService.apiUrl + path, body, { headers: this.httpHeaders }
    );
  }
  postApiWithFiles(path, body: any): any {
    return this.http.post(this.commonService.apiUrl + path, body)
      .pipe(catchError(this.errorHandler));
  }

  getApiJsonFile(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(this.commonService.apiUrlJsonFile + path, { headers: this.httpHeaders, params });
  }
}
