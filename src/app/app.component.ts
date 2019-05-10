import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HeaderColor } from '@ionic-native/header-color';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { HttpClient } from '@angular/common/http';
import { HomePage } from '../pages/home/home';
import { MenuController } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { ChangePasswordPage } from '../pages/change-password/change-password';


@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;
	public Username: any;
	public Password: any;
	/*rootPage: any = LoginPage; */


	constructor(
						public platform: Platform,
						private statusBar: StatusBar,
						public splashScreen: SplashScreen,
						public alertCtrl: AlertController, 
						public network: Network,
						public storage: Storage,
						public headerColor: HeaderColor,
						public screenOrientation: ScreenOrientation,
						public http: HttpClient,
						public menuCtrl: MenuController,
						public toastCtrl: ToastController
							 ) {
		this.initializeApp();

		if (this.platform.is('cordova')) {
			this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
		}
		this.storage.get('Username').then((val) => {
			this.Username = val;
		});
		this.storage.get('password').then((val) => {
			this.Password = val;
		});
		this.login();
	}
	login() {
		this.storage.get('Username').then((val) => {
			this.Username = val;
			this.storage.get('password').then((val) => {
				this.Password = val;
			});

			var link = 'http://simpsonwms.arkaautomaations.com/WarrantyAppAPI/LoginApi.php?LGP=1';
			var myData = JSON.stringify({ Username: this.Username, Password: this.Password });
			this.http.post(link, myData)
				.subscribe(data => {
					if (data != '') {
						if (data[0].status != '0') {
							this.storage.set('Username', this.Username);
							this.storage.set('user_id', data[0].id);
							this.storage.set('password', data[0].password);
							this.storage.set('c_code', data[0].customer_code);
							this.nav.setRoot(HomePage);
						}
						else {
							let toast = this.toastCtrl.create({
								message: "Account In-Active",
								duration: 3000,
								position: 'top'

							});
							toast.present();
							this.nav.setRoot(LogoutPage);
						}
					}
					//else
					//{
					//	let toast = this.toastCtrl.create({
					//	message: "Username / Password incorrect",
					//	duration: 3000,
					//	position: 'top'
					//	
					//});
					//toast.present();
					//
					//}
					// 
					// 
				}, error => {
					//alert(JSON.stringify(error));
				});

		});
	}
	ChangePassword() {
		this.nav.push(ChangePasswordPage);
	}
	LogOut() {
		this.nav.push(LogoutPage);
	}

	initializeApp() {
		//	this.storage.set('Username','');
		//	this.storage.set('user_id','');
		//	this.storage.set('c_code','');
		this.storage.get('Username').then((val) => {
			if (val == null || val == undefined) {
				this.storage.set('Username', '');
				this.storage.set('user_id', '');
				this.storage.set('c_code', '');
			}
		});
		this.storage.get('user_id').then((val) => {
			if (val == null || val == undefined) {
				this.storage.set('Username', '');
				this.storage.set('user_id', '');
				this.storage.set('c_code', '');
			}
		});
		this.storage.get('c_code').then((val) => {
			if (val == null || val == undefined) {
				this.storage.set('Username', '');
				this.storage.set('user_id', '');
				this.storage.set('c_code', '');
			}
		});
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.overlaysWebView(false);
			this.statusBar.backgroundColorByHexString('#0b2d60');
			this.storageGet();
			this.splashScreen.hide();
			this.headerColor.tint('#1342c3');
			const disconnectSubscription = this.network.onDisconnect().subscribe(() => {
				let altsuccess = this.alertCtrl.create({
					title: 'Alert',
					message: 'Network is disconnected..!..!',
					buttons: [
						{
							text: 'OK',
							handler: () => {
								this.nav.setRoot(HomePage);
								this.platform.exitApp();
							}
						}
					]
				});
				altsuccess.present();
				disconnectSubscription.unsubscribe();

			});
			const connectSubscription = this.network.onConnect().subscribe(() => {
				console.log('network connected!');
				setTimeout(() => {
					let altsuccess = this.alertCtrl.create({
						title: 'Alert',
						message: 'Network is connected..!..!',
						buttons: [
							{
								text: 'OK',
								handler: () => {
									//this.nav.push(CreditListPage);
								}
							}
						]
					});
					altsuccess.present();
					connectSubscription.unsubscribe();
				}, 3000);
			});

		});

	}
	storageGet() {
		this.storage.get('Username').then((val) => {
			if (val != '') {
				this.nav.setRoot(HomePage);
			}
			else {
				this.nav.setRoot(LoginPage);
			}
		});
	}
	openPage(page) {
		this.nav.setRoot(page.component);
	}
}
