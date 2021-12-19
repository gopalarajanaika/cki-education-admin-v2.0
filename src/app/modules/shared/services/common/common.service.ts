import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { fromEvent, merge, Observable, of, Subject } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  apiUrl:string;
  assetUrl:string;
  apiUrlJsonFile:string;
  foreignAssetUrl:string;
  env: string;
  loading: boolean;
  netConnection: Observable<boolean>;
  currentUrl: string;
  bsConfig: any = { dateInputFormat: 'YYYY-MM-DD', customTodayClass: 'custom-today-class',containerClass: 'theme-dark-blue' };
  
  currentUser: any = {};
  logedin: boolean = false;

  // currentUser: any = { "id": "1", "username": "gopalarajanaika@gmail.com", "password": "Admin@123", "firstName": "Gopala", "lastName": "Raja", "type": "super admin", "img": "user_1.jpg?sl=99" };
  // logedin: boolean = true;

  alertMessage: any = [];
  alertMessageLength: number = 0;
  alertshowMore: boolean;
  uniqueId: number = 1;

  toggleSideBar: boolean;
  destroy =  new Subject()
  production: boolean;

  constructor(private title: Title, private meta: Meta) {
    this.apiUrl = environment.apiUrl;
    this.apiUrlJsonFile = environment.apiUrlJsonFile;
    this.assetUrl = environment.assetUrl;
    this.foreignAssetUrl = environment.foreignAssetUrl;
    this.production = environment.production;
    this.env = environment.production ? 'dev' : 'local';
  }
  callingAlertMessage(severity, message, showMore){
    const alert = [];
    alert['message'] = message;
    alert['severity'] = severity;
    alert['showMore'] = showMore;
    this.createAlertMessage(alert);
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


  orderBy(data: any, field: string) {

    data.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return data;
  }

  clearSubscriptionsAndTimeouts(obj, subscribes, setTimeout){
    let timeOutIDs = obj["timeOutIDs"] ? JSON.parse(JSON.stringify(obj["timeOutIDs"])) : obj["timeOutIDs"];
    if(subscribes){
      obj["destroy"].next();
      obj["destroy"].complete();
    }
    if(setTimeout && timeOutIDs && timeOutIDs.length > 0){
      timeOutIDs.forEach(id => clearTimeout(id));
    }

    obj["timeOutIDs"] = [];
  }
}
