import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeusAgendamentosPage } from './meus-agendamentos';

@NgModule({
  declarations: [
    MeusAgendamentosPage,
  ],
  imports: [
    IonicPageModule.forChild(MeusAgendamentosPage),
  ],
})
export class MeusAgendamentosPageModule {}
