import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router"
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from '../shared/services/api/api.service';
import { CommonService } from '../shared/services/common/common.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ngFormData: any = { "username": "", "password": "" };
  pageUrl: string;
  routeUrl: string;
  capslockOn: boolean = false;
  showHidePasswordFlag: boolean = false;
  @ViewChild("password") password: ElementRef;
  @ViewChild("myNgForm") myNgForm: NgForm;
  timeOutIDs: any = [];
  destroy =  new Subject();
  
  constructor(private apiService: ApiService, private commonService: CommonService, private router: Router) { }


  ngOnInit() {
    this.pageUrl = this.router.url;
    this.routeUrl = this.pageUrl.split("/")[this.pageUrl.split("/").length - 1].split("?")[0];

    if (Object.keys(this.commonService.currentUser).length != 0) {
      this.router.navigate(['/home']);
    }
  }

  @HostListener('window:click', ['$event'])
  onClick(event) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      this.capslockOn = true;
    } else {
      this.capslockOn = false;
    }
  }
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      this.capslockOn = true;
    } else {
      this.capslockOn = false;
    }
  }
  @HostListener('window:keyup', ['$event'])
  onKeyUp(event) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      this.capslockOn = true;
    } else {
      this.capslockOn = false;
    }
  }
  ngOnDestroy() {
    this.commonService.clearSubscriptionsAndTimeouts(this, true, false);
  }
  login() {
    if (this.myNgForm.valid) {
      this.apiService.postApi('login.php', this.ngFormData).pipe(takeUntil(this.destroy)).subscribe((res: any = {}) => {
        if (res.alert && res.alert.code == 201) {
          if (res.data && (res.apiService.type == 'admin' || res.apiService.type == 'super admin')) {
            this.commonService.currentUser = res.data;
            this.router.navigate(['/home']);
            this.timeOutIDs.push(
            setTimeout(() => {
              this.commonService.logedin = true;
              $("body").removeClass("login-page");
            })
            )
          } else {
            this.router.navigate(['access-denied']);
            this.timeOutIDs.push(
            setTimeout(() => {
              this.commonService.logedin = false;
            })
            )
          }
        }

        this.commonService.createAlertMessage(res.alert);
      }, errors => {
        if (errors && typeof errors === 'object') {
          this.commonService.callingAlertMessage('danger', errors.message, true);
        } else {
          this.commonService.callingAlertMessage('danger', errors, true);
        }
      });
    } else {
      this.commonService.callingAlertMessage('danger', "Please fill all required fields", false);
    }
  }

}
