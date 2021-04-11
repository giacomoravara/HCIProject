import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  
  constructor(private router: Router, private auth: AuthService, private alert: AlertController){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const expectedRole = route.data.role;
      console.log('expected', expectedRole);
      return this.auth.user.pipe(
        take(1),
        map(user => {
          console.log('log:', user);
          if (user){
            let role = user['role'];
            if ( expectedRole == role){
              return true;
            } else {
              this.showAlert();
              return this.router.parseUrl('/login');
            }
          } else {
            this.showAlert();
            return this.router.parseUrl('/login');
          }
        })
      )
  }

  async showAlert() {
    let alert= await this.alert.create({
      header: 'Unauthorizeed',
      message: 'You are not authorized to visit the page!',
      buttons: ['OK']
    });
    alert.present();
  }
  
}
