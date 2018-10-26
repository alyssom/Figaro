import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { BarbeariasProvider } from '../../providers/barbearias/barbearias';
import { HTTP } from '@ionic-native/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Subject } from 'rxjs/Subject';
import { DetalhesBarbeariaPage } from '../detalhes-barbearia/detalhes-barbearia';
import  Swal  from  'sweetalert2';
import { CordovaCheckOptions, CordovaOptions } from '@ionic-native/core';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  barbearias = [];
  barbearias2 = [];
  
  startAt = new Subject();
  endAt = new Subject();

  lastKeypress: number = 0;

  latAtual;
  lonAtual;
  enderecoAtual;

  constructor(public navCtrl: NavController, 
              private db: AngularFireDatabase, 
              private provider: BarbeariasProvider,
              private http: HTTP,
              private geolocation: Geolocation,
              private platform: Platform) {
        
        
        const swal = require('sweetalert2')
                swal({
                  position: 'center',
                  type: 'success',
                  title: 'Esta semana 10% OFF!',
                  showConfirmButton: false,
                  timer: 2000
                })
        if(platform.is('core')){
          
          this.db.list('/barbearias', { preserveSnapshot: true })
            .subscribe(snapshots => {
              snapshots.forEach(snapshot => {
                
                          var nome = snapshot.val().nome;
                          var foto = snapshot.val().foto;
                          var logradouro = snapshot.val().logradouro;
                          var horarioAbre = snapshot.val().horario_de;
                          var horarioFecha = snapshot.val().horario_ate;
                          var resultadoDistancia = '0,1 Km';

                          this.barbearias.push({
                            "nome": nome,
                            "logradouro": logradouro,
                            "distancia": resultadoDistancia,
                            "foto": foto,
                            "horarioAbre": horarioAbre,
                            "horarioFecha": horarioFecha
                          })
              }
            )})
        }else{
          this.geolocation.getCurrentPosition().then((resp) => {
            this.latAtual = resp.coords.latitude
            this.lonAtual = resp.coords.longitude
            
                    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.latAtual + ',' + this.lonAtual + '&sensor=false&key=AIzaSyBHnWvYeHBzzbos61tJSsAapvhSMBbcYn8', {}, {})
                    .then(data => {
                      let minhaLocalizacao;
                      minhaLocalizacao = data.data; // data received by server
  
                      
                      var obj = JSON.parse(minhaLocalizacao);
                      var results = obj.results;
                      var cont = 0; 
                      results.forEach(element => {
                        cont++;
                        if(cont == 1){
                          this.enderecoAtual = element.formatted_address
  
                               
                      this.db.list('/barbearias', { preserveSnapshot: true })
                      .subscribe(snapshots => {
                        snapshots.forEach(snapshot => {
                          
                          var nome = snapshot.val().nome;
                          var foto = snapshot.val().foto;
                          var logradouro = snapshot.val().logradouro;
                          var horarioAbre = snapshot.val().horario_de;
                          var horarioFecha = snapshot.val().horario_ate;
                          //var estacionamento = snapshot.val().estacionamento;
                          var resultadoDistancia;
  
                          this.http.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+ this.enderecoAtual +'&destinations=' + logradouro + '&key=AIzaSyBHnWvYeHBzzbos61tJSsAapvhSMBbcYn8', {}, {})
                          .then(data => {
                            
                            resultadoDistancia = data.data; // data received by server
  
                            var obj = JSON.parse(resultadoDistancia);
                            var rows = obj.rows;
                            
                            rows.forEach(row => {
                              var elements = row.elements
                                elements.forEach(element => {
                                  resultadoDistancia = element.distance.text;
                                })
                            })
                            this.barbearias.push({
                              "nome": nome,
                              "logradouro": logradouro,
                              "distancia": resultadoDistancia,
                              "foto": foto,
                              "horarioAbre": horarioAbre,
                              "horarioFecha": horarioFecha
                            })
  
                          })
                          .catch(error => {
  
                            console.log("error api" + error.status);
                            console.log(error.error); // error message as string
                            console.log(error.headers);
  
                          });
                          
                        }
                        )
                      }
  
  
                      )
                        }
                        
                      });
  
                    })
                    .catch(error => {
  
                      console.log("error api" + error.status);
                      console.log(error.error); // error message as string
                      console.log(error.headers);
  
                    });
            }).catch((error) => {
              console.log('Error getting location' + error);
            }); 
         }

                  
        
  }
  
  ionViewDidLoad(){
    
  }

  ngOnInit(){
    this.provider.getBarbeariasSearch(this.startAt, this.endAt)
                .subscribe(barbearias => this.barbearias = barbearias)
                
  }

  barbeariaDetail(params) {
    if (!params) params = {};
    this.navCtrl.push(DetalhesBarbeariaPage, { obj: params });
  }

  search($event){
    if($event.timeStamp - this.lastKeypress > 200 && $event.target.value != undefined){
      let q = $event.target.value.toUpperCase()
      this.startAt.next(q)
      this.endAt.next(q+"\uf8ff") 
    }

    this.lastKeypress = $event.timeStamp;

  }




}
