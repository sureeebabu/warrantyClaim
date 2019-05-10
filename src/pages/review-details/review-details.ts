import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/**
 * Generated class for the ReviewDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-review-details',
  templateUrl: 'review-details.html',
})
export class ReviewDetailsPage {
	public Id:any; 
	public Vid:any;
	public SValue:any;
	public MaterialCode:any;
	public MaterialName:any;
	public MaterialDate:any;
	public MaterialQty:any;
	public MaterialWarrenty:any;
	public MaterialUpload:any;
	public MaterialFile:any;
	public Remarks:any;
	public typee:any;
	public RefNo:any;
	public createdDate:any;
	public InvoiceNo:any;
	public claimStatus:any;
	public MasterId:any;
	public DetailId:any;	
		
	warrentyData: any = [];	
	
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpClient, public sqlite: SQLite, public storage: Storage) {
  	this.Id = this.navParams.get('Vid');
	this.SValue = this.navParams.get('Svalue');
	if(this.SValue=='Local')
	{
	this.ReviewDetails(this.Id);
	}
	else if(this.SValue=='Server')
	{
	this.ReviewServeDetails(this.Id);
	}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewDetailsPage');
  }
ReviewDetails(Vid)
{
this.sqlite.create({
name:'ionicdb.db',
location:'default'
}).then((db:SQLiteObject) => {
	db.executeSql('SELECT * FROM WarrentyRequest WHERE rowid=?',[Vid]).then(res=>{
//alert(res.rows.item(0).MaterialCode);
			this.MaterialCode=res.rows.item(0).MaterialCode;
			this.createdDate=res.rows.item(0).timestamp;
			this.MaterialName=res.rows.item(0).MaterialName;
			this.MaterialDate=res.rows.item(0).timestamp;
			this.MaterialWarrenty=res.rows.item(0).warrenty;
			this.MaterialQty=res.rows.item(0).Quantity;
			this.Remarks=res.rows.item(0).Remarks;
			this.InvoiceNo=res.rows.item(0).InvoiceNo;

	}).catch(e=>console.log(e));
	}).catch(e=>console.log(e));
}  
ReviewServeDetails(Vid)
{	this.storage.get('c_code').then((val) => {
		//alert(val);
	});
	let data :Observable<any>;
	data = this.http.get('http://simpsonwms.arkaautomaations.com/WarrantyAppAPI/RequestClaim.php?Vid='+Vid);
	data.subscribe(result=>{
	
			this.MaterialCode=result[0].item_code;
			this.MaterialName=result[0].item_name;
			this.MaterialWarrenty=result[0].warranty_request_type;
			this.MaterialQty=result[0].item_qty;
			this.Remarks=result[0].remarks;
			this.RefNo=result[0].ref_no;
			this.createdDate=result[0].created_date;
			this.InvoiceNo=result[0].invoice_no;
			this.claimStatus=result[0].claim_status;
			this.MasterId=result[0].claim_master_id;
			this.DetailId=result[0].claim_details_id;
			this.ReviewTrackDetails();		
	}, (error) => {
		//alert(JSON.stringify(error));
	});

}
ReviewTrackDetails()
{
	//alert(this.MasterId);
	//alert(this.DetailId);	
	let data :Observable<any>;
	data = this.http.get('http://simpsonwms.arkaautomaations.com/WarrantyAppAPI/RequestClaim.php?MasterId='+this.MasterId+'&DetailId='+this.DetailId);
	data.subscribe(result=>{
		this.typee=result;			
	}, (error) => {
		//alert(JSON.stringify(error));
	});

}
}
