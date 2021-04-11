import { UserService } from './../../services/user-service';
import { AuthService } from './../../services/auth.service';
import { AppointmentService } from './../../services/appointment-service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Professional } from '../../model/professional';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { ServiceType } from '../../model/service-type';
import { ModalController } from '@ionic/angular';

import { CalendarComponent } from 'ionic2-calendar';
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
import { Appointment } from 'src/app/model/appointment';
import { ProManagerComponent } from '../pro-manager/pro-manager.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  favClicked : boolean = false;

  @Input() pro: Professional;
  @Input() user : User;
  @Input() PreSelectedServices: ServiceType[]
  @Output() insert = new EventEmitter();
  @Output() backToMain = new EventEmitter();
  @Input() selectedAppo: Appointment;

  serviziSelezionati: ServiceType[] = []
  servState: boolean[]=[];

  activePage : string;
  composedEvents: any = [];
  view: CalendarView = CalendarView.Day;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  dayStartHour: number = 9;
  dayEndHour: number = 19;
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  userEvents: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;
  loading = false;
  selectedDate: Date;
  appointments: Appointment[];
  locale: string='it';
  ComposedData: {
    appo: Appointment,
    event: CalendarEvent
  } = {appo : new Appointment(), event: null}
  selectedMonthViewDay: CalendarMonthViewDay;
  selectedDayViewDate: Date;
  hourColumns: WeekViewHourColumn[];
  selectedDays: any = [];
  excludeDays: number[] = [0];
  actions: CalendarEventAction[] = [
    {
      //label: ' Modifica  ',
      label: '',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {

       
        this.handleEvent(new Date());
      },
    }
  ];

//fine dati calendario


  constructor(private userService: UserService, private router: Router, private auth: AuthService, private modCtr: ModalController,private modC: ModalController, private appointmentService: AppointmentService) { 
  }

  ngOnInit() {
    if(!this.selectedAppo){
    this.activePage="mainP";

    }
  
  else{
    this.activePage = "calendar";
    this.serviziSelezionati = this.selectedAppo.services;
  }
    let index = this.user.favorites.findIndex(parr => parr.name == this.pro.name)
    if (index > -1){
      this.favClicked = true;
    }
      console.log(this.PreSelectedServices);
      this.PreSelectedServices.forEach(res=> {
        this.serviziSelezionati.push(res);
      })
      this.pro.services.forEach((x,i) =>{
        this.serviziSelezionati.forEach(y =>{
          if(x.name===y.name){
            this.servState[i]= true;
          }
        })
      })

    this.user.appointments.forEach( res=>{
      this.userEvents.push({title:'Appuntamento da: ' + res.professional.name, start: moment(res.start).toDate(), end: moment(res.finish).toDate(), color: colors.yellow,  
       actions: this.actions})
    });

    var eventsAdded = []
    this.pro.appointments = this.pro.appointments.length > 0? this.pro.appointments : []; 
    this.pro.appointments.forEach( res=> {
      if(res.user!=this.user){
      eventsAdded.push({title:'Occupato', start: moment(res.start).toDate(), end: moment(res.finish).toDate() , color: colors.red})
      }
    })
   
    eventsAdded = eventsAdded.concat(this.userEvents)
    this.events = eventsAdded

  }

  addToFav(){
    if (this.favClicked === false){
      this.favClicked = true;
      this.user.favorites.push(this.pro);
      this.userService.updateUser(this.user.id, this.user).subscribe((res: User) => {
        console.log(res.favorites);

      })
    } else { 
      //document.getElementById("stella").style.fill = "white";
      this.favClicked = false;
      let index = this.user.favorites.findIndex(parr => parr.name == this.pro.name)
      this.user.favorites.splice(index,1)
      console.log(this.user.favorites);
    }

  }

  isSelected(event, serv: ServiceType){
    if(event.detail.checked === true){
      this.pro.services.forEach((x,i) =>{
          if(x===serv){
            this.servState[i]= true;
          }
        
      })
      console.log(this.servState)
      let found = false;
      this.serviziSelezionati.push(serv);
      //this.totDuration = this.totDuration + serv.duration;
    }
    else {
      this.pro.services.forEach((x,i) =>{
        if(x===serv){
          this.servState[i]= false;
        }
      
      })
      this.serviziSelezionati.filter((res, i) => {
        if(res === serv){
          this.serviziSelezionati.splice(i, 1);
          //this.totDuration = this.totDuration - serv.duration;
         // console.log(totD)

        }
      })
  }}


  goBack(){
    this.insert.emit(false);
  }

  sceltaOrario(){
    this.activePage = "orario";
  }

  goBackToProfile(){
    this.activePage = "mainP";
  }

  showCalendar(){
    this.activePage = "calendar";
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

  async handleEvent(date: Date){
    const modal = await this.modC.create({
      component: ProManagerComponent,
      componentProps:{
        selectedAppo: this.selectedAppo, selectedDate: moment(date).format(), professional: this.pro, selectedServ: this.serviziSelezionati},
        cssClass: 'cal-modal'
    });
    
      modal.onDidDismiss().then((data) => {
        console.log("Arrivato!")
        this.router.navigateByUrl('/user/tab3');
        //this.backToMain.emit();
        this.insert.emit()
    });
    return await modal.present();
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

deleteAppo(id: number){
  this.appointmentService.deleteAppointment(id);
}



setView(view: CalendarView) {
this.view = view;
}

closeOpenMonthViewDay() {
this.activeDayIsOpen = false;
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
  if(this.selectedAppo){
    this.handleEvent(date);
  }
  else {
    this.openModal(date);
  }
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

async openModal(date: Date){
  const modal = await this.modC.create({
    component: ProManagerComponent,
    componentProps:{
      selectedDate: date.toISOString(), professional: this.pro, user: this.user, selectedServ: this.serviziSelezionati},
      cssClass: 'component-modal'
  });
  modal.onDidDismiss().then((data) => {
    console.log("Arrivato da openModal")
    this.router.navigateByUrl('/user/tab3');
    this.backToMain.emit();

});
return await modal.present();
}



}
