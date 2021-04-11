import { AlertController } from '@ionic/angular';
import { AppointmentService } from '../services/appointment-service';
import { UserService } from '../services/user-service';
import { ProfessionalService } from '../services/professional-service';
import { User } from '../model/user';
import { Professional } from '../model/professional';
import { ServiceTypeService } from '../services/service-type.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import { ServiceType } from '../model/service-type';
import * as AOS from 'aos';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    user = {
      email: "",
      pw: ""
    }
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthService,
        private professionalService: ProfessionalService,
        private userService: UserService,
        private appointmentService: AppointmentService,
        private serviceTypeService: ServiceTypeService,
        private alert: AlertController
    ) { 
    

    }

    ngOnInit() {
      AOS.init();
      this.loading = false;
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });


    }

    signIn(){
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
       this.auth.signIn(this.user).subscribe((user) => {
        console.log(user);
        if(user === null){ 
        this.loading = false;
        this.presentAlertMultipleButtons();
        }
        else {
        console.log('after login: ', user);
        let role = user['role'];
        if( role === 'ADMIN') {
          console.log(role);
          this.router.navigateByUrl('/admin');
          this.loading = false;
        } else if ( role === 'USER') {
          this.router.navigateByUrl('/user');
          this.loading = false;
        }
      }
      });
    }

    async presentAlertMultipleButtons() {
      const alert = await this.alert.create({
        header: 'Attenzione',
        message: 'Utente inesistente o password non corretta',
        buttons: ['Cancel']
      });
  
      await alert.present();
    }
    get f() { return this.loginForm.controls; }




  
}
