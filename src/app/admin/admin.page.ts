import { AppointmentService } from './../services/appointment-service';
import { ProManagerComponent } from './../components/pro-manager/pro-manager.component';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit,  ViewChild } from '@angular/core';
import { ProfessionalService } from '../services/professional-service';
import { CalendarComponent } from 'ionic2-calendar';
import { User } from '../model/user';
import { Professional } from '../model/professional';
import { Appointment } from '../model/appointment';
import * as moment from 'moment';
import { WeekViewHour, WeekViewHourColumn } from 'calendar-utils';
import {
  ChangeDetectionStrategy,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewDay,
  CalendarView,
  CalendarWeekViewBeforeRenderEvent,
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  green: {
    primary: '#006400',
    secondary: '#006400'
  }
};
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user-service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  user: User;
  activePage : string;
  selectedProf: Professional;
  selectedAppo: Appointment;
  appoDate : string;
  appoORA : string;
  favClicked: boolean;
  composedEvents: any = [];
  view: CalendarView = CalendarView.Day;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  dayStartHour: number = 9;
  dayEndHour: number = 19;
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  userEvents: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;
  professional: Professional;
  loading = false;
  selectedDate: Date;
  appointments: Appointment[];
  
  locale: string='it';

  selectedMonthViewDay: CalendarMonthViewDay;

  selectedDayViewDate: Date;

  hourColumns: WeekViewHourColumn[];

  selectedDays: any = [];

  excludeDays: number[] = [0];



  actions: CalendarEventAction[] = [
    {
      label: ' Modifica  ',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log("pippo");
        
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '  Cancella  ',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        //this.events = this.events.filter((iEvent) => iEvent !== event);
        //this.handleEvent('Deleted', event);
        this.deleteEvent(event);
        console.log("pippo-io");
      },
    },
  ];

 
    constructor(
      private modal: NgbModal, private appoService: AppointmentService, private proService: ProfessionalService,
      private modC: ModalController, private appointmentService: AppointmentService,
      private userService: UserService, private router: Router, private auth: AuthService, 
      private professionalService: ProfessionalService, private modalCtrl: ModalController){}


  
       ngOnInit(): void{
        this.auth.user.subscribe(res => {
          this.professional = res.logged;
          this.appointments = res.logged.appointments;
          console.log("APPUNTAMENTI", this.appointments);
          this.appointments.forEach(data => {
          this.events = [
            ...this.events,
            {
              title: "Cliente: " +data.user.firstName + " " + data.user.lastName,
              start: new Date(data.start),
              end: new Date(data.finish),
              color: colors.green,
              cssClass: 'event-color',
              draggable: false,
              resizable: {
                beforeStart: false,
                afterEnd: false,
              },
            },
           ];
           }
        )});
        console.log(this.userEvents);
        this.selectedDate = new Date(moment.now());
        this.selectedAppo = new Appointment();
      }

    

      ngAfterViewInit(){}
 
    
      async signOut(){
      await this.auth.signOn();
      this.router.navigateByUrl('/', {replaceUrl: true});
      }


      async addModalEvent(){
        const modal = await this.modalCtrl.create({
          component: ProManagerComponent,
          componentProps: {adminPage: true, professional: this.professional, selectedDate: this.selectedDate.getHours() < 20 &&  this.selectedDate.getHours() > 9 || (new Date().getHours()<20 && new Date().getHours()>9) ? moment(this.selectedDate, "DD/MM/YYYY hh:mm").format() : moment(new Date(new Date().setHours(9)), "DD/MM/YYYY hh:mm").format()}
        })
        modal.onDidDismiss().then((data) => {
          if(data.data!=null){
          this.addEvent(data.data);
          };
        });
        await modal.present();
      }

      selectedTime(event){
        this.selectedDate = event;
        console.log(event);
      }

  
      

      dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
          if (
            (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
            events.length === 0
          ) {
            this.activeDayIsOpen = false;
          } else {
            this.activeDayIsOpen = true;
          }
          this.viewDate = date;
        }
      }

 
  async handleEvent(action: string, event: CalendarEvent){
    console.log(moment(event.start, "DD/MM/YYYY hh:mm").format());
    console.log(this.appointments);
    this.appointments.filter( x => {
      if(x.start === moment(event.start, "DD/MM/YYYY hh:mm").format() && x.finish === moment(event.end, "DD/MM/YYYY hh:mm").format() && ("Cliente: " + x.user.firstName + " " + x.user.lastName)){
        console.log(x);
        this.selectedAppo = x;
        console.log("Selected Appointment", this.selectedAppo);

      }
    })

    const modal = await this.modC.create({
      component: ProManagerComponent,
      componentProps:{
        selectedAppo: this.selectedAppo, selectedDate: this.selectedAppo.start, professional: this.professional},
      cssClass: 'cal-modal'
    });
     modal.onDidDismiss().then((data) => {
       if(data.data.user === null) this.deleteEvent(event);
       else {
      this.auth.user.subscribe(res => {
        this.professional = res.logged;
        this.appointments = res.logged.appointments;
        console.log("APPUNTAMENTI", this.appointments);
        this.appointments.forEach(value => {
        this.events = this.events.map((iEvent) => {
          if (iEvent === event) {
              return {
             ...event,
             title: "Cliente: " + value.user.firstName + " " + value.user.lastName,
             start: new Date(value.start),
             end: new Date(value.finish),
            };
      }
      return iEvent;
    });
      })
      });
    }
  
    });
    return await modal.present();
  }

  addEvent(data: Appointment): void {
    this.events = [
      ...this.events,
      {
        title: "Cliente: " + data.user.firstName + " " + data.user.lastName,
        
        start: new Date(data.start),
        end: new Date(data.finish),
        color: colors.green,
        cssClass: 'event-color',
        draggable: false,
        resizable: {
          beforeStart: false,
          afterEnd: false,
        },
      },
     ];
     this.appointments.push(data);
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
    let index;
    this.appointments.filter((x) => {
      x.start === eventToDelete.start.toISOString()
      index = x.id;
    })
    this.appointmentService.deleteAppointment(index).subscribe(res => {
      res => console.log(res);
    })
    //this.selectedProf.appointments = this.selectedProf.appointments.filter();
  }

    
  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  deleteAppo(id: number){
    this.appoService.deleteAppointment(id);
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      if (
        this.selectedDays.some(
          (selectedDay) => selectedDay.date.getTime() === day.date.getTime()
        )
      ) {
        day.cssClass = 'cal-day-selected';
      }
    });
  }
  
  hourSegmentClicked(date: Date) {
    this.selectedDayViewDate = date;
    this.selectedDate = date;
    this.addSelectedDayViewClass();
  }

  beforeWeekOrDayViewRender(event: CalendarWeekViewBeforeRenderEvent) {
    this.hourColumns = event.hourColumns;
    this.addSelectedDayViewClass();
  }

  private addSelectedDayViewClass() {
    this.hourColumns.forEach((column) => {
      column.hours.forEach((hourSegment) => {
        hourSegment.segments.forEach((segment) => {
          delete segment.cssClass;
          if (
            this.selectedDayViewDate &&
            segment.date.getTime() === this.selectedDayViewDate.getTime()
          ) {
            segment.cssClass = 'cal-day-selected';
          }
        });
      });
    });
  }
 
}