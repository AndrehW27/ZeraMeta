import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss']
})
export class MetaComponent implements OnInit {

  constructor() { }

  titulo = '';
  prioridade = '';
  categoria = '';
  status = '';
  descricao = '';
  prazo = '';
  progresso = 0;
  enviarLembrete = false;
  criarMiniMetas = false;
  id = 0;

  ngOnInit(): void {
    console.log('meta-titulo:', localStorage.getItem('meta-titulo'));
    console.log('meta-status:', localStorage.getItem('meta-status'));
    console.log('meta-prazo:', localStorage.getItem('meta-prazo'));
    console.log('meta-categoria:', localStorage.getItem('meta-categoria'));
    console.log('meta-prioridade:', localStorage.getItem('meta-prioridade'));
    console.log('meta-descricao:', localStorage.getItem('meta-descricao'));
    console.log('meta-progresso:', localStorage.getItem('meta-progresso'));
    console.log('meta-enviarLembrete:', localStorage.getItem('meta-enviarLembrete'));
    console.log('meta-id:', localStorage.getItem('meta-id'));    
    
    this.titulo = localStorage.getItem('meta-titulo') || '';
    this.status = localStorage.getItem('meta-status') || '';  
    this.prazo = localStorage.getItem('meta-prazo') || '';
    this.categoria = localStorage.getItem('meta-categoria') || '';
    this.prioridade = localStorage.getItem('meta-prioridade') || '';
    this.descricao = localStorage.getItem('meta-descricao') || '';
    this.progresso = Number(localStorage.getItem('meta-progresso')) || 0;
    this.enviarLembrete = (localStorage.getItem('meta-enviarLembrete') === 'true');
    this.id = Number(localStorage.getItem('meta-id')) || 0;
  }
}
