import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MapaPage } from '../pages/mapa/mapa';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { FIREBASE_CREDENCIAL } from './firebase.credencial';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarbeariasProvider } from '../providers/barbearias/barbearias';

import { Geolocation } from '@ionic-native/geolocation';
import { HTTP } from '@ionic-native/http';
import { DetalhesBarbeariaPage } from '../pages/detalhes-barbearia/detalhes-barbearia';
import { AgendamentoPage } from '../pages/agendamento/agendamento';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DetalhesBarbeariaPage,
    AgendamentoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CREDENCIAL),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DetalhesBarbeariaPage,
    AgendamentoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarbeariasProvider,
    Geolocation,
    HTTP 
  ]
})
export class AppModule {}
