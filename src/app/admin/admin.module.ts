import { CustomEventTitleFormatterService } from './../services/custom-event-title-formatter.service';
import { ProManagerComponent } from './../components/pro-manager/pro-manager.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';
import {DatePipe} from '@angular/common';

import { AdminPage } from './admin.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
registerLocaleData(localeIt);
import { ProfileComponent } from '../components/profile/profile.component';
import { CalendarDateFormatter, CalendarEventTitleFormatter, CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateFormatterProvider } from '../services/custom-date-formatter.service';
import { ProManagerModule } from '../components/pro-manager/pro-manager.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProManagerModule,
    AdminPageRoutingModule,
    NgCalendarModule,
    NgbModalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [AdminPage ],
  providers: [ { provide: LOCALE_ID, useValue: 'it' }, {provide: CalendarDateFormatter, useClass: CustomDateFormatterProvider}, {provide: CalendarEventTitleFormatter, useClass: CustomEventTitleFormatterService}, DatePipe]
})
export class AdminPageModule {}
