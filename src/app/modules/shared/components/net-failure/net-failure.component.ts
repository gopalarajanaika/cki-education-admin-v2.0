import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-net-failure',
  templateUrl: './net-failure.component.html',
  styleUrls: ['./net-failure.component.scss']
})
export class NetFailureComponent implements OnInit {

  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
  }

}
