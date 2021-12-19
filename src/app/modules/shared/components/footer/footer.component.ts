import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from '../../services/api/api.service';
import { CommonService } from '../../services/common/common.service';
declare var $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {
  mainContactData: any;
  dataLength: number;
  footerData: any = {};
  unsubscribe = new Subject();

  constructor(private apiService: ApiService, private commonService: CommonService) { }

  ngOnInit() {
    this.getFooter();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
  }

  getFooter() {
    this.apiService.getApi('getFooter.php').pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
      this.footerData = res;
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      });
    });
  }

}