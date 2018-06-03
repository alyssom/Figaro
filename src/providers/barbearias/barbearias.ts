import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the BarbeariasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BarbeariasProvider {

  constructor(private db: AngularFireDatabase) {
  }

  getBarbearias(){
    let barbearias = [];
    this.db.list('/barbearias', { preserveSnapshot: true })
        .subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            barbearias.push(snapshot.val());
          }
        )
      }
    )
    return barbearias;
  }

}
