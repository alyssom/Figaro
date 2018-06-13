import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { BarbeariasProvider } from '../../providers/barbearias/barbearias';
import { HTTP } from '@ionic-native/http';
import { Geolocation } from '@ionic-native/geolocation';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  
  barbearias = [];
  barbearias2 = [];
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


getDistancia(){

  this.geolocation.getCurrentPosition().then((resp) => {
    this.latAtual = resp.coords.latitude
    this.lonAtual = resp.coords.longitude
    
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  this.db.list('/barbearias', { preserveSnapshot: true })
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {

          var nome = snapshot.val().nome;
          var logradouro = snapshot.val().logradouro;
          var localizacao = snapshot.val().localizacao;
          var resultadoDistancia;

          this.http.get('https://maps.googleapis.com/maps/api/distancematrix/json?latlng=imperial&origins=' + this.latAtual + ',' + this.lonAtual + '&destinations='+ localizacao +'&key=AIzaSyBHnWvYeHBzzbos61tJSsAapvhSMBbcYn8', {}, {})
          .then(data => {

            console.log(data.status);
            resultadoDistancia = data.data.rows.elements.distance.text.value; // data received by server
            alert(resultadoDistancia)
            console.log(data.headers);

          })
          .catch(error => {

            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);

          });
          
        }
        )
      }


      )

 
 

}
  

  ionViewDidLoad(){
    
  }

}
