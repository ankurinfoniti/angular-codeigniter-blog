import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CmspageRoutingModule } from './cmspage-routing.module';
import { PageComponent } from './page/page.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

@NgModule({
  declarations: [PageComponent, ContactFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    CmspageRoutingModule
  ]
})
export class CmspageModule { }
