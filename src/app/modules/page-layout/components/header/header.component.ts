import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event as NavigationEvent } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() currentParentMenu: string;
  @Input() currentMenu: string;

  currentTab: string;
  currentParentTab: string = "";
  pageUrl: string;
  routeUrl: string;
  testUrlFromApp: any;
  showMe: boolean;
  routerLoaded: boolean;
  routeParentUrl: string;
  navbarData: any = [
    { 'name': "<i class='fa fa-home'></i>", 'url': '/' },
    {
      'name': 'About', 'url': '/about-christ-king-institution', 'subMenus': [
        { 'name': 'Introduction', 'url': '/about-christ-king-institution/introduction' },
        { 'name': 'Management members', 'url': '/management/members' },
        { 'name': 'Faculties', 'url': '/faculties' },
        { 'name': 'Heads of Institution\'s Message', 'url': '/heads-of-institutions-message' },
        { 'name': 'Affiliation & legal recognitions', 'url': '/about-christ-king-institution/affiliation-and-legal-recognition' },
        { 'name': 'Acadamic Excellence', 'url': '/about-christ-king-institution/acadamic-excellence' },
        { 'name': 'Campus', 'url': '/about-christ-king-institution/campus' },
      ]
    },
    { 'name': "Courses", 'url': '/courses' },
    { 'name': "Facilities", 'url': '/facilities' },
    { 'name': "Clubs", 'url': '/clubs' },
    {
      'name': 'Achievements', 'url': '/achievements', 'subMenus': [
        { 'name': 'All', 'url': '/achievements' },
        { 'name': 'Academic', 'url': '/achievements-academic' },
        { 'name': 'Sports & gaming', 'url': '/achievements-sports-gaming' },
        { 'name': 'Co-curricular', 'url': '/achievements-co-curricular' },
        { 'name': 'Extra-curricular', 'url': '/achievements-extra-curricular' },
        { 'name': 'Others', 'url': '/achievements-others' },
      ]
    },
    { 'name': "Admission", 'url': '/admission' },
    {
      'name': 'Alumni', 'url': '/alumni', 'subMenus': [
        { 'name': 'Members', 'url': '/alumni/members' },
        { 'name': 'Registration', 'url': '/alumni/registration' }
      ]
    },
    { 'name': "Contact", 'url': '/contact' },
    {
      'name': "More", 'url': '/more', 'subMenus': [
        { 'name': 'Notifications', 'url': '/notifications' },
        { 'name': 'News and Events', 'url': '/news-and-events' },
        { 'name': 'Gallery', 'url': '/galleries' },
        { 'name': 'Testimonials', 'url': '/testimonials' },
        { 'name': 'Results', 'url': '/results' },
        { 'name': 'Career', 'url': '/career' },
        { 'name': 'Pay Online', 'url': '/payment' },
        { 'name': 'Login', 'url': 'http://christkinginstitution.com/admin/login' }
      ]
    },
  ];


  constructor(private router: Router) { }

  ngOnInit() {
    this.currentTab = 'home';

    setTimeout(() => {
      $('.navbar-nav li a.hide-click, .navbar-brand, .breadcrumb-item a').on('click', function () {
        $('.navbar-collapse').collapse('hide');
      });
    }, 0);
  }

}
