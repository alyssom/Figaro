import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { auth } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import * as firebase from 'firebase'; 
import * as swal from 'sweetalert2';
import { User } from '../../models/user';
import { GooglePlus } from '@ionic-native/google-plus';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;
  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public googlePlus: GooglePlus) {
  }

  googleLogin(){
    this.googlePlus.login({})
    .then(res => {
      alert(res.user)
      this.navCtrl.push(HomePage);
    })
    .catch(err => alert(err));
  }
  
  async login(user: User, params){
  const swal = require('sweetalert2')
  

        const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.senha).then(user => {
          this.navCtrl.push(HomePage);
          swal({
            position: 'center',
            type: 'success',
            title: 'Aproveite nossos descontos de natal, até 30% OFF',
            showConfirmButton: false,
            timer: 3500
          })
        }
        ).catch(err => {
          swal(
            'Oops...',
            'Usuário ou Senha estão errados.',
            'error'
          )
        })
        
}

// googleLogin(params){

//   const swal = require('sweetalert2')
//   this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(user => {
//     console.log(user);
//     this.navCtrl.push(HomePage);
//     swal({
//       position: 'center',
//       type: 'success',
//       title: 'Aproveite nossos descontos de natal, até 30% OFF',
//       showConfirmButton: false,
//       timer: 3500
//     })
//   }
//   ).catch(err =>  {
//     swal(
//       'Oops...',
//       'Acho que você não desligou o CORS.',
//       'error'
//     )
//   })
// }

  register(){
    this.navCtrl.push('RegisterPage');
  }

}