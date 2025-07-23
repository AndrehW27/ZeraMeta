import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { BoasVindasComponent } from './pages/boas-vindas/boas-vindas.component';
import { MetasComponent } from './pages/metas/metas.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { GamificacaoComponent } from './pages/gamificacao/gamificacao.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { DetalhesMetaComponent } from './pages/detalhes-meta/detalhes-meta.component';
import { MiniMetasComponent } from './pages/mini-metas/mini-metas.component';
import { RedefinirSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';

const routes: Routes = [
  { path: '', redirectTo: 'boas-vindas', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'boas-vindas', component: BoasVindasComponent },
  { path: 'metas', component: MetasComponent },
  { path: 'configuracoes', component: ConfiguracoesComponent },
  { path: 'gamificacao', component: GamificacaoComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'mini-metas', component: MiniMetasComponent },
  { path: 'detalhes-meta', component: DetalhesMetaComponent },
  { path: 'redefinir-senha', component: RedefinirSenhaComponent }
,];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
