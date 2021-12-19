import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetFailureComponent } from './components/net-failure/net-failure.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { Interceptor } from './interceptors/http-interceptor';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageLayoutComponent,
    NetFailureComponent,
    LoaderComponent,
    AlertMessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageLayoutComponent,
    NetFailureComponent,
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
