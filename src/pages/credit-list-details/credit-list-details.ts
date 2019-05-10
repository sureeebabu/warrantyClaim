import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the CreditListDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-credit-list-details',
  templateUrl: 'credit-list-details.html',
})
export class CreditListDetailsPage {

	public Id:any; 
	public CDDL:any;
	public MaterialCode:any;
	public MaterialName:any;
	public MaterialQty:any;
	public MaterialWarrenty:any;
	public MaterialUpload:any;
	public MaterialFile:any;
	public MaterialClaim:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpClient) {
	this.Id = this.navParams.get('CDDL');
	this.CreditDetails(this.Id);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreditListDetailsPage');
  }
CreditDetails(CDDL)
{
	let data :Observable<any>;
	data = this.http.get('http://www.arkaautomaations.com/arkaWMS/WarrentyList.php?CDDL='+CDDL); 
	data.subscribe(result=>{
		this.MaterialCode = result[0].item_code;
		this.MaterialName = result[0].item_name;
		this.MaterialQty = result[0].item_qty;
		this.MaterialWarrenty = result[0].warrenty_type;
		this.MaterialUpload = result[0].upload_option;
		this.MaterialFile = result[0].file_name;
		if(result[0].claim_status==0)
		{
			this.MaterialClaim = 'Pending';
		}
		if(result[0].claim_status==1)
		{
			this.MaterialClaim = 'Processing';
		}
		if(result[0].claim_status==2)
		{
			this.MaterialClaim = 'Partially Completed';			
		}
		if(result[0].claim_status==3)
		{
			this.MaterialClaim = 'Completed';
		}			
	})
} 
}
