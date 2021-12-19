import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetFailureComponent } from './components/net-failure/net-failure.component';
import { Interceptor } from './interceptors/http-interceptor';
import { SearchPipe, CompleteSearchPipe, DatediffPipe, DataFilterPipe,SafeHtmlPipe,SafeUrlPipe } from './pipes/filters.pipe';

@NgModule({
  declarations: [
    NetFailureComponent,
    SearchPipe,
    DatediffPipe,
    DataFilterPipe,
    CompleteSearchPipe,
    SafeHtmlPipe,
    SafeUrlPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    NetFailureComponent,
    SearchPipe,
    DatediffPipe,
    DataFilterPipe,
    CompleteSearchPipe,
    SafeHtmlPipe,
    SafeUrlPipe,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
})
export class SharedModule { }
