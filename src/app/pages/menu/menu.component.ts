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
  usuarioLogado = '';
  firstName = '';
  qtdMetas = 0;
  criadas = 'criadas';
  itensCarregados = false;

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

      this.perCompleted = data.filter(meta => meta.status === 'Concluído').length / data.length * 100 || 0;

      if(this.qtdMetas == 1){
        this.criadas = 'criada';
      } 
    });
  }

  emBreve(){
    alert('Novidaes em breve!');
  } 
}
