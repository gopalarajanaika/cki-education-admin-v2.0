import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ApiService } from '../shared/services/api/api.service';
import { CommonService } from '../shared/services/common/common.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styles: []
})
export class PostsComponent implements OnInit {

  items: any;
  gridOptions: any = {};
  addRecordLink: string;
  itemsLength: number;
  pageUrl: string;
  routeUrl: string;

  templateName: string = "post";
  dataHolder: string;
  additionalInfo: any = { 'title': '', 'dbTable': 'posts', 'templateName': 'post', 'modalTitle': '', 'fileDirectory': 'images/posts', 'childDbTable': "", 'foreignId': '', 'httpService':'getPosts', 'permDelete':'no'};
  category: string;
  destroy =  new Subject();
  
  constructor(private apiService: ApiService, public commonService: CommonService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.pageUrl = this.router.url;
    this.routeUrl = this.pageUrl.split("/")[this.pageUrl.split("/").length - 1].split("?")[0];
    this.category = this.routeUrl;
    if(this.pageUrl.split("/").length == 3 && this.pageUrl.split("/")[1].split("?")[0] == 'achievements'){
      this.category = this.pageUrl.split("/")[1].split("?")[0] +'-'+this.routeUrl;
    }

    this.gridOptions = {
      colDefs: [
        { name: 'id', displayName: 'ID', width: 50 },
        { name: 'date', displayName: 'Date', type: 'date', width: 100 },
        { name: 'parentTitle', displayName: 'Parent title', width: 100 },
        { name: 'title', displayName: 'Title' },
        { name: 'subTitle', displayName: 'Sub title' },
        { name: 'body', displayName: 'Body' },
        { name: 'url', displayName: 'URL' },
        { name: 'label', displayName: 'Label', width: 100 },
        { name: 'tags', displayName: 'Tags', width: 100 },
        { name: 'createdBy', displayName: 'Created by' },
        { name: 'fileName', displayName: 'fileName' },
        { name: 'img', displayName: 'Image', type: 'img', imgLocation: 'posts', imgRatio: '3:2', width: 100 }
      ],
      sortColDefs: [
        { name: 'id', displayName: 'ID', width: 50 },
        { name: 'title', displayName: 'Title' },
        { name: 'img', displayName: 'Image', type: 'img', imgLocation: 'posts', imgRatio: '3:2', width: 100 }
      ],
      enableRowAdd: true,
      enableRowRemove: true,
      enableRowEdit: true,
      enableRowSelect: true,
      enableFilter: true,
      enableSorting: true,
      enablePagination: true,
      itemPerPage: 25,
      enableSortAndUpdate: true,
    }

    this.additionalInfo.title = this.routeUrl;
    this.additionalInfo.modalTitle = this.routeUrl;

    this.getGridData(false);
  }

  refreshGrid() {
    this.getGridData(true)
  }
  ngOnDestroy() {
    this.commonService.clearSubscriptionsAndTimeouts(this, true, false);
  }
  getGridData(refresh) {

      this.apiService.getApi('getPosts.php?category=' + this.category + ';location=admin').pipe(takeUntil(this.destroy)).subscribe((res: any) => {

        if (res.severity == 'success') {
          this.gridOptions.data = res.data;
          if (refresh) {
            // this.dataTable.getFilteredData('', '');
          }
          this.apiService[this.routeUrl] = res.data;
        } else if (res.severity == 'danger') {
          this.gridOptions.data = [];
          this.commonService.createAlertMessage(res);
        }
        })

  }
}
