import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MapaPage } from '../pages/mapa/mapa';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';

import { FIREBASE_CREDENCIAL } from './firebase.credencial';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarbeariasProvider } from '../providers/barbearias/barbearias';

import { Geolocation } from '@ionic-native/geolocation';
import { HTTP } from '@ionic-native/http';
import { DetalhesBarbeariaPage } from '../pages/detalhes-barbearia/detalhes-barbearia';
import { AgendamentoPage } from '../pages/agendamento/agendamento';
import { LoginPage } from '../pages/login/login';
import { MeusAgendamentosPage } from '../pages/meus-agendamentos/meus-agendamentos';
import { CadastroPage } from '../pages/cadastro/cadastro';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DetalhesBarbeariaPage,
    AgendamentoPage,
    LoginPage,
    MeusAgendamentosPage,
    CadastroPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CREDENCIAL),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DetalhesBarbeariaPage,
    AgendamentoPage,
    LoginPage,
    MeusAgendamentosPage,
    CadastroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarbeariasProvider,
    Geolocation,
    HTTP,
    GooglePlus
  ]
})
export class AppModule {}
