import { Component, OnInit } from '@angular/core';
import { MetaService } from 'src/app/services/meta.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private metaService: MetaService, private usuarioService: UsuarioService) { }

  usuario = {
    nome: '',
    email: '',
    telefone: '',
    plano: '',
    foto_perfil_url: '',
    tema: '',
    notificacoes: true
  };

  goalsAmount = 0;
  goals100Amount = 0;
  goals75mount = 0;
  goals50Amount = 0;
  goals25Amount = 0;
  totalXp = 0;
  level = 0; // Exemplo de XP
  titulo = '';

  userId = localStorage.getItem('userId');

  perCompleted = 0;
  diff = 0;
  usuarioLogado = '';
  firstName = '';
  qtdMetas = 0;
  criadas = 'criadas';
  itensCarregados = false;
  abrirModalFoto = false;
  avatar1 = '../../../assets/avatares/avatar1.png';
  avatar2 = '../../../assets/avatares/avatar2.png';
  avatar3 = '../../../assets/avatares/avatar3.png';
  avatar4 = '../../../assets/avatares/avatar4.png';
  avatar5 = '../../../assets/avatares/avatar5.png';
  avatar6 = '../../../assets/avatares/avatar6.png';
  avatar7 = '../../../assets/avatares/avatar7.png';
  avatar8 = '../../../assets/avatares/avatar8.png';
  avatar9 = '../../../assets/avatares/avatar9.png';
  avatar10 = '../../../assets/avatares/avatar10.png';
  userImage = '';

  ngOnInit(): void {
    console.log('userName: ' + localStorage.getItem('userName'));
    console.log('leve: ' + localStorage.getItem('level'));
    this.level = parseInt(localStorage.getItem('level') || '0', 10);
    console.log('totalXp: ' + localStorage.getItem('total-xp'));
    this.totalXp = parseInt(localStorage.getItem('total-xp') || '0', 10);
    console.log('tituloXp: ' + localStorage.getItem('titulo-xp'));
    this.titulo = localStorage.getItem('titulo-xp') || '';
    console.log('userId: ' + localStorage.getItem('userId'));
    console.log('token: ' + localStorage.getItem('token'));
    this.usuarioLogado = localStorage.getItem('userName') || '';
    // this.usuarioLogado = 'Wellington Willian Gorgo'

    this.carregarMetas();
    this.carregarUsuario();
  }

  carregarMetas() {
    setTimeout(() => {
      this.itensCarregados = true;
      // console.log('itensCarregados: '+this.itensCarregados);
    }, 1000);
    this.metaService.listarMetasPorUsuario(localStorage.getItem('userId') || '123', localStorage.getItem('token') || '123').subscribe(data => {
      // console.log('Metas carregadas: ' + JSON.stringify(data)); 
      this.qtdMetas = data.length;

      this.perCompleted = Math.round(data.filter(meta => meta.status === 'Concluído').length / data.length * 100 || 0);

      if (this.qtdMetas == 1) {
        this.criadas = 'criada';
      }
    });
  }

  carregarUsuario() {
    this.usuarioService.getUsuarioComDados(this.userId || '', localStorage.getItem('token') || '123').subscribe(data => {
      // console.log("Usuário carregado: " + JSON.stringify(data)); // Exibe mensagem de sucesso    
      this.usuario.nome = data.usuario.nome;
      this.firstName = this.usuario.nome.split(" ")[0];
      this.usuario.email = data.usuario.email;
      // this.usuario.senha = data.usuario.senha;
      this.usuario.telefone = data.usuario.telefone;
      this.usuario.plano = data.usuario.plano;
      this.usuario.foto_perfil_url = data.usuario.foto_perfil_url;
      this.userImage = this.usuario.foto_perfil_url;
    });
  }

  get strokeDashOffset() {
    // this.perCompleted = 95;
    this.diff = 100 - this.perCompleted;
    const circumference = 283;
    return circumference - (circumference * this.diff / 100);
  }

  mudarFoto() {
    this.abrirModalFoto = true;
  }

  fecharModalDetalhes() {
    this.abrirModalFoto = false;
  }

  selecionarAvatar1() {
    this.userImage = this.avatar1;
    this.usuario.foto_perfil_url = this.userImage;
  }
  selecionarAvatar2() {
    this.userImage = this.avatar2;
    this.usuario.foto_perfil_url = this.userImage;
  }
  selecionarAvatar3() {
    this.userImage = this.avatar3;
    this.usuario.foto_perfil_url = this.userImage;
  }
  selecionarAvatar4() {
    this.userImage = this.avatar4;
    this.usuario.foto_perfil_url = this.userImage;
  }
  selecionarAvatar5() {
    this.userImage = this.avatar5;
    this.usuario.foto_perfil_url = this.userImage;
  }
  selecionarAvatar6() {
    this.userImage = this.avatar6;
    this.usuario.foto_perfil_url = this.userImage;
  }
  selecionarAvatar7() {
    this.userImage = this.avatar7;
    this.usuario.foto_perfil_url = this.userImage;
  }
  selecionarAvatar8() {
    this.userImage = this.avatar8;
    this.usuario.foto_perfil_url = this.userImage;
  }
  selecionarAvatar9() {
    this.userImage = this.avatar9;
    this.usuario.foto_perfil_url = this.userImage;
  }
  selecionarAvatar10() {
    this.userImage = this.avatar10;
    this.usuario.foto_perfil_url = this.userImage;
  }

  emBreve() {
    alert('Novidaes em breve!');
  }

  salvarFoto() {
    this.usuarioService.editarUsuario(this.usuario, this.userId, localStorage.getItem('token') || '123').subscribe((data) => {
      console.log("Usuário editado: " + JSON.stringify(data));
    });
    this.abrirModalFoto = false;
    this.itensCarregados = false;
    setTimeout(() => {
      this.itensCarregados = true;
      // console.log('itensCarregados: '+this.itensCarregados);
    }, 1000);

  }

  caculateTotalXpAndLevel() {
    this.metaService.listarMetasPorUsuario(localStorage.getItem('userId') || '123', localStorage.getItem('token') || '123').subscribe(data => {
      // console.log('Metas carregadas: ' + JSON.stringify(data));
      this.goalsAmount = data.length;
      console.log('Quantidade de metas: ' + this.goalsAmount);
      this.goals100Amount = data.filter((meta: any) => meta.progresso === 100).length;
      console.log('Quantidade de metas 100: ' + this.goals100Amount);
      this.goals75mount = data.filter((meta: any) => meta.progresso >= 75 && meta.progresso < 100).length;
      console.log('Quantidade de metas 75: ' + this.goals75mount);
      this.goals50Amount = data.filter((meta: any) => meta.progresso >= 50 && meta.progresso < 75).length;
      console.log('Quantidade de metas 50: ' + this.goals50Amount);
      this.goals25Amount = data.filter((meta: any) => meta.progresso >= 25 && meta.progresso < 50).length;
      console.log('Quantidade de metas 25: ' + this.goals25Amount);

      this.totalXp = (this.goalsAmount * 100) + (this.goals100Amount * 1000) + (this.goals75mount * 750) + (this.goals50Amount * 500) + (this.goals25Amount * 250);
      console.log('Total de XP: ' + this.totalXp);
      localStorage.setItem('total-xp', this.totalXp.toString());
      this.level = Math.floor(this.totalXp / 1000);
      console.log('Nível calculado: ' + this.level);
      localStorage.setItem('level', this.level.toString());

      // this.totalXp = 16000;

      if (this.totalXp < 1000) {
        this.titulo = 'Novato';
      } else if (this.totalXp >= 1000 && this.totalXp < 5000) {
        this.titulo = 'Focado';
      } else if (this.totalXp >= 5000 && this.totalXp < 15000) {
        this.titulo = 'Confiante';
      } else {
        this.titulo = 'Determinado';
      }
      localStorage.setItem('titulo-xp', this.titulo);

    });
  }

}
