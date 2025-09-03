import { Component, OnInit } from '@angular/core';
import { MetaService } from '../../services/meta.service';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.scss']
})
export class MetasComponent implements OnInit {
  metas = [
    // Placeholder for when no metas exist
    { id: 0, titulo: '', prazo: '', categoria:'', prioridade:'', status:'', descricao:'', progresso: 0, enviarLembrete: false, criarMiniMetas: false }
    // ,
    // { id: 1, titulo: 'Perder 12% BF', prazo: '4 meses', categoria:'Saúde', prioridade:'Média', status:'Em andamento', descricao:'', progresso: 50, enviarLembrete: false, criarMiniMetas: false },
    // { id: 2, titulo: 'Fazer App Pós', prazo: '6 meses', categoria:'Educação', prioridade:'Alta', status:'Em andamento', descricao:'', progresso:30, enviarLembrete: false, criarMiniMetas: false }
  ];
  
  // metasFiltradas: any[] = [];
  // filtroStatusAtual: string = 'Todas';

  statusOptions = ['Novo', 'Em andamento', 'Pausado', 'Concluído'];
  // statusFiltroOptions = ['Todas', ...this.statusOptions];
  categoriaOptions = ["Outros", "Saúde", "Finanças", "Educação", "Pessoal", "Relacionamento", "Profissional", "Lazer", "Viagem", "Hobbie"];
  prioridadeOptions = ['Baixa', 'Média', 'Alta'];

  showFundoModal = false;
  showFundoModalDetalhes = false;
  showModal = false;
  showModalDetalhes = false;
  novaMeta = { id: 0, titulo: '', prazo: '', categoria:'', prioridade:'', status:'', descricao:'', progresso: 0, enviarLembrete: false, criarMiniMetas: false };
  metaSelecionada = { id: 0, titulo: '', prazo: '', categoria:'', prioridade:'', status:'', descricao:'', progresso: 0, enviarLembrete: false, criarMiniMetas: false };

  constructor(private metaService: MetaService) { }

  ngOnInit(): void {
    // this.filtrarPorStatus('Todas');
    this.carregarMetas();
  }

  carregarMetas() {
    this.metaService.getMetas().subscribe(data => {
    this.metas = data;
    console.log('Metas carregadas: ' + JSON.stringify(this.metas)); // Exibe mensagem de sucesso      
    });
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

  // criarMeta() {
  //   if (this.novaMeta.titulo) {
  //     // Se a única meta for o placeholder, substitui
  //     if (this.metas.length === 1 && !this.metas[0].titulo) {
  //       this.metas = [{ ...this.novaMeta }];
  //     } else {
  //       this.metas.push({ ...this.novaMeta });
  //       // this.novaMeta = { titulo: '', descricao: '' }; // limpa formulário

  //     }
  //     // this.filtrarPorStatus(this.filtroStatusAtual); // Re-aplica o filtro para atualizar a view
  //     this.fecharModal();
  //   } else {      
  //     alert('Por favor, preencha Todas os campos.');
  //   } 
  // }

  criarMeta() {
    if (this.novaMeta.titulo) {
      this.metaService.criarMeta(this.novaMeta).subscribe(() => {
        this.carregarMetas();
        this.fecharModal();
      });
    } else {      
      alert('Por favor, preencha Todas os campos.');
    } 
  }

  editarMeta() {   
    this.metaService.editarMeta(this.metaSelecionada).subscribe(() => {
      this.carregarMetas();  
      this.fecharModalDetalhes();
    });
  }

  deletarMeta() {
    const confirmacao = confirm('Tem certeza que deseja deletar esta meta?');
    if (confirmacao) {
      this.metaService.deletarMeta(this.metaSelecionada).subscribe(() => {
        this.carregarMetas();  
        this.fecharModalDetalhes();
      });
    }
  }

  // filtrarPorStatus(status: string): void {

  //   this.metaService.getMetas().subscribe(data => {
  //   this.metas = data;
  //   console.log('this.metas: ' + JSON.stringify(this.metas)); // Exibe mensagem de sucesso

  //   });

  //   this.filtroStatusAtual = status;
  //   const metasReais = this.metas.filter(m => m.titulo); // Garante que o placeholder não seja exibido
  //   if (status === 'Todas') {
  //     this.metasFiltradas = metasReais;

  //   } else {
  //     this.metasFiltradas = metasReais.filter(meta => meta.status === status);
  //   }
  // }
}
