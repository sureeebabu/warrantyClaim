import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

import { FileuploadPage } from '../fileupload/fileupload';
import { ReviewDetailsPage } from '../review-details/review-details';
/**
 * Generated class for the CreditTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const MEDIA_FILES_KEY = 'mediaFiles';

@Component({
  selector: 'page-credit-tabs',
  templateUrl: 'credit-tabs.html',
})
export class CreditTabsPage {

	public Mid:any;
	public typee:any;
	public Id:any; 
	public Uid:any;
	public Custcode:any;
	public Sid:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http:HttpClient) {
	this.Mid = this.navParams.get('Mid');
	this.CteditListList(this.Mid);
	this.storage.set(MEDIA_FILES_KEY,'');
	localStorage.removeItem('audiolist');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreditTabsPage');
  }
CteditListList(Sid)
{
this.storage.get('c_code').then((val) => {
if(val!='')
{
	let data :Observable<any>;
	data = this.http.get('http://simpsonwms.arkaautomaations.com/WarrantyAppAPI/WarrentyList.php?Sid='+Sid+'&c_code='+val); 
	data.subscribe(result=>{
	this.typee = result;
	})
}
});	
}

ViewData(Vid,SValue)
{
	this.navCtrl.push(ReviewDetailsPage,{Vid:Vid,Svalue:SValue});
}
UploadData(Uid)
{
	this.navCtrl.push(FileuploadPage,{Uid:Uid,Mid:this.Mid});
}
}
