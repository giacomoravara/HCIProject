import { ServiceType } from './../../model/service-type';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Professional } from 'src/app/model/professional';

@Component({
  selector: 'app-prof-item',
  templateUrl: './prof-item.component.html',
  styleUrls: ['./prof-item.component.scss'],
})
export class ProfItemComponent implements OnInit {
  @Input() professional: Professional;
  @Input() service: ServiceType;
  price: number = 0;

  @Output() openAppointment : EventEmitter<any> = new EventEmitter<any>();
  @Output() removePref : EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    if(this.service){
    this.professional.services.forEach(res => {if(this.service.name === res.name) {this.price = res.price}})
    }
  }

  remove(event){
    this.removePref.emit(event)

  }
  openPrenotazione(event){
    this.openAppointment.emit(event);
  }
}
