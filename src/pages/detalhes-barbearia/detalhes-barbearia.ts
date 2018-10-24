import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgendamentoPage } from '../agendamento/agendamento';

/**
 * Generated class for the DetalhesBarbeariaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhes-barbearia',
  templateUrl: 'detalhes-barbearia.html',
})
export class DetalhesBarbeariaPage {
  obj;
  nome;
  logradouro;
  foto;
  servicos;

  horarioAbre;
  horarioFecha;
  horarios = [];
  horariosAtendimento = "";
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.obj = this.navParams.data.obj;
    this.nome = this.navParams.data.obj.nome;
    this.logradouro = this.navParams.data.obj.logradouro;
    this.foto = this.navParams.data.obj.foto;
    this.servicos = this.navParams.data.obj.servicos;


    this.horarioAbre = this.navParams.data.obj.horarioAbre;
    this.horarioFecha = this.navParams.data.obj.horarioFecha;

    var d = new Date();

    var h = d.getHours();
    var m = d.getMinutes();

    this.horariosAtendimento += this.horarioAbre + ":00";
    this.horariosAtendimento += " as " + this.horarioFecha + ":00";
    for (this.horarioAbre; this.horarioAbre < this.horarioFecha; this.horarioAbre++) {
         this.horarios.push(this.horarioAbre + ":00");
         this.horarios.push(this.horarioAbre + ":30");
    }


  }

  agendamento(params) {
    if (this.horarios.length > 0) {

      if (!params) params = {};
      this.navCtrl.push(AgendamentoPage, { obj: params, "horarios": this.horarios });
    } else {
      document.getElementById("botaoAgendar").hidden = true;
      alert('sem horários disponíveis');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesBarbeariaPage');
  }

}
