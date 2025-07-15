import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BoasVindasComponent } from './pages/boas-vindas/boas-vindas.component';
import { MetasComponent } from './pages/metas/metas.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { GamificacaoComponent } from './pages/gamificacao/gamificacao.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { RedefinirSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoasVindasComponent,
    MetasComponent,
    ConfiguracoesComponent,
    GamificacaoComponent,
    CadastroComponent,
    RedefinirSenhaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
