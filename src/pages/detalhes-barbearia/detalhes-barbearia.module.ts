import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesBarbeariaPage } from './detalhes-barbearia';

@NgModule({
  declarations: [
    DetalhesBarbeariaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesBarbeariaPage),
  ],
})
export class DetalhesBarbeariaPageModule {}
