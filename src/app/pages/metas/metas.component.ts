import { Component, OnInit } from '@angular/core';
import { MetaService } from '../../services/meta.service';
import { log } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.scss']
})
export class MetasComponent implements OnInit {

  perCompleted = 0;
  diff = 0;

  itensCarregados = false;

  showModalDelete = false;
  deletarMetaVar = false;
  // isLoading = false;
  metas: any = [];

  statusOptions = ['Novo', 'Em andamento', 'Pausado', 'Concluído'];
  categoriaOptions = ["Outros", "Saúde", "Finanças", "Educação", "Pessoal", "Relacionamento", "Profissional", "Lazer", "Viagem", "Hobbie"];
  prioridadeOptions = ['Baixa', 'Média', 'Alta'];

  showFundoModal = false;
  showFundoModalDetalhes = false;
  showModalMeta = false;
  showModalDetalhes = false;
  novaMeta = { usuario_id: '', id: 0, titulo: '', prazo: '', categoria: '', prioridade: '', status: '', descricao: '', progresso: 0, enviarLembrete: false, criarMiniMetas: false };
  metaSelecionada = { id: 0, titulo: '', prazo: '', categoria: '', prioridade: '', status: '', descricao: '', progresso: 0, enviarLembrete: false, criarMiniMetas: false };

  constructor(private metaService: MetaService, private router: Router) { }

  userId = localStorage.getItem('userId');
  token = localStorage.getItem('token') || '';

  ngOnInit(): void {

    this.token = localStorage.getItem('token') || '';


    // this.filtrarPorStatus('Todas');

    console.log('Usuário ID:', this.userId);
    console.log('Token:', localStorage.getItem('token'));
    this.carregarMetas();
  }

  carregarMetas() {
    this.itensCarregados = false;
    this.metaService.listarMetasPorUsuario(this.userId || '123', this.token).subscribe(data => {
      this.metas = data;
      console.log('Metas carregadas: ' + JSON.stringify(this.metas));
      setTimeout(() => {
        this.itensCarregados = true;
      }, 1000); // Exibe mensagem de sucesso      
    });
  }

  abrirModal() {
    this.novaMeta = { usuario_id: '', id: Date.now(), titulo: '', prazo: '', categoria: 'Outros', prioridade: 'Baixa', status: 'Novo', descricao: '', progresso: 0, enviarLembrete: false, criarMiniMetas: false };
    this.showModalMeta = true;
    this.showFundoModal = true;
  }

  abrirModalDetalhes(meta: any) {
    console.log('Comp. METAS - Meta antes de editar:', meta);
    localStorage.setItem('meta-titulo', JSON.stringify(meta.titulo));
    localStorage.setItem('meta-miniGoals', JSON.stringify(meta.miniGoals));
    localStorage.setItem('meta-id', JSON.stringify(meta._id));
    localStorage.setItem('meta-prazo', JSON.stringify(meta.prazo));
    localStorage.setItem('meta-categoria', JSON.stringify(meta.categoria));
    localStorage.setItem('meta-prioridade', JSON.stringify(meta.prioridade));
    localStorage.setItem('meta-status', JSON.stringify(meta.status));
    localStorage.setItem('meta-descricao', JSON.stringify(meta.descricao));
    localStorage.setItem('meta-progresso', JSON.stringify(meta.progresso));
    localStorage.setItem('meta-enviarLembrete', JSON.stringify(meta.enviarLembrete));
    // this.novaMeta = { titulo: '', prazo: '', categoria:'Outros', prioridade:'Média', status:'Novo', descricao:'', progresso: 0, enviarLembrete: false, criarMiniMetas: false };
    this.showModalDetalhes = true;
    this.showFundoModalDetalhes = true;
    this.metaSelecionada = { ...meta };
    this.router.navigate(['/meta']); // Cria uma cópia da meta selecionada   
  }

  fecharModal() {
    this.showModalMeta = false;
    this.showFundoModal = false;
  }

  fecharModalDetalhes() {
    this.showModalDetalhes = false;
    this.showFundoModalDetalhes = false;
  }

  // Funções para chamar modal de sucesso/erro podem ser adicionadas aqui
  showModal = false;
  modalType: 'success' | 'error' = 'success';
  modalMessage = '';

  openSuccess(modalType: any, modalMessage: string, showModal: boolean) {
    this.modalType = modalType;
    this.modalMessage = modalMessage;
    this.showModal = showModal;
  }

  openError(modalType: any, modalMessage: string, showModal: boolean) {
    this.modalType = modalType;
    this.modalMessage = modalMessage;
    this.showModal = showModal;
  }

  closeModal() {
    this.showModal = false;
  }
  // final funções para chamar modal de sucesso/erro podem ser adicionadas aqui

  criarMeta() {
    console.log('TENTANDO CRIAR META:', this.token);

    this.novaMeta.usuario_id = this.userId || '';
    if (this.novaMeta.titulo) {
      this.metaService.criarMeta(this.novaMeta, this.token).subscribe(() => {
        // this.carregarMetas();
        this.fecharModal();
      });

      this.openSuccess('success', 'Meta criada com sucesso!', true);

      setTimeout(() => {
        this.closeModal();
        this.carregarMetas();
      }, 2000);

    } else {
      alert('Por favor, preencha Todas os campos.');
    }
  }

  editarMeta() {
    console.log('Meta antes de editar:', this.metaSelecionada);
    this.metaService.editarMeta(this.metaSelecionada, this.token).subscribe(() => {

      this.fecharModalDetalhes();

      this.openSuccess('success', 'Meta editada com sucesso!', true);

      setTimeout(() => {
        this.closeModal();
        this.carregarMetas();
      }, 2000);

    });
  }

  confirmarDelete() {
    this.deletarMetaVar = true;
    this.showModalDelete = false;
    console.log('Meta antes de deletar:', this.metaSelecionada);
    // const confirmacao = confirm('Tem certeza que deseja deletar esta meta?');
    if (this.deletarMetaVar) {
      this.metaService.deletarMeta(this.metaSelecionada, this.token).subscribe(() => {
        // this.carregarMetas();  
        this.fecharModalDetalhes();
      });

      this.openSuccess('success', 'Meta deletada com sucesso!', true);

      setTimeout(() => {
        this.closeModal();
        this.carregarMetas();
      }, 2000);

    }
  }

  cancelarDelete() {
    this.deletarMetaVar = false;
    this.showModalDelete = false;
  }


  deletarMeta() {
    this.showModalDelete = true;
    // this.deletarMetaVar = true;

  }

  get strokeDashOffset() {
    // this.perCompleted = 95;
    this.diff = 100 - this.perCompleted;
    const circumference = 283;
    return circumference - (circumference * this.diff / 100);
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
