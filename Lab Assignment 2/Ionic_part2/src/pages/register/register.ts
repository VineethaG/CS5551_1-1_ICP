import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import {LoginPage} from '../login/login';
import {TabsPage} from '../tabs/tabs';
import {User} from '../../models/user'
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {

user = {} as User;

  constructor(private fireAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  
  
register(user: User){

if(user.email != "" && user.firstName != "" && user.lastName != "" && user.password != ""
      && user.confirmPassword != "")
    {
      if(user.password  == user.confirmPassword){

this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(data =>{
alert("Registered Succesfully")
this.navCtrl.push(LoginPage);
console.log(user.firstName);

}).catch(error =>{
console.error("Error in Registration");
});
}
else alert("Password should match");
}
else alert("Fields should not be empty");
}


login(){
        this.navCtrl.push(LoginPage);

}
}
 
