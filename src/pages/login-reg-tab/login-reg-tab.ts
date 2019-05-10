import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
/**
 * Generated class for the LoginRegTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login-reg-tab',
  templateUrl: 'login-reg-tab.html',
})
export class LoginRegTabPage {
  tab1Root = LoginPage;
  tab2Root = RegisterPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginRegTabPage');
  }

}
