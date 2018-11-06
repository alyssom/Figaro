import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { BarbeariasProvider } from '../../providers/barbearias/barbearias';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase,
    private provider: BarbeariasProvider) {
    this.buscaMeusAgendamentos();
  }

  ionViewDidLoad() {
  }
  buscaMeusAgendamentos(){
    this.db.list('/agendamentos', { preserveSnapshot: true })
    .subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        console.log(snapshot);
        console.log(this.provider.user)
        if(snapshot.val().emailCliente == this.provider.user.email){
          this.agendamentos.push(snapshot.val());
        }
      }
      )
    })
    this.agendamentos = this.agendamentos.sort((agendamento)=>{
      return agendamento.dataAgendamento;
    })
  }
}
