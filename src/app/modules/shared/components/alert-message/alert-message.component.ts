import { trigger, style, animate, transition, query, keyframes, stagger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss'],
  animations: [
    trigger('animationTrigger', [
      transition('* => *', [
  
        query(':enter', style({ opacity: 0 }), {optional: true}),
  
        query(':enter', stagger('200ms', [
          animate('0.8s ease-in', keyframes([
            style({opacity: 0.2, transform: 'translateX(100%)', border:'2.5px solid', offset: 0}),
            style({opacity: .8, transform: 'translateX(-35px)', border:'1px solid', offset: 0.3}),
            style({opacity: 1, transform: 'translateX(0)', border:'1px solid', offset: 1.0}),
          ]))
      ]), {optional: true}),
  
          query(':leave', stagger('200ms', [
              animate('0.8s ease-in', keyframes([
                style({opacity: 1, transform: 'translateX(0)', border:'1px solid', offset: 0}),
                style({opacity: .8, transform: 'translateX(-35px)', border:'1px solid', offset: 0.3}),
                style({opacity: 0.2, transform: 'translateX(100%)', border:'2.5px solid', offset: 1}),
              ]))
          ]), {optional: true}),
      ])
    ])
  ]
})
export class AlertMessageComponent implements OnInit {

  webstackId: number;
  webstackWaitTime = 15; // in seconds
  messageDetails: any;
  constructor(public commonService: CommonService) { }

  ngOnInit() {
    setInterval(() => {
      var timeStamp = Math.floor(Date.now() / 1000);
      if (this.commonService && this.commonService.alertMessage.length > 0) {
        this.commonService.alertMessage.forEach((v: any, k: number) => {
          if (v.timeStamp + this.webstackWaitTime < timeStamp) {
            this.commonService.alertMessage.splice(k, 1);
          }
        });
      }
    })
  }

  removeAlert(index: number) {
    this.commonService.alertMessage.splice(index, 1);
  }

  showMoreErrorDetails(message){
    this.commonService.alertshowMore = true;
    this.messageDetails = message;
    
  }

}
