import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { BarcodeScanner ,BarcodeScannerOptions} from '@ionic-native/barcode-scanner';
import { Flashlight } from '@ionic-native/flashlight';
import { LoadingController,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ReviewPage } from '../review/review';
import { BarcodePage } from '../barcode/barcode';
/**
 * Generated class for the UnmatchinvoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-unmatchinvoice',
  templateUrl: 'unmatchinvoice.html',
})
export class UnmatchinvoicePage {
public CompanyName:any;
public InvoiceDate:any;
public InvoiceNo:any;
public MaterialCode:any;
public MaterialName:any;
public Address:any;
public Quantity:any;
public warrenty:any;
public Remarks:any;
public splitted:any;
public myData;any;
public scanData:any;
options :BarcodeScannerOptions;
public AudioDuriation:any;
public EnableBack:any;
public user_id:any;
public UserId:any;

public typee:any;
public Id:any;
public date: string = new Date().toLocaleString();
public CurDate:any;
public CurDate1:any;
public resDate:any;
public warentyRequest: any;
public TotSum: any;
public AddMore:any;
public QrInv:any;
public QRImage : boolean;
public ShowForm : boolean;
public Expire : boolean;
  constructor(public navCtrl: NavController, public http:HttpClient, public navParams: NavParams, public flashlight: Flashlight, public loadingCtrl: LoadingController, public platfrm: Platform, public alertCtrl: AlertController, public barcodeScanner: BarcodeScanner, public storage: Storage, public sqlite: SQLite) {
  	 this.storage.get('user_id').then((val) => {
		if(val!='')
		{
		this.UserId = val;
		}
		});
		if(this.TotSum==undefined)
		{
  		this.TotSum=0;
		}
  }


ionViewDidLoad() {
	this.QRImage=true;
	this.ShowForm=false;
	this.getData();
      var date_to_parse = new Date();
    var year = date_to_parse.getFullYear().toString();
    var month = (date_to_parse.getMonth() + 1).toLocaleString();
    var day = date_to_parse.getDate().toLocaleString();
    var hour = date_to_parse.getHours().toLocaleString();
    var minute = (date_to_parse.getMinutes() + 1).toLocaleString();
    var sec = date_to_parse.getSeconds().toLocaleString();	
	
	this.date = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+sec;

	  this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

	db.executeSql('SELECT COUNT(rowid) AS TotSum FROM WarrentyRequest ORDER BY rowid DESC',[]).then(res=>{
	this.TotSum = res.rows.item(0).TotSum;

	}).catch(e=>console.log(e));
	db.executeSql('SELECT InvoiceNo FROM WarrentyRequest ORDER BY rowid DESC',[]).then(res=>{
	this.QrInv = res.rows.item(0).InvoiceNo;

	}).catch(e=>console.log(e));
	}).catch(e=>console.log(e));

}

ionViewWillEnter() {
	this.QRImage=true;
	this.ShowForm=false;
	this.getData();
    var date_to_parse = new Date();
    var year = date_to_parse.getFullYear().toString();
    var month = (date_to_parse.getMonth() + 1).toLocaleString();
    var day = date_to_parse.getDate().toLocaleString();
    var hour = date_to_parse.getHours().toLocaleString();
    var minute = (date_to_parse.getMinutes() + 1).toLocaleString();
    var sec = date_to_parse.getSeconds().toLocaleString();	
	
	this.date = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+sec;

	  this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

	db.executeSql('SELECT COUNT(rowid) AS TotSum,InvoiceNo FROM WarrentyRequest ORDER BY rowid DESC',[]).then(res=>{
	this.TotSum = res.rows.item(0).TotSum;
	this.QrInv = res.rows.item(0).InvoiceNo;
	}).catch(e=>console.log(e));

	}).catch(e=>console.log(e));
}

getData() {
  this.sqlite.create({
    name: 'ionicdb.db',
    location: 'default'
  }).then((db: SQLiteObject) => 
{
db.executeSql('CREATE TABLE IF NOT EXISTS WarrentyRequest(rowid INTEGER PRIMARY KEY, timestamp Text, CompanyName TEXT, Address TEXT, InvoiceNo TEXT,InvoiceDate TEXT, UserId TEXT, MaterialCode TEXT ,MaterialName TEXT , warrenty TEXT, Quantity TEXT , Remarks TEXT)', []).then(res => console.log('Executed SQL')).catch(e => console.log(e));
}).catch(e => console.log(e));
}

Review(RevValue)
{
if(RevValue!=0)
{
this.navCtrl.push(ReviewPage);
}
else
{
let altsuccess = this.alertCtrl.create({
title: 'Alert',
message: 'No Record To Review..!',
buttons: [
  {
	text: 'OK',
	handler: () => 
	{
	}
  }
]
});
altsuccess.present();
}
}
  
PageChange()
	{
	this.navCtrl.push(BarcodePage).then(() =>  {
	const startIndex = this.navCtrl.getActive().index - 2;
	this.navCtrl.remove(startIndex, 2);
	});	
	}
}
