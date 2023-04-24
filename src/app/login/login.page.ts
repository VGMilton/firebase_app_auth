import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb:FormBuilder,
    private alertCotroller:AlertController,
    private authService:AuthService,
    private router:Router,
    private loading:LoadingController) {
      this.credentials = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }

    get email(){
      return this.credentials.get('email');
    }

    get password(){
      return this.credentials.get('password');
    }

  ngOnInit() {}

  async register(){
    const load = await this.loading.create();
    load.present();
    try {
      const user = await this.authService.register(this.credentials.value);
      if(!user){
        load.dismiss();
        this.showAlert('Registration Failed','Please try again!');
      }
    } catch (error) {
      load.dismiss();
      this.showAlert('Registration Failed','Please try again!');
    }
    this.router.navigateByUrl('/home',{replaceUrl:true});
    this.credentials.reset();
    load.dismiss();

  }

  async login(){
    const load = await this.loading.create();
    load.present();
    try {
      const user = await this.authService.login(this.credentials.value);
      if(!user){
        load.dismiss();
        this.showAlert('Login Failed','Please try again!');
      }
    } catch (error) {
      load.dismiss();
      this.showAlert('Login Failed','Please try again!');
    }
    this.router.navigateByUrl('/home',{replaceUrl:true});
    this.credentials.reset();
    load.dismiss();

  }

  async showAlert(head: string,msg: string){
    const alert = await this.alertCotroller.create({
      header:head,
      message:msg,
      buttons:['OK'],
    });
    await alert.present();
  }
}
