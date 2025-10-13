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
    console.log('userName: '+localStorage.getItem('userName'));
    console.log('userId: '+localStorage.getItem('userId'));
    console.log('token: '+localStorage.getItem('token'));
    this.usuarioLogado = localStorage.getItem('userName') || '';
    // this.usuarioLogado = 'Wellington Willian Gorgo'
    this.firstName = this.usuarioLogado.split(" ")[0];
    this.carregarMetas();
    this.carregarUsuario();
  }

  carregarMetas() { 
      setTimeout(() => {
        this.itensCarregados = true;
        console.log('itensCarregados: '+this.itensCarregados);
      }, 1000);   
      this.metaService.listarMetasPorUsuario(localStorage.getItem('userId') || '123', localStorage.getItem('token') || '123').subscribe(data => {
      console.log('Metas carregadas: ' + JSON.stringify(data)); 
      this.qtdMetas = data.length; 

      this.perCompleted = Math.round(data.filter(meta => meta.status === 'Concluído').length / data.length * 100 || 0);
      
      if(this.qtdMetas == 1){
        this.criadas = 'criada';
      } 
    });
  }

  carregarUsuario(){
    this.usuarioService.getUsuarioComDados(this.userId || '', localStorage.getItem('token') || '123').subscribe(data => {
    console.log("Usuário carregado: " + JSON.stringify(data)); // Exibe mensagem de sucesso    
    this.usuario.nome = data.usuario.nome;
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

  mudarFoto(){
    this.abrirModalFoto = true;
  }

  fecharModalDetalhes(){
    this.abrirModalFoto = false;
  }

  selecionarAvatar1(){
    this.userImage = this.avatar1; 
    this.usuario.foto_perfil_url = this.userImage;
  }
  selecionarAvatar2(){
      this.userImage = this.avatar2; 
      this.usuario.foto_perfil_url = this.userImage;
  } 
  selecionarAvatar3(){
      this.userImage = this.avatar3; 
      this.usuario.foto_perfil_url = this.userImage;
  } 
  selecionarAvatar4(){
      this.userImage = this.avatar4; 
      this.usuario.foto_perfil_url = this.userImage;
  } 
  selecionarAvatar5(){
      this.userImage = this.avatar5; 
      this.usuario.foto_perfil_url = this.userImage;
  }     
  selecionarAvatar6(){
      this.userImage = this.avatar6; 
      this.usuario.foto_perfil_url = this.userImage;
  } 
  selecionarAvatar7(){
      this.userImage = this.avatar7; 
      this.usuario.foto_perfil_url = this.userImage;
  }
  selecionarAvatar8(){      
      this.userImage = this.avatar8; 
      this.usuario.foto_perfil_url = this.userImage;
  }
  selecionarAvatar9(){      
      this.userImage = this.avatar9; 
      this.usuario.foto_perfil_url = this.userImage;
  }   
  selecionarAvatar10(){      
      this.userImage = this.avatar10; 
      this.usuario.foto_perfil_url = this.userImage;
  }   

  emBreve(){
    alert('Novidaes em breve!');
  } 

  salvarFoto(){
    this.usuarioService.editarUsuario(this.usuario, this.userId, localStorage.getItem('token') || '123').subscribe((data) => {
      console.log("Usuário editado: " + JSON.stringify(data));
    });
    this.abrirModalFoto = false;

  }
}
