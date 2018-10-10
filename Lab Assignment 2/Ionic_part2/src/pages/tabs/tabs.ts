import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { App } from 'ionic-angular';
import {LoginPage} from '../login/login';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AngularFireAuth } from "angularfire2/auth";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public appCtrl: App, private firebase: AngularFireAuth,public navCtrl: NavController) {
  this.firebase = firebase;
      this.navCtrl = navCtrl;

  }
 
}
