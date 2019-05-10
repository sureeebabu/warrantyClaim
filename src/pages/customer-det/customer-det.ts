import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the CustomerDetPage page. 
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-det',
  templateUrl: 'customer-det.html', 
})
export class CustomerDetPage {
	public typee:any;
	public Id:any; 
	public total: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpClient) {
  this.Id = this.navParams.get('Id');
  this.CustDet(this.Id);
  }
CustDet(Id)
{
		//alert(Id);
	let data :Observable<any>;
	data = this.http.get('http://simpsonwms.arkaautomaations.com/WarrantyAppAPI/CustDetail.php?id='+Id); 
	data.subscribe(result=>{
		//alert(result);
	this.typee = result;
	let sum = 0;
    for (var i = 0; i < this.typee.length; i++) {
        sum+= this.typee[i].invoice_quantity * this.typee[i].unit_price;
    }
	this.total = sum;
	},(error) => {
		//alert(JSON.stringify(error));
	});
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDetPage');
  }

}
