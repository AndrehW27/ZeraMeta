import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.scss']
})
export class MetasComponent implements OnInit {
  metas = [
    { titulo: 'Investir 100k', progresso: 50 },
    { titulo: 'Aprender francês', progresso: 25 }
  ];

  showFundoModal = false;
  showModal = false;
  novaMeta = { titulo: '', prazo: '', categoria:'', prioridade:'', status:'', descricao:'', progresso: 0 };

  constructor() { }

  ngOnInit(): void {}

  abrirModal() {
    this.novaMeta = { titulo: '', prazo: '', categoria:'', prioridade:'', status:'', descricao:'', progresso: 0 };
    this.showModal = true;
    this.showFundoModal = true;
  }

  fecharModal() {
    this.showModal = false;
    this.showFundoModal = false;
  }

  salvarMeta() {
    if (this.novaMeta.titulo && this.novaMeta.progresso) {
      this.metas.push({ ...this.novaMeta });
      this.fecharModal();
    } else {      
      alert('Por favor, preencha todos os campos.');
    } 
  }
}
