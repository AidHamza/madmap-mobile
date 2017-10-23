import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { MediaPlugin } from 'ionic-native';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  	map: GoogleMap;
  	mapElement: HTMLElement;
	media: MediaPlugin;

  	ionViewDidLoad() {
  		this.loadMap();
  	}

  	ionViewDidEnter() {
    	this.media = new MediaPlugin('../Library/NoCloud/recording.wav')
  	}

	constructor(public navCtrl: NavController,
		public alertCtrl: AlertController,
		private androidPermissions: AndroidPermissions,
		private googleMaps: GoogleMaps) {

		this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.RECORD_AUDIO, this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE]);

		this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO).then(
		  success => console.log('Record Audio Permission granted'),
		  err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO)
		);

		this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
		  success => console.log('External Storage Permission granted'),
		  err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
		);
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

	public loadMap() {
	    this.mapElement = document.getElementById('map');

	    let mapOptions: GoogleMapOptions = {
	      camera: {
	        target: {
	          lat: 43.0741904,
	          lng: -89.3809802
	        },
	        zoom: 18,
	        tilt: 30
	      }
	    };

	    this.map = this.googleMaps.create(this.mapElement, mapOptions);

	    // Wait the MAP_READY before using any methods.
	    this.map.one(GoogleMapsEvent.MAP_READY)
	      .then(() => {
	        console.log('Map is ready!');

	        // Now you can use all methods safely.
	        this.map.addMarker({
	            title: 'Ionic',
	            icon: 'blue',
	            animation: 'DROP',
	            position: {
	              lat: 43.0741904,
	              lng: -89.3809802
	            }
	          })
	          .then(marker => {
	            marker.on(GoogleMapsEvent.MARKER_CLICK)
	              .subscribe(() => {
	                alert('clicked');
	              });
	          });

	      });
	  }
	}
