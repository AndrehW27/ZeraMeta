import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { BoasVindasComponent } from './pages/boas-vindas/boas-vindas.component';
import { MetasComponent } from './pages/metas/metas.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { GamificacaoComponent } from './pages/gamificacao/gamificacao.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { MiniMetasComponent } from './pages/mini-metas/mini-metas.component';
import { RedefinirSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SugestoesIaComponent } from './pages/sugestoes-ia/sugestoes-ia.component';
import { SenhaPorEmailComponent } from './pages/senha-por-email/senha-por-email.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MetaComponent } from './pages/meta/meta.component';



const routes: Routes = [
  { path: '', redirectTo: 'boas-vindas', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'boas-vindas', component: BoasVindasComponent },
  { path: 'metas', component: MetasComponent },
  { path: 'configuracoes', component: ConfiguracoesComponent },
  { path: 'gamificacao', component: GamificacaoComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'mini-metas', component: MiniMetasComponent },
  { path: 'redefinir-senha', component: RedefinirSenhaComponent },
  { path: 'senha-por-email', component: SenhaPorEmailComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'sugestoes-ia', component: SugestoesIaComponent },
  { path: 'meta', component: MetaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [
  ]
})
export class AppRoutingModule { }
