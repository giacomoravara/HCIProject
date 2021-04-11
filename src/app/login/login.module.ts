import { IonicStorageModule } from '@ionic/storage-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(
      {
        name: 'offlinedb',
        driverOrder: ['sqlite', 'indexeddb', 'websql']
      }
    ),
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage],
  providers: [Storage]
})
export class LoginPageModule {}
