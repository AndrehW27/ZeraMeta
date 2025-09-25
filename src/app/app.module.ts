import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BoasVindasComponent } from './pages/boas-vindas/boas-vindas.component';
import { MetasComponent } from './pages/metas/metas.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { GamificacaoComponent } from './pages/gamificacao/gamificacao.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { RedefinirSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';
import { MiniMetasComponent } from './pages/mini-metas/mini-metas.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SugestoesIaComponent } from './pages/sugestoes-ia/sugestoes-ia.component';
import { ModalMessageComponent } from './pages/modal-message/modal-message.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { SenhaPorEmailComponent } from './pages/senha-por-email/senha-por-email.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoasVindasComponent,
    MetasComponent,
    ConfiguracoesComponent,
    GamificacaoComponent,
    CadastroComponent,
    RedefinirSenhaComponent,
    MiniMetasComponent,
    PerfilComponent,
    SugestoesIaComponent,
    ModalMessageComponent,
    LoadingComponent,
    SenhaPorEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
