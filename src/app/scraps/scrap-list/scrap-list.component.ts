import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Scrap } from '../scrap.model';
import { ScrapsService } from '../scraps.service';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-scrap-list',
  templateUrl: './scrap-list.component.html',
  styleUrls: ['./scrap-list.component.css']
})

export class ScrapListComponent implements OnInit, OnDestroy {

  scraps: Scrap[] = [];
  isLoading = false;
  totoalScraps = 0;
  scrapsPerPage = 200;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10, 50, 100, 150, 200];
  userIsAuth = false;
  userId: string;
  private scrapsSub: Subscription;
  private authStateusSub: Subscription;
  searchStr: string;

  constructor(public scrapsService: ScrapsService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.scrapsService.getScraps(this.scrapsPerPage, 1);
    this.userId = this.authService.getUserId();
    this.scrapsSub = this.scrapsService.getScrapUpdateListener()
      .subscribe((scrapData: { scraps: Scrap[], scrapCount: number }) => {
        this.isLoading = false;
        this.totoalScraps = scrapData.scrapCount;
        this.scraps = scrapData.scraps;
      });
    this.userIsAuth = this.authService.getIsAuth();
    this.authStateusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuth = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.scrapsPerPage = pageData.pageSize;
    this.scrapsService.getScraps(this.scrapsPerPage, this.currentPage);
  }

  // onDelete(scrapId: string) {
  //  this.isLoading = true;
  //  this.scrapsService.deleteScrap(scrapId).subscribe(() => {
  //    this.scrapsService.getScraps(this.scrapsPerPage, this.currentPage);
  //  });
  // }

  ngOnDestroy() {
    this.scrapsSub.unsubscribe();
    this.authStateusSub.unsubscribe();
  }



}
