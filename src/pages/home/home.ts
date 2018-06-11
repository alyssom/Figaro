import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { BarbeariasProvider } from '../../providers/barbearias/barbearias';

import { Geolocation } from '@ionic-native/geolocation'; 



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  
  barbearias = [];
  constructor(public navCtrl: NavController, 
              private db: AngularFireDatabase, 
              private provider: BarbeariasProvider) {
        this.barbearias = this.provider.getBarbearias();
  }

  ionViewDidLoad(){
    
  }

}
