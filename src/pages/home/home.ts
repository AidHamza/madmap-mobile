import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { MediaPlugin } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	media: MediaPlugin;

  	ionViewDidEnter() {
    	this.media = new MediaPlugin('../Library/NoCloud/recording.wav')
  	}
  	
	constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

	}

	public startRecording() {
	  try {
	    this.media.startRecord();
	  }
	  catch (e) {
	    this.showAlert('Could not start recording.');
	  }
	}

	public stopRecording() {
	  try {
	    this.media.stopRecord();
	  }
	  catch (e) {
	    this.showAlert('Could not stop recording.');
	  }
	}

	public startPlayback() {
	  try {
	    this.media.play();
	  }
	  catch (e) {
	    this.showAlert('Could not play recording.');
	  }
	}

	public stopPlayback() {
	  try {
	    this.media.stop();
	  }
	  catch (e) {
	    this.showAlert('Could not stop playing recording.');
	  }
	}

	public showAlert(message) {
	  let alert = this.alertCtrl.create({
	    title: 'Error',
	    subTitle: message,
	    buttons: ['OK']
	  });
	  alert.present();
	}
}
