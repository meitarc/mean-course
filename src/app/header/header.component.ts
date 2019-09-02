import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuth = false;
  private authListenerSubs: Subscription;
  constructor(private authService: AuthService) { }
  admin = 'meitarc';
  username = '';
  isAdmin = false;
  ngOnInit() {
    this.userIsAuth = this.authService.getIsAuth();

    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe((isAuhenticated) => {
      this.userIsAuth = isAuhenticated;
      this.checkAdmin();
    });

    this.checkAdmin();
  }
  checkAdmin() {
    this.username = this.authService.getUserName();
    if (this.admin === this.username) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
  onChangePage(pageData: PageEvent) {
    this.checkAdmin();
  }
  onLogout() {
    this.authService.logout();
    this.username = '';
    this.isAdmin = false;
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
    this.username = '';
    this.isAdmin = false;

  }
}
