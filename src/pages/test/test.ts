import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';


import { CustomerDetPage } from '../customer-det/customer-det';
/*import { CustomerEditPage } from '../customer-edit/customer-edit';
import { CustomerCreatePage } from '../customer-create/customer-create';*/


/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
	public typee:any;
	public c_code:any;
	public ToggSearch :boolean;
	public TogCan :boolean;	

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpClient, public storage: Storage) {
	
  }
	
	loadData()
	{
	let data :Observable<any>;
	this.storage.get('c_code').then((val) => {
	//alert(val);
	this.c_code=val;
	data = this.http.get('http://simpsonwms.arkaautomaations.com/WarrantyAppAPI/list_api.php?c_code='+this.c_code);
	data.subscribe(result=>{
	//alert(JSON.stringify(result));
	this.typee=result;
	if(this.typee=='')
	{
	this.typee=false;
	}	
	})
	});
	}

	ViewClick(Id)
	{
	this.navCtrl.push(CustomerDetPage,{Id: Id});
	}

	ionViewDidLoad() {
	this.loadData();
    console.log('ionViewDidLoad TestPage');
  }
 getItems(ev) {
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.typee = this.typee.filter((item) => {
        //return item.invoice_no.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.invoice_date.toLowerCase().indexOf(val.toLowerCase()) > -1;
		return item.invoice_no.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    }
	else
	{
	this.loadData();
	}
  }
}
