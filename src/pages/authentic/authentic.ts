import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions} from '@ionic-native/barcode-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HomePage } from '../home/home';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { App, AlertController } from 'ionic-angular';
import { Sim } from '@ionic-native/sim';
import { Device } from '@ionic-native/device';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the AuthenticPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-authentic',
  templateUrl: 'authentic.html',
})
export class AuthenticPage {
public scanData:any;
public splitted:any;
public MobileNumber:any;
public MobileModel:any;
public MobileSerial:any;
public lat:any;
public long:any;
options :BarcodeScannerOptions;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpClient,public sim: Sim, public device: Device, public barcodeScanner: BarcodeScanner, public app: App, public iab: InAppBrowser, public geolocation:Geolocation,public alertCtrl: AlertController) {
		
		this.sim.getSimInfo().then(
		(info) => this.MobileNumber = info.phoneNumber,
		(err) => console.log(JSON.stringify(err))
		);			
		this.sim.hasReadPermission().then(
		(info) => console.log(info)
		);
		this.sim.requestReadPermission().then(
		() => console.log('Permission granted'),
		() => console.log('Permission denied')
		);  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthenticPage');
  }
	BarScan()
	{
		this.options = {
		showTorchButton : true,
		resultDisplayDuration:0,
		torchOn : true,
		prompt : "Scanning your QR Code"
		}
	
		this.barcodeScanner.scan(this.options).then(barcodeData => {
			this.scanData = barcodeData.text;

			this.splitted = this.scanData.split("&@");

				let data :Observable<any>;
				data = this.http.get('http://simpsonwms.arkaautomaations.com/WarrantyAppAPI/GetQRDetails.php?InvMasterId='+this.splitted[1]+'&InvDetailsId='+this.splitted[2]);
				data.subscribe(result=>{
				console.log(result.length);

if(result.length==0)
{
		
		this.MobileModel = this.device.model;
		this.MobileSerial = this.device.serial;
			

let optionsGPS = {timeout: 2000, enableHighAccuracy: true};
this.geolocation.getCurrentPosition(optionsGPS).then((resp) => {

this.lat = resp.coords.latitude;
this.long = resp.coords.longitude;

var link = 'http://simpsonwms.arkaautomaations.com/WarrantyAppAPI/Geniune_API.php';
var myData = JSON.stringify({InvMasterId:this.splitted[1], InvDetailsId:this.splitted[2] ,MobileNumber:this.MobileNumber, MobileModel:this.MobileModel, MobileSerial:this.MobileSerial, Latitude:this.lat, Longitude:this.long});

this.http.post(link, myData,{responseType: 'text'}).subscribe(data => {
console.log(JSON.stringify(data));
}, error => {
console.log(JSON.stringify(error));
});

}).catch((error) => {
			let altsuccess = this.alertCtrl.create({
			title: 'Alert',
			message: 'Enable Location And Scan..!',
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
});
}
				const browser = this.iab.create(this.scanData,'_self',{location:'no',zoom:'no'});
				browser.on('exit').subscribe(() => {
				this.app.getRootNavs()[0].setRoot(HomePage);
				}, err => {
				this.app.getRootNavs()[0].setRoot(HomePage);
				});
					}, (error) => {
					console.log(error);
				const browser = this.iab.create(this.scanData,'_self',{location:'no',zoom:'no'});
				browser.on('exit').subscribe(() => {
				this.app.getRootNavs()[0].setRoot(HomePage);
				}, err => {
				this.app.getRootNavs()[0].setRoot(HomePage);
				});
	});

		});
	}
}
