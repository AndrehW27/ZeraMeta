import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.scss']
})
export class MetasComponent implements OnInit {
  metas = [
    { titulo: '', prazo: '', categoria:'', prioridade:'', status:'', descricao:'', progresso: 0, enviarLembrete: false, criarMiniMetas: false }
  ];

  statusOptions = ['Novo', 'Em andamento', 'Pausado', 'Concluído'];
  categoriaOptions = ["Outros", "Saúde", "Finanças", "Educação", "Pessoal", "Relacionamento", "Profissional", "Lazer", "Viagem", "Hobbie"];
  prioridadeOptions = ['Baixa', 'Média', 'Alta'];

  showFundoModal = false;
  showModal = false;
  novaMeta = { titulo: '', prazo: '', categoria:'', prioridade:'', status:'', descricao:'', progresso: 0, enviarLembrete: false, criarMiniMetas: false };

  constructor() { }

  ngOnInit(): void {}

  abrirModal() {
    this.novaMeta = { titulo: '', prazo: '', categoria:'Outros', prioridade:'Média', status:'Novo', descricao:'', progresso: 0, enviarLembrete: false, criarMiniMetas: false };
    this.showModal = true;
    this.showFundoModal = true;
  }

  fecharModal() {
    this.showModal = false;
    this.showFundoModal = false;
  }

  salvarMeta() {
    if (this.novaMeta.titulo) {
      // this.metas.splice(0, 1);
      this.metas[0].progresso = 100;
      this.metas[0].titulo = "Criar primeira meta :D";
      this.metas.push({ ...this.novaMeta });
      this.fecharModal();
      // this.novaMeta = { titulo: '', prazo: '', categoria:'', prioridade:'', status:'', descricao:'', progresso: 0 }; // Limpa os campos
      // alert('Meta salva com sucesso!'+JSON.stringify(this.novaMeta));
    } else {      
      alert('Por favor, preencha todos os campos.');
    } 
  }
}
