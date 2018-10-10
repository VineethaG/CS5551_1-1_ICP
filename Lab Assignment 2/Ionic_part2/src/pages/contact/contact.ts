import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from '../login/login'
import { App } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public appCtrl: App,public navCtrl: NavController) {

  }
 
  logout()
  {
    this.appCtrl.getRootNav().setRoot(LoginPage);

  }
}
