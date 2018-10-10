import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home'
import {RegisterPage} from '../register/register'
import {TabsPage} from '../tabs/tabs'
import {User} from '../../models/user'
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { auth } from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
user = {} as User;

  constructor(public fireAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }
  
signIn(user: User){
this.fireAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(data =>{
this.navCtrl.push(TabsPage);
}).catch(error =>{
alert("Invalid Credentials");
});
}

login(){
this.navCtrl.push(TabsPage);}

loginWithGoogle() {
 this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((data) => {
        this.navCtrl.push(TabsPage);
    }).catch(function(error) {
      console.log("Invalid Athentication");
    });
}

register(){
        this.navCtrl.push(RegisterPage);

  }

}
