import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { SQLite } from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Flashlight } from '@ionic-native/flashlight';
import { AlertController, ToastController } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { Media } from '@ionic-native/media';
import { HeaderColor } from '@ionic-native/header-color';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Sim } from '@ionic-native/sim';
import { Device } from '@ionic-native/device';
import { MyApp } from './app.component';
import { App } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { MenuController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { TestPage } from '../pages/test/test';
import { CustomerDetPage } from '../pages/customer-det/customer-det';
import { BarcodePage } from '../pages/barcode/barcode';
import { LoginPage } from '../pages/login/login';
import { LoginRegTabPage } from '../pages/login-reg-tab/login-reg-tab';
import { RegisterPage } from '../pages/register/register';
import { LogoutPage } from '../pages/logout/logout';
import { ReviewPage } from '../pages/review/review';
import { ReviewDetailsPage } from '../pages/review-details/review-details';
import { FileuploadPage } from '../pages/fileupload/fileupload';
import { WarrantyMasterPage } from '../pages/warranty-master/warranty-master';
import { UnmatchinvoicePage } from '../pages/unmatchinvoice/unmatchinvoice';
import { ItemexistPage } from '../pages/itemexist/itemexist';
import { AuthenticPage } from '../pages/authentic/authentic';
import { CreditTabsPage } from '../pages/credit-tabs/credit-tabs';
import { ShortageDetailsPage } from '../pages/shortage-details/shortage-details';
import { CreditListPage } from '../pages/credit-list/credit-list';
import { CreditListDetailsPage } from '../pages/credit-list-details/credit-list-details';
import { ChangePasswordPage } from '../pages/change-password/change-password';


//import { FormGroup } from '@angular/forms';
@NgModule({
	declarations: [
		MyApp,
		HomePage,
		TestPage,
		CustomerDetPage,
		LoginPage,
		LogoutPage,
		BarcodePage,
		ReviewPage,
		ReviewDetailsPage,
		CreditTabsPage,
		ShortageDetailsPage,
		CreditListPage,
		CreditListDetailsPage,
		FileuploadPage,
		WarrantyMasterPage,
		RegisterPage,
		LoginRegTabPage,
		UnmatchinvoicePage,
		ItemexistPage,
		AuthenticPage,
		ChangePasswordPage

	],
	imports: [
		BrowserModule,
		HttpClientModule,
		HttpModule,
		IonicStorageModule.forRoot(),
		BrowserAnimationsModule,
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		TestPage,
		CustomerDetPage,
		LoginPage,
		LogoutPage,
		BarcodePage,
		ReviewPage,
		ReviewDetailsPage,
		CreditTabsPage,
		ShortageDetailsPage,
		CreditListPage,
		CreditListDetailsPage,
		FileuploadPage,
		WarrantyMasterPage,
		RegisterPage,
		LoginRegTabPage,
		UnmatchinvoicePage,
		ItemexistPage,
		AuthenticPage,
		ChangePasswordPage

	],
	providers: [
		StatusBar,
		SplashScreen,
		MenuController,
		Network,
		Flashlight,
		AlertController,
		ToastController,
		FileTransfer,
		FileTransferObject,
		FilePath,
		SQLite,
		File,
		BarcodeScanner,
		HeaderColor,
		ScreenOrientation,
		Media,
		Camera,
		MediaCapture,
		Sim,
		Device,
		App,
		Geolocation,
		PhotoLibrary,
		InAppBrowser,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule { }
