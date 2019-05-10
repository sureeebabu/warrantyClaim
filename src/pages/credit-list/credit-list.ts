import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import { CreditListDetailsPage } from '../credit-list-details/credit-list-details';
/**
 * Generated class for the CreditListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-credit-list',
  templateUrl: 'credit-list.html',
})
export class CreditListPage {

	public typee:any;
	public Id:any; 
	public Uid:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpClient , public storage: Storage) {
  this.CreditDetList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreditListPage');
  }
CreditDetList()
{
this.storage.get('c_code').then((val) => {
if(val!='')
{
	let data :Observable<any>;
	data = this.http.get('http://simpsonwms.arkaautomaations.com/WarrantyAppAPI/WarrentyList.php?CDL=1&ccode='+val); 
	data.subscribe(result=>{
	this.typee = result;
	if(this.typee=='')
	{
	this.typee=false;
	}
	})
}
});	
}
ViewCreditDet(Id)
{
this.navCtrl.push(CreditListDetailsPage,{CDDL:Id});
}
}
