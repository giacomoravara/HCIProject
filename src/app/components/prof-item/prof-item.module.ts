import { DistancePipe } from './../../distance.pipe';
import { NgModule } from "@angular/core";
import { ProfItemComponent } from "./prof-item.component";
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProManagerComponent } from './../pro-manager/pro-manager.component';
import { CommonModule, DecimalPipe } from '@angular/common';



@NgModule({
  exports: [
    ProfItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ProfItemComponent,DistancePipe],
  providers: []
})
export class ProfItemModule {}