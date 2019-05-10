import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { ToastController } from 'ionic-angular'
import { Sim } from '@ionic-native/sim';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';
import { App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
public MobileNumber:any;
public MobileModel:any;
public MobileSerial:any;
public FCMID:any;
public Name:any;
public Username:any;
public Password:any;
public user_id:any;
public CustCode:any;

  constructor(public navCtrl: NavController,public app: App, public navParams: NavParams, public sim: Sim, public device: Device, public http:HttpClient, private toastCtrl: ToastController, public storage:Storage) {
  	this.SimRead();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
	this.SimRead();
  }
	SimRead()
	{
		this.sim.getSimInfo().then(
		(info) => this.MobileNumber=info.phoneNumber,
		(err) => alert(JSON.stringify(err))
		);
		
		this.sim.hasReadPermission().then(
		(info) => console.log(info)
		);
		
		this.sim.requestReadPermission().then(
		() => console.log('Permission granted'),
		() => console.log('Permission denied')
		);
	this.MobileModel = this.device.model;
	this.MobileSerial = this.device.serial;
	}

Register()
{
if(this.Name==undefined)
{
this.ToastMessage("Name Should Empty..!");
return false;
}
if(this.CustCode==undefined)
{
this.ToastMessage("Customer Code Should Empty..!");
return false;
}
if(this.Username==undefined)
{
this.ToastMessage("User Name Should Empty..!");
return false;
}
if(this.Password==undefined)
{
this.ToastMessage("Password Should Empty..!");
return false;
}
 var link = 'http://simpsonwms.arkaautomaations.com/WarrantyAppAPI/Applogin.php?LGP=0';
 var myData = JSON.stringify({Username: this.Username,CustCode: this.CustCode,Password: this.Password,FCMID: this.FCMID,MobileSerial: this.MobileSerial,MobileModel: this.MobileModel,MobileNumber: this.MobileNumber,Name: this.Name});
 this.http.post(link, myData)
 .subscribe(data => {
	if(data!='')
	{
		let toast = this.toastCtrl.create({
		message: "Login Successful",
		duration: 3000,
		position: 'bottom'
		});
		toast.present();
		this.storage.set('Username',this.Username);
		this.storage.set('user_id',data[0].id);
		this.storage.set('password',data[0].password);
		this.storage.set('c_code',data[0].customer_code);
		this.storage.get('Username').then((val) => {
		if(val!='')
		{
		this.app.getRootNavs()[0].setRoot(HomePage);
		}
		});
	}
}, error => {
 console.log(error);
 });
}

ToastMessage(msg)
{
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
LoginMeth()
{
this.navCtrl.setRoot(LoginPage);
}	
}
