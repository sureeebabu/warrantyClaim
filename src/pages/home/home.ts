import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, Platform } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { TestPage } from '../test/test'; 
import { BarcodePage } from '../barcode/barcode'; 
import { Network } from '@ionic-native/network';
import { WarrantyMasterPage } from '../warranty-master/warranty-master';
import { CreditListPage } from '../credit-list/credit-list';
import { AuthenticPage } from '../authentic/authentic';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
Status:any='';
data:any = {};
public nation:any;
public disconnectSubscription:any;
  constructor(public navCtrl: NavController,  public navParams: NavParams, public http:HttpClient, public platform:Platform, public alertCtrl: AlertController, public network: Network) {
  this.platform = platform;
}


  listInvoice(){
   	this.nation= TestPage;
	this.PageNation();
	}

  listWarrantyRequest() {
  	this.nation= WarrantyMasterPage;
	this.PageNation();
  }

  WarrantyRequestPage() {
  	this.nation= BarcodePage;
	this.PageNation();
  }

  listCreditNotePage() {
  	this.nation= CreditListPage;
	this.PageNation();	
  }
  
  listAuthenticPage() {
  	this.nation= AuthenticPage;
	this.PageNation();	
  }  
  ionViewDidEnter()
  {
	this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
		let altsuccess = this.alertCtrl.create({
		title: 'Alert',
		message: 'Network is disconnected..!',
		buttons: [
		{
		text: 'OK',
		handler: () => 
		{
		this.navCtrl.setRoot(HomePage);
		this.platform.exitApp();
		}
		}
		]
		});
		altsuccess.present();
		this.disconnectSubscription.unsubscribe();
		
		});

}
PageNation()
{
if(this.network.type=='none')
{
		let altsuccess = this.alertCtrl.create({
		title: 'Alert',
		message: 'Network is disconnected..!',
		buttons: [
		{
		text: 'OK',
		handler: () => 
		{
		this.navCtrl.setRoot(HomePage);
		this.platform.exitApp();
		}
		}
		]
		});
		altsuccess.present();
		

}
else
{
this.navCtrl.push(this.nation);
}
}
ionViewWillLeave(){
this.disconnectSubscription.unsubscribe();
}
}
