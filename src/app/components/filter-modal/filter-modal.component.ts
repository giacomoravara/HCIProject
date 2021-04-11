import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }
  minValue = "1 KM"
  maxValue = "50 KM"

  distance: number;
  ngOnInit() {}


  changeRange(){
    // this.distance=value;
    // console.log("DISTANCE", value)
    // this.dismissModal();
  }

  dismissModal(){
    this.modalCtrl.dismiss(this.distance);

  }
}
