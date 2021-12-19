import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from './page-layout.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './components/loader/loader.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PageLayoutComponent,
    HeaderComponent,
    FooterComponent,
    AlertMessageComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  exports:[
    PageLayoutComponent
  ]
})
export class PageLayoutModule { }
