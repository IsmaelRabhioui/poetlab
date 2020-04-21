import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDataService } from '../user-data.service';
import {
  faSearch,
  faHome,
  faAddressCard,
  faScroll,
  IconDefinition,
  faUserCog,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  faUserCog = faUserCog;
  faCog = faCog;
  faSearch = faSearch;
  faHome = faHome;
  faAddressCard = faAddressCard;
  faScroll = faScroll;
  currentComponent: string;
  currentFa: IconDefinition;
  userDetails;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  refresh(username) {
    console.log(username);
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _router: Router,
    private _userDataService: UserDataService,
    private _currentRoute: ActivatedRoute
  ) {
    this._router.events.subscribe(val => {
      if (this._currentRoute.snapshot.firstChild != null) {
        this.currentComponent = this._currentRoute.snapshot.firstChild.routeConfig.component.name;
      } else {
        this.currentComponent = '';
        this.currentFa = null;
      }
      switch (this.currentComponent) {
        case 'PoemListComponent':
          this.currentComponent = 'Poems';
          this.currentFa = faSearch;
          break;
        case 'MyPoemsComponent':
          this.currentComponent = 'My poems';
          this.currentFa = faScroll;
          break;
        case 'UserdetailComponent':
          this.currentComponent = 'My details';
          this.currentFa = faUserCog;
          break;
      }
    });
  }

  onLogout() {
    if (localStorage.getItem('token') != null) {
      localStorage.setItem('logout', 'true');
    } else {
      sessionStorage.removeItem('token');
    }
    this._router.navigateByUrl('/user/login');
  }

  ngOnInit(): void {
    this._userDataService.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      }
    );
  }
}
