import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the AgendamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agendamento',
  templateUrl: 'agendamento.html',
})
export class AgendamentoPage {
  
  nome;
  servicos;
  obj;
  horario_de;
  horario_ate;
  horarios = [];
  data;

  constructor(public navCtrl: NavController, public NavParams: NavParams, private fdb: AngularFireDatabase) {
    this.obj = this.NavParams.data.obj;
    this.nome = this.NavParams.data.obj.nome;
    this.servicos = this.NavParams.data.obj.servicos;
    this.horario_de = this.NavParams.data.obj.horario_de;
    this.horario_ate = this.NavParams.data.obj.horario_ate;

    var d = new Date();
    this.data = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
    var h = d.getHours();
    var m = d.getMinutes();


    for (this.horario_de; this.horario_de <= this.horario_ate; this.horario_de++) {

      if (this.horario_de > h) {

        this.horarios.push(this.horario_de + ":00");
  
        this.horarios.push(this.horario_de + ":30");
      }
  }

  //busca os agendamentos
  this.fdb.list('/agendamentos/' + this.nome + "/", { preserveSnapshot: true })
  .subscribe(snapshots => {
    snapshots.forEach(snapshot => {
     // console.log(snapshot.val().data)
      if (this.data == snapshot.val().data) {
        var index = this.horarios.indexOf(snapshot.val().horario);
        if (index > -1) {
          this.horarios.splice(index, 1);
         // console.log("horario  " + snapshot.val().horario + "removido!");
        }
      }

    })
  })

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendamentoPage');
  }

  salvarAgendamento(horario, servico) {

    const swal = require('sweetalert2')

    if (horario != null || servico != null) {
    
      var duracao;

    if (servico == "barbaEcabelo") {
      duracao = "1h";
    } else {
      duracao = "30min"
    }

    this.fdb.list("/agendamentos/" + this.nome + "/").push({
      horario: horario,
      duracao: duracao,
      nome: this.nome,
      data: this.data,
      servico: servico,
    });


    this.navCtrl.pop();

    swal({
      position: 'center',
      type: 'success',
      title: 'Feito! Horário agendado com sucesso.',
      showConfirmButton: false,
      timer: 2000
    })
      }else{
        swal(
          'Oops...',
          'Informe o horário e o serviço que deseja.',
          'error'
        )
      
    

    }


  }

}
