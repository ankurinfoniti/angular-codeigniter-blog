import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CmspageService } from '../cmspage.service';
import { Page } from '../page';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  page: Page;
  error: {};

  constructor(
    private route: ActivatedRoute,
    private cmspageService: CmspageService,
    private titleService: Title
  ) { }

  ngOnInit() {
    const title = this.route.snapshot.params.slug.charAt(0).toUpperCase() +
      this.route.snapshot.params.slug.slice(1);
    this.titleService.setTitle(title);
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.cmspageService.getPage(params.get('slug'))
      )
    ).subscribe(
      (data: Page) => this.page = data,
      error => this.error = error
    );
  }
}
