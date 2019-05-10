import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular'
import { Storage } from '@ionic/storage';
import { App } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-change-password',
	templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
	public CurPassword: any;
	public Password: any;
	public RePassword: any;
	public userId: any;
	public Username: any;
	public user_id: any;
	key: string = 'Username';
	constructor(public navCtrl: NavController, public app: App, public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController, public storage: Storage) {
		this.storage.get('user_id').then((val) => {
			if (val != '') {
				this.userId = val;
			}
		});
	}
	onChange() {
		if (this.CurPassword != undefined) {
			this.storage.get('password').then((val) => {
				if (val != '') {
					if (this.CurPassword != val) {
						let altsuccess = this.alertCtrl.create({
							title: 'Alert',
							message: 'Current Password Not Correct..!',
							buttons: [
								{
									text: 'OK',
									handler: () => {
									}
								}
							]
						});
						altsuccess.present();
						return false;
					}
				}
			});
		}
	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad ChangePasswordPage');
	}
	Update() {
		this.onChange();
		if (this.CurPassword == undefined) {
			let altsuccess = this.alertCtrl.create({
				title: 'Alert',
				message: 'Current Password Empty..!',
				buttons: [
					{
						text: 'OK',
						handler: () => {
						}
					}
				]
			});
			altsuccess.present();
			return false;
		}

		if (this.Password == undefined) {
			let altsuccess = this.alertCtrl.create({
				title: 'Alert',
				message: 'New Password Empty..!',
				buttons: [
					{
						text: 'OK',
						handler: () => {
						}
					}
				]
			});
			altsuccess.present();
			return false;
		}
		if (this.RePassword == undefined) {
			let altsuccess = this.alertCtrl.create({
				title: 'Alert',
				message: 'Re Password Empty..!',
				buttons: [
					{
						text: 'OK',
						handler: () => {
						}
					}
				]
			});
			altsuccess.present();
			return false;
		}
		if (this.Password != this.RePassword) {
			let altsuccess = this.alertCtrl.create({
				title: 'Alert',
				message: 'Password Not Match..!',
				buttons: [
					{
						text: 'OK',
						handler: () => {
						}
					}
				]
			});
			altsuccess.present();
			return false;
		}
		var link = 'http://simpsonwms.arkaautomaations.com/WarrantyAppAPI/UpdatePassword.php?PUP=1';
		var myData = JSON.stringify({ Pword: this.Password, UsId: this.userId });
		this.http.post(link, myData)
			.subscribe(data => {
				if (data != '') {
					let altsuccess = this.alertCtrl.create({
						title: 'Alert',
						message: 'Password Updated Successfully..!',
						buttons: [
							{
								text: 'OK',
								handler: () => {
								}
							}
						]
					});
					altsuccess.present();
					this.storage.set('Username', this.Username);
					this.storage.set('user_id', data[0].id);
					this.storage.set('password', data[0].password);
					this.storage.get(this.key).then((val) => {
						if (val != '') {
							this.app.getRootNavs()[0].setRoot(HomePage);
						}
					});

					this.app.getRootNavs()[0].setRoot(HomePage);
				}
			}, error => {
				alert(JSON.stringify(error));
			});
	}
}
