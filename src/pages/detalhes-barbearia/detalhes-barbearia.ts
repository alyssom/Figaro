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

  horario_de;
  horario_ate
  horarios = [];
  horariosAtendimento = "";
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.obj = this.navParams.data.obj;
    this.nome = this.navParams.data.obj.nome;
    this.logradouro = this.navParams.data.obj.logradouro;
    this.foto = this.navParams.data.obj.foto;
    this.servicos = this.navParams.data.obj.servicos;



    this.horario_de = this.navParams.data.obj.horario_de;
    this.horario_ate = this.navParams.data.obj.horario_ate;

    var d = new Date();

    var h = d.getHours();
    var m = d.getMinutes();

    this.horariosAtendimento += this.horario_de + ":00";
    this.horariosAtendimento += " as " + this.horario_ate + ":00";
    for (this.horario_de; this.horario_de <= this.horario_ate; this.horario_de++) {



      if (this.horario_de > h) {
         this.horarios.push(this.horario_de + ":00");
         this.horarios.push(this.horario_de + ":30");
      }
    }


  }

  agendamento(params) {
    if (this.horarios.length > 0) {

      if (!params) params = {};
      this.navCtrl.push(AgendamentoPage, { obj: params });
    } else {
      document.getElementById("botaoAgendar").hidden = true;
      alert('sem horários disponíveis');

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesBarbeariaPage');
  }

}
