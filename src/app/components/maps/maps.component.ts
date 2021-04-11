import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { IonContent, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  lat;
  lng;
  zoom = 1;
  selectedPlace: string;
  @Output('search') search : EventEmitter<string> = new EventEmitter<string>();

  @Output('place') place : EventEmitter<string> = new EventEmitter<string>();
  @Output('coordinates') coordinates : EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output('back') back : EventEmitter<number[]> = new EventEmitter<number[]>();

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private alert: AlertController) { }

  ngOnInit() {
    
    this.mapsAPILoader.load().then(() => { 
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
          //get the place result
          const placeInfo: google.maps.places.PlaceResult = autocomplete.getPlace();
          if(!placeInfo){
            this.presentAlertMultipleButtons();
            return;
          }
          this.selectedPlace = placeInfo.formatted_address;
          this.place.emit(placeInfo.name);
          console.log(placeInfo);
          //verify result
          if (placeInfo.geometry === undefined || placeInfo.geometry === null) {
            return;
          }
  
          //set latitude, longitude and zoom
          this.lat = placeInfo.geometry.location.lat();
          this.lng = placeInfo.geometry.location.lng();
          this.zoom = 12;
        }); 
      });
    });
  }

  createList(){
  this.search.emit("go");
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alert.create({
      header: 'Attenzione',
      message: 'Inserire una località valida',
      buttons: ['Cancel']
    });

    await alert.present();
  }

  
getCurrentPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.coordinates.emit([position.coords.latitude, position.coords.longitude]);
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      }
     )} else {
      alert("We can't geolocalize you! Sorry!!")
    }
}

goBackToServices(){
  this.back.emit();
}

}
