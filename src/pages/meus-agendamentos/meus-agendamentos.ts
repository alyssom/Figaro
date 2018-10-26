import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the MeusAgendamentosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meus-agendamentos',
  templateUrl: 'meus-agendamentos.html',
})
export class MeusAgendamentosPage {
  agendamentos = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    this.db.list('/agendamentos', { preserveSnapshot: true })
    .subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.agendamentos.push(snapshot);
      }
      )
    })
  
  }

}
