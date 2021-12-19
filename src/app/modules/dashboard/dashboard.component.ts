import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from '../shared/services/api/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  destroy = new Subject();
  staticDasshboardCards = [
    { title: "Profile", count: 0, url: "settings/profile", icon: "fa-user" },
    { title: "Change Password", count: 0, url: "settings/change-password", icon: "fa-lock" },
    { title: "Logout", count: 0, url: "logout", icon: "fa-power-off" }
  ]
  dashboardCards: any = [];
  bgColors: any = ['bg-primary', 'bg-danger', 'bg-warning', 'bg-success', 'bg-secondary', 'bg-info', 'bg-dark'];
  searchDropdown: any = [];
  searchText: string = '';
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }


  getData() {
    this.apiService.getApi('getDashboardData.php').pipe(takeUntil(this.destroy)).subscribe((res: any) => {
      if (res && res.length > 0) {
        this.dashboardCards = res;
        this.staticDasshboardCards.forEach(element => {
          this.dashboardCards.push(element);
        });
        this.dashboardCards.concat(this.staticDasshboardCards);
        this.dashboardCards.forEach((element: any) => {
          this.searchDropdown.push(element.title);
        });
      } else {
        this.dashboardCards = [];
      }
    });
  }

}
