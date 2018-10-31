import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { BarbeariasProvider } from '../../providers/barbearias/barbearias';

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
  horarioAbre;
  horarioFecha;
  horarios = [];
  dataAtual;
  dataAgendamento;
  duplicado = [];
  foto;
  email;

   swal = require('sweetalert2')

  constructor(public navCtrl: NavController, public NavParams: NavParams, private fdb: AngularFireDatabase,
    private provider: BarbeariasProvider) {
    this.obj = this.NavParams.data.obj;
    this.nome = this.NavParams.data.obj.nome;
    this.servicos = this.NavParams.data.obj.servicos;
    this.horarioAbre = this.NavParams.data.obj.horario_de;
    this.horarioFecha = this.NavParams.data.obj.horario_ate;
    this.horarios = this.NavParams.data.horarios;
    this.foto = this.NavParams.data.foto;
    this.email = provider.user.email;

    var d = new Date();
    this.dataAtual = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() ;
    var h = d.getHours();
    var m = d.getMinutes();


  //busca os agendamentos
  this.fdb.list('/agendamentos/' + this.nome + "/", { preserveSnapshot: true })
  .subscribe(snapshots => {
    snapshots.forEach(snapshot => {
     // console.log(snapshot.val().data)
      if (this.dataAtual == snapshot.val().data) {
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
   var agendamentoDuplicado = false;
    if (horario != null || servico != null) {
      var duracao;
    if (servico == "barbaEcabelo") {
      duracao = "1h";
    } else {
      duracao = "30min"
    }
    if(horario == null || horario == undefined){
      this.swal(
        'Oops...',
        'Informe o Horário que deseja.',
        'error'
      )
    }
    if(servico == null || servico == undefined){
      this.swal(
        'Oops...',
        'Informe o Serviço que deseja.',
        'error'
      )
    }
    if(this.dataAgendamento == null || this.dataAgendamento == undefined){
      this.swal(
        'Oops...',
        'Informe a Data de seu Agendamento.',
        'error'
      )
    }
  
    this.fdb.list('agendamentos/', {preserveSnapshot: true})
    .subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        if(snapshot.val().nome == this.nome && snapshot.val().horario == horario && snapshot.val().dataAgendamento == this.dataAgendamento){
          agendamentoDuplicado = true;
          this.swal(
            'Oops...',
            'Este Horário já esta agendado por outro Cliente.',
            'error'
          )
        }
      })
    })
      if(agendamentoDuplicado == false){
        this.fdb.list("/agendamentos/").push({
          horario: horario,
          duracao: duracao,
          nome: this.nome,
          dataAtual: this.dataAtual,
          dataAgendamento: this.dataAgendamento,
          servico: servico,
          emailCliente: this.email,
          atendido: false
        });
        this.swal({
          position: 'center',
          type: 'success',
          title: 'Feito! Horário agendado com sucesso.',
          showConfirmButton: false,
          timer: 2000
        })
        this.navCtrl.pop();
      }
      }
  }


  
}
