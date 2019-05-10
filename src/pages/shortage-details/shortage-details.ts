import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the ShortageDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-shortage-details',
  templateUrl: 'shortage-details.html',
})
export class ShortageDetailsPage {
	public Id:any; 
	public SDid:any;
	public MaterialCode:any;
	public MaterialName:any;
	public MaterialQty:any;
	public MaterialWarrenty:any;
	public MaterialUpload:any;
	public MaterialFile:any;
	public MaterialClaim:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpClient) {
	this.Id = this.navParams.get('SDid');
	this.ShortageDetails(this.Id);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShortageDetailsPage');
  }
ShortageDetails(SDid)
{
	let data :Observable<any>;
	data = this.http.get('http://www.arkaautomaations.com/arkaWMS/WarrentyList.php?SDid='+SDid); 
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
