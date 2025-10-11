import { Component, OnInit } from '@angular/core';
import { MetaService } from 'src/app/services/meta.service';  

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private metaService: MetaService) { }

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
  userImage = ''; 

  ngOnInit(): void {
    console.log('userName: '+localStorage.getItem('userName'));
    console.log('userId: '+localStorage.getItem('userId'));
    console.log('token: '+localStorage.getItem('token'));
    this.usuarioLogado = localStorage.getItem('userName') || '';
    // this.usuarioLogado = 'Wellington Willian Gorgo'
    this.firstName = this.usuarioLogado.split(" ")[0];
    this.carregarMetas();
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
    this.abrirModalFoto = false;
  }
  selecionarAvatar2(){
      this.userImage = this.avatar2; 
    this.abrirModalFoto = false;
  } 
  selecionarAvatar3(){
      this.userImage = this.avatar3; 
    this.abrirModalFoto = false;
  } 
  selecionarAvatar4(){
      this.userImage = this.avatar4; 
    this.abrirModalFoto = false;
  } 
  selecionarAvatar5(){
      this.userImage = this.avatar5; 
    this.abrirModalFoto = false;
  }     
  selecionarAvatar6(){
      this.userImage = this.avatar6; 
    this.abrirModalFoto = false;
  } 
  

  emBreve(){
    alert('Novidaes em breve!');
  } 
}
