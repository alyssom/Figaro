import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { BarbeariasProvider } from '../../providers/barbearias/barbearias';
import { HTTP } from '@ionic-native/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Subject } from 'rxjs/Subject';



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

  constructor(public navCtrl: NavController, 
              private db: AngularFireDatabase, 
              private provider: BarbeariasProvider,
              private http: HTTP,
              private geolocation: Geolocation) {
        this.barbearias = this.provider.getBarbearias();

        this.getDistancia();

  }
  ionViewWillLoad(){
    
  }

  ngOnInit(){
    this.provider.getBarbeariasSearch(this.startAt, this.endAt)
                .subscribe(barbearias => this.barbearias = barbearias)
  }

  search($event){
    if($event.timeStamp - this.lastKeypress > 200 && $event.target.value != undefined){
      let q = $event.target.value
      this.startAt.next(q)
      this.endAt.next(q+"\uf8ff") 
    }

    this.lastKeypress = $event.timeStamp;

  }

getDistancia(){

  var latAtual;
  var lonAtual;

  this.geolocation.getCurrentPosition().then((resp) => {
    latAtual = resp.coords.latitude
    lonAtual = resp.coords.longitude

    
    }).catch((error) => {
     console.log('Error getting location' + error);
    }); 

  this.db.list('/barbearias', { preserveSnapshot: true })
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {

          var nome = snapshot.val().nome;
          var logradouro = snapshot.val().logradouro;
          var localizacao = snapshot.val().localizacao;
          var resultadoDistancia;

          this.http.get('https://maps.googleapis.com/maps/api/distancematrix/json?latlng=imperial&origins=' + latAtual + ',' + lonAtual + '&destinations='+ snapshot.val().localizacao +'&key=AIzaSyBHnWvYeHBzzbos61tJSsAapvhSMBbcYn8', {}, {})
          .then(data => {

            
            resultadoDistancia = data.data; // data received by server
            
            

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
