import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, List } from 'ionic-angular';
import {LoginPage} from '../login/login';
import { App } from 'ionic-angular';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';

import {Http, Headers, Response} from "@angular/http";
import { AngularFireDatabase} from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  userId: string;
  public base64Image: string;
  private imagesArray : List;



// public ROOT_URL = 'https://vision.googleapis.com';
  // public API_KEY = 'AIzaSyDT4XvxKUbvC0mautp3mQcOz5wyaQQnXQk'; // YOUR CLOUD PLATFORM API KEY
  
public visionResult : string


  constructor(public appCtrl: App, public navCtrl: NavController, public alertCtrl: AlertController, private camera: Camera, public fireDatabase: AngularFireDatabase, private afAuth: AngularFireAuth, private http: Http, private vision: GoogleCloudVisionServiceProvider) {
    } 
  

  Capture(){
    console.log("Camera is called");
    const options : CameraOptions = {
      quality : 100,
      destinationType : this.camera.DestinationType.DATA_URL,
      sourceType : this.camera.PictureSourceType.CAMERA,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    };
    this.camera.getPicture(options).then((imageData) => {
    this.base64Image = "data:image/jpeg;base64," + imageData;
    
    const body = {
      "requests": [
        {
          "image": {
            "content": imageData
          },
          "features": [
            {
              "type": "TEXT_DETECTION",
               "maxResults":10

            }
          ]
        }
      ]
    }
    
    
    this.http.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDH7CteeKEUb4tF3OtrWGnNazWtWTPEwPY', body).pipe(map(res => res.json())).subscribe(data =>
    {      
      console.log(data);
      if(data != null && data != "undefined"
      && data.responses != null && data.responses[0] != null && data.responses[0] != "undefined" &&
      data.responses[0].textAnnotations != null && data.responses[0].textAnnotations[0] != null
      && data.responses[0].textAnnotations[0] != "undefined"){
      this.visionResult = data.responses[0].textAnnotations[0].description;
      }else{
      let alert = this.alertCtrl.create({
        title: 'Data',
        subTitle: "No Text Detected from the Image !!",
        buttons: ['OK']
      });
      alert.present();
      }      
    }, error => {
      let alert = this.alertCtrl.create({
        title: 'Failure',
        subTitle: error,
        buttons: ['OK']
      });
      alert.present();
      console.log(error);// Error getting the data
    });
  });
  };
  
  

  
  logout()
  {
    this.appCtrl.getRootNav().setRoot(LoginPage);

  }
  }
    