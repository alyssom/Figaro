import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { BarbeariasProvider } from '../../providers/barbearias/barbearias';
import { HTTP } from '@ionic-native/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Subject } from 'rxjs/Subject';
import { DetalhesBarbeariaPage } from '../detalhes-barbearia/detalhes-barbearia';



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

  constructor(public navCtrl: NavController, 
              private db: AngularFireDatabase, 
              private provider: BarbeariasProvider,
              private http: HTTP,
              private geolocation: Geolocation) {
        this.barbearias = this.provider.getBarbearias();



        this.getDistancia();

  }
  ionViewWillLoad(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latAtual = resp.coords.latitude
      this.lonAtual = resp.coords.longitude
      alert(this.latAtual)
      alert(this.lonAtual)
      }).catch((error) => {
       alert('Error getting location' + error);
      }); 
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

getDistancia(){

  

  this.db.list('/barbearias', { preserveSnapshot: true })
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {

          var nome = snapshot.val().nome;
          var logradouro = snapshot.val().logradouro;
          var localizacao = snapshot.val().localizacao;
          var resultadoDistancia;

          this.http.get('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=AIzaSyBHnWvYeHBzzbos61tJSsAapvhSMBbcYn8', {}, {})
          .then(data => {

            
            resultadoDistancia = data.data; // data received by server
            console.log(resultadoDistancia)
            

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


}
