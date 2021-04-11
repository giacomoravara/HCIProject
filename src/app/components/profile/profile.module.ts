import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {DatePipe} from '@angular/common';
import { NgCalendarModule } from 'ionic2-calendar';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
registerLocaleData(localeIt);
import { ProfileComponent } from '../profile/profile.component';
import { CalendarDateFormatter, CalendarEventTitleFormatter, CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateFormatterProvider } from '../../services/custom-date-formatter.service';
import { CustomEventTitleFormatterService } from 'src/app/services/custom-event-title-formatter.service';

@NgModule({
  exports: [ ProfileComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    NgCalendarModule,
    NgbModalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [ProfileComponent],
  providers: [ { provide: LOCALE_ID, useValue: 'it' }, { provide: CalendarDateFormatter, useClass: CustomDateFormatterProvider }, { provide: CalendarEventTitleFormatter, useClass: CustomEventTitleFormatterService }, DatePipe]
})
export class ProfileModule {}