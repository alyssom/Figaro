import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { auth } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import * as firebase from 'firebase'; 
import * as swal from 'sweetalert2';
import { User } from '../../models/user';
import { CadastroPage } from '../cadastro/cadastro';
import { BarbeariasProvider } from '../../providers/barbearias/barbearias';
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
  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams,
    private provider: BarbeariasProvider, private googlePlus: GooglePlus) {
  }

  async login(user: User, params){
  const swal = require('sweetalert2')
        const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.senha).then(userLogou => {
          
          this.navCtrl.push(HomePage, { user: userLogou });
        }
        ).catch(err => {
          swal(
            'Oops...',
            'Usuário ou Senha estão errados.',
            'error'
          )
        })
        
}



googleLogin(params){
  const swal = require('sweetalert2')
  this.googlePlus.login({})
  .then(res => {
    this.navCtrl.push(HomePage, { user: res });
  })
  .catch(err => swal(
    'Oops...',
    'Acho que você não desligou o CORS.',
    'error'
  ));
}

  cadastro(){
    this.navCtrl.push(CadastroPage);
  }

}