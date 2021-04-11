import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProManagerComponent } from './../pro-manager/pro-manager.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCalendarModule } from 'ionic2-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  exports: [
    ProManagerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    FormsModule,
    NgCalendarModule,
    NgbModalModule
  ],
  declarations: [ProManagerComponent],
  providers: [{provide: LOCALE_ID, useValue: 'it'}]
})
export class ProManagerModule {}