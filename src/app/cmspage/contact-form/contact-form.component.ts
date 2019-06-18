import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Contact } from '../contact';
import { CmspageService } from '../cmspage.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  title = 'Contact Us';
  model = new Contact();
  submitted = false;
  error = {};
  success = {};

  constructor(
    private router: Router,
    private cmspageService: CmspageService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

  onSubmit() {
    this.submitted = true;
    return this.cmspageService.contactForm(this.model).subscribe(
      data => this.success = data,
      error => this.error = error
    );
  }

  gotoHome() {
    this.router.navigate(['/']);
  }
}
