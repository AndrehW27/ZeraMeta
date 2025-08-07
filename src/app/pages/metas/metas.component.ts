import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.scss']
})
export class MetasComponent implements OnInit {
  metas = [
    // Placeholder for when no metas exist
    { id: 0, titulo: '', prazo: '', categoria:'', prioridade:'', status:'', descricao:'', progresso: 0, enviarLembrete: false, criarMiniMetas: false },
    { id: 1, titulo: 'Perder 12% BF', prazo: '4 meses', categoria:'Saúde', prioridade:'Média', status:'Em andamento', descricao:'', progresso: 50, enviarLembrete: false, criarMiniMetas: false },
    { id: 2, titulo: 'Fazer App Pós', prazo: '6 meses', categoria:'Educação', prioridade:'Alta', status:'Em andamento', descricao:'', progresso:30, enviarLembrete: false, criarMiniMetas: false }
  ];
  
  metasFiltradas: any[] = [];
  filtroStatusAtual: string = 'Todas';

  statusOptions = ['Novo', 'Em andamento', 'Pausado', 'Concluído'];
  statusFiltroOptions = ['Todas', ...this.statusOptions];
  categoriaOptions = ["Outros", "Saúde", "Finanças", "Educação", "Pessoal", "Relacionamento", "Profissional", "Lazer", "Viagem", "Hobbie"];
  prioridadeOptions = ['Baixa', 'Média', 'Alta'];

  showFundoModal = false;
  showFundoModalDetalhes = false;
  showModal = false;
  showModalDetalhes = false;
  novaMeta = { id: 0, titulo: '', prazo: '', categoria:'', prioridade:'', status:'', descricao:'', progresso: 0, enviarLembrete: false, criarMiniMetas: false };
  metaSelecionada = { id: 0, titulo: '', prazo: '', categoria:'', prioridade:'', status:'', descricao:'', progresso: 0, enviarLembrete: false, criarMiniMetas: false };

  constructor() { }

  ngOnInit(): void {
    this.filtrarPorStatus('Todas');
  }

  abrirModal() {
    this.novaMeta = { id: Date.now(), titulo: '', prazo: '', categoria:'Outros', prioridade:'Baixa', status:'Novo', descricao:'', progresso: 0, enviarLembrete: false, criarMiniMetas: false };
    this.showModal = true;
    this.showFundoModal = true;
  }

  abrirModalDetalhes(meta: any) {
    // this.novaMeta = { titulo: '', prazo: '', categoria:'Outros', prioridade:'Média', status:'Novo', descricao:'', progresso: 0, enviarLembrete: false, criarMiniMetas: false };
    this.showModalDetalhes = true;
    this.showFundoModalDetalhes = true;
    this.metaSelecionada = { ...meta }; // Cria uma cópia da meta selecionada   
  }

  fecharModal() {
    this.showModal = false;
    this.showFundoModal = false;
  }

  fecharModalDetalhes() {
    this.showModalDetalhes = false;
    this.showFundoModalDetalhes = false;
  }

  criarMeta() {
    if (this.novaMeta.titulo) {
      // Se a única meta for o placeholder, substitui
      if (this.metas.length === 1 && !this.metas[0].titulo) {
        this.metas = [{ ...this.novaMeta }];
      } else {
        this.metas.push({ ...this.novaMeta });
      }
      this.filtrarPorStatus(this.filtroStatusAtual); // Re-aplica o filtro para atualizar a view
      this.fecharModal();
    } else {      
      alert('Por favor, preencha Todas os campos.');
    } 
  }

  salvarMeta() {   
    // console.log('this.metasFiltradas: ' + JSON.stringify(this.metasFiltradas)); // Exibe mensagem de sucesso
    const index = this.metas.findIndex(meta => meta.id === this.metaSelecionada.id);
    // console.log('index: ' + index); // Exibe mensagem de sucesso

    this.metas[index] = { ...this.metaSelecionada};
    console.log('this.metas[index]: ' + JSON.stringify(this.metas[index])); // Exibe mensagem de sucesso
    console.log('this.metaSelecionada: ' + JSON.stringify(this.metaSelecionada)); // Exibe mensagem de sucesso

    this.metasFiltradas[index-1] = { ...this.metas[index] }; // Atualiza a meta existente
       
    this.fecharModalDetalhes();
  }

  filtrarPorStatus(status: string): void {
    this.filtroStatusAtual = status;
    const metasReais = this.metas.filter(m => m.titulo); // Garante que o placeholder não seja exibido
    if (status === 'Todas') {
      this.metasFiltradas = metasReais;
    console.log('this.metasFiltradas: ' + JSON.stringify(this.metasFiltradas)); // Exibe mensagem de sucesso

    } else {
      this.metasFiltradas = metasReais.filter(meta => meta.status === status);
    }
  }
}
