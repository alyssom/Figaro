import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import { LoginPage } from '../login/login';
import { BarbeariasProvider } from '../../providers/barbearias/barbearias';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  user = {} as User;


  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams,
    private provider: BarbeariasProvider) {
  }



  async register(user: User, params){
    try{
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.senha);
    console.log(result);
    const swal = require('sweetalert2')
    
      swal(
        'Parabéns!',
        'Você está cadastrado.',
        'success'
      )
    
    
    this.navCtrl.push(LoginPage);
    }
    catch(e){
      console.log(e);
      const swal = require('sweetalert2')

      swal(
        'Oops...',
        'O Email deve conter @ e .com / A senha deve no mínimo 6 caracteres.',
        'error'
      )
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

}
