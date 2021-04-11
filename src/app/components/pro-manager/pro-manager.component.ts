import { UserService } from '../../services/user-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from '../../model/appointment';

import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AppointmentService } from '../../services/appointment-service';
import { Professional } from '../../model/professional';
import { ProfessionalService } from '../../services/professional-service';
import { User } from 'src/app/model/user';
import { ServiceType } from '../../model/service-type';
import * as moment from 'moment';


@Component({
  selector: 'app-pro-manager',
  templateUrl: './pro-manager.component.html',
  styleUrls: ['./pro-manager.component.scss'],
})
export class ProManagerComponent implements OnInit {
  
  adminPage: boolean;
  edit: boolean = false;
  professional: Professional;
  date: string = new Date().toISOString();
  totDuration: number = 0;
  formGroup: FormGroup;
  appointment: Appointment;
  minDate: string = new Date().toISOString();
  selectedDate: string = new Date().toISOString();
  selectedServ: ServiceType[] = [];
  servState: boolean[]=[];
  selectedAppo: Appointment;
  user: User;
  hourValues = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

  ngOnInit(){
    console.log(this.selectedAppo);
    console.log(this.professional);
    console.log(this.date);
    console.log(this.user, "Sono l'utente invisibile")
    /*this.professional.services.forEach(x => {
      this.servState.push(false);
    
    }
      )*/
    this.appointment = new Appointment();
    if(!this.selectedAppo){
    this.formGroup = this.fb.group({
        firstName: [this.user? this.user.firstName:"", Validators.required],
        lastName: [this.user? this.user.lastName:"", Validators.required],
        mail: [this.user? this.user.email:"", [Validators.email]  ],
        phone: [this.user? this.user.phone:"", [Validators.required, Validators.pattern('[- +()0-9]+')
      ]],
        notes: [''],
    })
    this.professional.services.forEach((x,i) =>{
      this.selectedServ.forEach(y =>{
        if(x.name===y.name){
          this.servState[i]= true;
        }
      })
    })
  }
    else {
      this.formGroup = this.fb.group({
        firstName: [this.selectedAppo.user.firstName, Validators.required],
        lastName: [this.selectedAppo.user.lastName, Validators.required],
        mail: [this.selectedAppo.user.email],
        phone: [this.selectedAppo.user.phone, Validators.required],
        notes: [this.selectedAppo.notes],
      })
      this.selectedDate = this.selectedAppo.start
      this.selectedServ = this.selectedAppo.services;
      this.professional.services.forEach((x,i) =>{
        this.selectedAppo.services.forEach(y =>{
          if(x.name===y.name){
            this.servState[i]= true;
          }
        })
      })

    }
   // this.selectedDate = moment(new Date(), "DD/MM/YYYT hh:mm").toDate();
   // this.minDate = moment(new Date(), "DD/MM/YYYT hh:mm").toDate();

  }

  constructor(private alert: AlertController, private modalCtrl: ModalController, private userService: UserService, private appointmentService: AppointmentService, professionalService: ProfessionalService, private fb: FormBuilder){}

  dismissModal(){
    this.selectedServ = [];
    this.selectedAppo = null;
    this.modalCtrl.dismiss(this.appointment);
    this.edit = false;
  }

  try(){
    if(this.selectedServ.length === 0){
      this.presentAlert();
    } else {
      this.addEvent();
    }
  }

  addEvent(){
    //this.selectedServ.forEach(x => this.totDuration = this.totDuration + x.duration);
    
    this.servState.forEach((x,i)=> {if(x){this.totDuration=this.totDuration + this.professional.services[i].duration}})
    if(!this.selectedAppo && this.user){
      console.log("caso1");
      console.log("PIPPOOOOO", this.user )
      
      let app: Appointment = new Appointment();
      app.start = moment(this.selectedDate.toString()).format();
      app.notes = this.formGroup.value.notes;
      console.log("Durata totale", this.totDuration);
      app.finish = moment(app.start).add(this.totDuration, 'm').format();
      app.services = this.selectedServ;
      app.user = this.user;
      app.professional = this.professional;
      console.log(app.user);
      this.appointmentService.createAppointment(app).subscribe((res : Appointment) => {
        this.appointment = res;
        this.dismissModal();
        }); 
    }
    else if(!this.selectedAppo && !this.user){
      console.log("caso2");
      let app: Appointment = new Appointment();
      let user: User = new User();
      user.firstName = this.formGroup.value.firstName;
      user.lastName = this.formGroup.value.lastName;
      user.phone = this.formGroup.value.phone;
      user.email = this.formGroup.value.mail;
    
      app.start = moment(this.selectedDate.toString()).format();
      app.notes = this.formGroup.value.notes;
      console.log("Durata totale", this.totDuration);
      app.finish = moment(app.start).add(this.totDuration, 'm').format();
      app.services = this.selectedServ;
      // viene stampato il nome e cognome
      this.userService.createUser(user).subscribe((res: User) => {
        console.log(res);
        app.user = res;
        app.professional = this.professional;
        console.log(app.user);
        this.appointmentService.createAppointment(app).subscribe((res : Appointment) => {
          this.appointment = res;
          this.dismissModal();
        });
      })
    }
    else{
      console.log("caso3");
      this.selectedAppo.user.firstName = this.formGroup.value.firstName;
      this.selectedAppo.user.lastName = this.formGroup.value.lastName;
      this.selectedAppo.user.phone = this.formGroup.value.phone;
      this.selectedAppo.user.email = this.formGroup.value.mail;
      this.selectedAppo.notes = this.formGroup.value.notes;
      this.selectedAppo.start = moment(this.selectedDate.toString()).format();
      //this.servState.forEach((x,i)=> {if(x){this.totDuration=this.totDuration + this.professional.services[i].duration}})
      console.log("Durata totale", this.totDuration);
      this.selectedAppo.finish = moment(this.selectedAppo.start).add(this.totDuration, 'm').format();
      this.selectedAppo.services = this.selectedServ;

      this.userService.updateUser(this.selectedAppo.user.id, this.selectedAppo.user).subscribe((res: User) => {
        console.log(res);
        this.selectedAppo.user = res;
        console.log(this.selectedAppo.user);
        this.appointmentService.updateAppointment(this.selectedAppo.id, this.selectedAppo).subscribe((res : Appointment) => {
          this.appointment = res;
        
          this.dismissModal();
        });
      })

    }
    // console.log(app.finish);

  }

  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Attenzione',
      message: 'Non hai inserito nessun servizio',
      buttons: ['Cancel']
    });

    await alert.present();
  }


  isSelected(event, serv){

    if(event.detail.checked === true){
      this.professional.services.forEach((x,i) =>{
          if(x.name===serv.name){
            this.servState[i]= true;
          }
        
      })
      console.log(this.servState)
      let found = false;
      this.selectedServ.push(serv);
      //this.totDuration = this.totDuration + serv.duration;
    }
    else {
      this.professional.services.forEach((x,i) =>{
        if(x.name===serv.name){
          this.servState[i]= false;
        }
      
      })
      this.selectedServ.filter((res, i) => {
        if(res.name === serv.name){
          this.selectedServ.splice(i, 1);
          //this.totDuration = this.totDuration - serv.duration;
         // console.log(totD)

        }
      })
    }

  }

  deleteEvent(){
    if(confirm("Sicuro di eliminare la prenotazione?"))
    this.appointmentService.deleteAppointment(this.selectedAppo.id).subscribe( res => {
      this.appointment.user = null;
      this.dismissModal();
    })
  }
  
}
