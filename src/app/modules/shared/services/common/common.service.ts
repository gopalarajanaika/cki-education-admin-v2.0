import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  apiUrl: string;
  netConnection: Observable<boolean>;
  alertMessage: any = [];
  alertMessageLength: number = 0;
  alertshowMore: boolean;
  uniqueId: number = 1;
  loading: boolean;
  loadingManual: boolean;
  bsConfig: any = { dateInputFormat: 'YYYY-MM-DD', customTodayClass: 'custom-today-class', containerClass: 'theme-dark-blue' };
  production:boolean = false;
  apiUrlJsonFile: string;
  constructor(private title: Title, private meta: Meta) {
    this.apiUrl = environment.apiUrl;
    this.apiUrlJsonFile = environment.apiUrlJsonFile;
    this.production = environment.production;
    this.netConnection = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    )
  }
  createAlertMessage(data: any) {
    setTimeout(() => {
      this.alertMessageLength = 1;
    });
    var timeStamp = Math.floor(Date.now() / 1000);
    var newMessage = { "id": this.uniqueId, "severity": data.severity, "timeStamp": timeStamp, "message": data.message, 'showMore': data.showMore, "details": data };
    this.alertMessage.unshift(newMessage);
    this.uniqueId++;
  }

  applyEllipseInlineCss() {
    setTimeout(() => {
      $(".text-truncate-line").css({ "-webkit-box-orient": "vertical", "-moz-box-orient": "vertical", "box-orient": "vertical" });
    }, 100);
  }

  setMetaTagConentForSeo(title, ...args) {
    if (title)
      this.title.setTitle((title[0].toUpperCase() + title.slice(1)).replace(/-/g, ' '));
    if (args[0]) {
      let metaContent = args[0].replace(/<[^>]*>/g, "");;
      this.meta.updateTag({ name: 'description', content: metaContent });
    }
  }
}
