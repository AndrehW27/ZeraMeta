import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetaService } from 'src/app/services/meta.service';

@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss']
})
export class MetaComponent implements OnInit {

  constructor(private metaService: MetaService, private router: Router) { }

  isLoading = false;

  userId = localStorage.getItem('userId');
  token = localStorage.getItem('token') || '';

  showModal = false;
  showModalDeleteGoal = false;
  showModalMini = false;
  showAi = false;

  // miniGoals: { titulo: string; concluido: boolean }[] = [{ titulo: 'Primeira mini meta', concluido: true }, { titulo: 'Segunda mini metaaaaa', concluido: false }];
  miniGoals: { titulo: string; concluido: boolean }[] = [];
  miniGoalToEdit: any;
  inputNewminiGoalModel = '';

  statusOptions = ['Novo', 'Em andamento', 'Pausado', 'Concluído'];
  categoriaOptions = ["Outros", "Saúde", "Finanças", "Educação", "Pessoal", "Relacionamento", "Profissional", "Lazer", "Viagem", "Hobbie"];
  prioridadeOptions = ['Baixa', 'Média', 'Alta'];

  titulo = '';
  prioridade = '';
  categoria = '';
  status = '';
  descricao = '';
  prazo = '';
  progresso = 0;
  enviarLembrete = false;
  criarMiniMetas = false;
  id: string | null = null;
  itensCarregados = false;
  perCompleted = 0;
  diff = 0;

  metaSelecionada = { _id: this.id, titulo: this.titulo, prazo: this.prazo, categoria: this.categoria, prioridade: this.prioridade, status: this.status, descricao: this.descricao, progresso: this.progresso, enviarLembrete: this.enviarLembrete, criarMiniMetas: this.criarMiniMetas, miniGoals: this.miniGoals };

  // Funções para chamar modal de sucesso/erro podem ser adicionadas aqui
  showModalComponent = false;
  modalType: 'success' | 'error' = 'success';
  modalMessage = '';

  openSuccess(modalType: any, modalMessage: string, showModalComponent: boolean) {
    this.modalType = modalType;
    this.modalMessage = modalMessage;
    this.showModalComponent = showModalComponent;
  }

  openError(modalType: any, modalMessage: string, showModalComponent: boolean) {
    this.modalType = modalType;
    this.modalMessage = modalMessage;
    this.showModalComponent = showModalComponent;
  }

  closeModalComponent() {
    this.showModalComponent = false;
  }
  // final funções para chamar modal de sucesso/erro podem ser adicionadas aqui

  ngOnInit(): void {
    console.log('LOCAL STORAGE Meta ID:', localStorage.getItem('meta-id'));
    console.log('LOCAL STORAGE Meta Titulo:', localStorage.getItem('meta-titulo'));


    try {
      const rawId = localStorage.getItem('meta-id') || '';
      this.id = rawId !== null ? JSON.parse(rawId) : null;
      this.metaSelecionada._id = this.id;

      const rawTitulo = localStorage.getItem('meta-titulo') || '';
      this.titulo = rawTitulo !== null ? JSON.parse(rawTitulo) : '';
      this.metaSelecionada.titulo = this.titulo;

      // <<-- CHANGED: use safe parser for miniGoals
      this.miniGoals = this.parseLocalStorage<{ titulo: string; concluido: boolean }[]>('meta-miniGoals', []);
      console.log('this.miniGoals:', this.miniGoals);
      this.metaSelecionada.miniGoals = this.miniGoals;
      console.log('this.metaSelecionada.miniGoals:', this.metaSelecionada.miniGoals);
      // --<<

      // const rawminiGoals = localStorage.getItem('meta-miniGoals') || '';
      // console.log('rawminiGoals:', rawminiGoals);
      // this.miniGoals = rawminiGoals !== null ? JSON.parse(rawminiGoals) : [];
      // console.log('this.miniGoals:', this.miniGoals);
      // this.metaSelecionada.miniGoals = this.miniGoals;
      // console.log('this.metaSelecionada.miniGoals:', this.metaSelecionada.miniGoals);

      const rawStatus = localStorage.getItem('meta-status') || '';
      this.status = rawStatus !== null ? JSON.parse(rawStatus) : '';
      this.metaSelecionada.status = this.status;

      const rawCategoria = localStorage.getItem('meta-categoria') || 'teste';
      this.categoria = rawCategoria !== null ? JSON.parse(rawCategoria) : '';
      this.metaSelecionada.categoria = this.categoria;

      const rawPrioridade = localStorage.getItem('meta-prioridade') || '';
      this.prioridade = rawPrioridade !== null ? JSON.parse(rawPrioridade) : '';
      this.metaSelecionada.prioridade = this.prioridade;

      const rawDescricao = localStorage.getItem('meta-descricao') || '';
      this.descricao = rawDescricao !== null ? JSON.parse(rawDescricao) : '';
      this.metaSelecionada.descricao = this.descricao;

      const rawPrazo = localStorage.getItem('meta-prazo') || '';
      this.prazo = rawPrazo !== null ? JSON.parse(rawPrazo) : '';
      this.metaSelecionada.prazo = this.prazo;

      const rawProgresso = localStorage.getItem('meta-progresso') || '0';
      this.progresso = rawProgresso !== null ? JSON.parse(rawProgresso) : 0;
      this.perCompleted = this.progresso;
      this.metaSelecionada.progresso = this.progresso;

      // const rawEnviarLembrete = localStorage.getItem('meta-enviarLembrete') || 'false';
      // this.enviarLembrete = rawEnviarLembrete.replace(/^"(.*)"$/, '$1') === 'true';
      // this.metaSelecionada.enviarLembrete = this.enviarLembrete;
    } catch (err) {
      console.error('Erro ao ler meta do localStorage:', err);
      // fallback seguro
      this.titulo = '';
      this.miniGoals = [];
      this.id = null;
      this.prazo = this.categoria = this.prioridade = this.status = this.descricao = '';
      this.progresso = 0;
    }

    this.careregarItens();

  }

  private parseLocalStorage<T>(key: string, fallback: T): T {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    try {
      return JSON.parse(raw) as T;
    } catch (err) {
      console.warn(`Failed to parse localStorage.${key}:`, err);
      return fallback;
    }
  }



  careregarItens() {
    setTimeout(() => {
      this.itensCarregados = true;
      console.log('itensCarregados: ' + this.itensCarregados);
    }, 1000);
  }

  get strokeDashOffset() {
    // this.perCompleted = 95;
    this.diff = 100 - this.perCompleted;
    const circumference = 283;
    return circumference - (circumference * this.diff / 100);
  }

  // ...existing code...
  addminiGoal() {
    const title = (this.inputNewminiGoalModel ?? '').toString().trim();
    if (!title) return;

    const newMini = { titulo: title, concluido: false };
    // atualiza local (optimistic update)
    this.miniGoals.push(newMini);

    // assegura a propriedade com o nome esperado pelo backend (ex: miniGoals)
    if (!this.metaSelecionada) this.metaSelecionada = {} as any;
    this.metaSelecionada.miniGoals = this.miniGoals;

    const token = localStorage.getItem('token') || '';
    console.log('PUT payload (antes da requisição):', this.metaSelecionada);

    this.metaService.editarMeta(this.metaSelecionada, token).subscribe({
      next: res => {
        console.log('Editar meta resposta:', res);
        this.inputNewminiGoalModel = '';
        // opcional: atualizar miniGoals com o que veio do servidor
        if (res?.miniGoals) this.miniGoals = res.miniGoals;
      },
      error: err => {
        console.error('Erro ao salvar sub-meta:', err);
        // rollback se necessário
        this.miniGoals = this.miniGoals.filter(m => m !== newMini);
        this.metaSelecionada.miniGoals = [...this.miniGoals];
      }
    });
  }



  editGoal() {
    this.showModal = true;
    // console.log('this.showModal: '+this.showModal);
  }

  closeModal() {
    this.showModal = false;
    // console.log('this.showModal: '+this.showModal);
  }

  aiSuggestion() {
    this.showAi = true;
  }

  closeAiSuggestion() {
    this.showAi = false;
  }

  editminiGoal(mini: any) {
    this.showModalMini = true;
    // console.log('inputNewminiGoalModel: ' + JSON.stringify(mini));
    // console.log('this.miniGoals: ' + JSON.stringify(this.miniGoals));
    this.miniGoalToEdit = { ...mini };
    localStorage.setItem('index-miniGoal-to-edit', this.miniGoals.indexOf(mini).toString());
    console.log('Indice:', localStorage.getItem('index-miniGoal-to-edit'));

    console.log('this.miniGoalToEdit: ' + JSON.stringify(this.miniGoalToEdit));

    // this.metaSelecionada.miniGoals = this.miniGoals;

  }

  salvarEdicaominiGoal() {
    const index = parseInt(localStorage.getItem('index-miniGoal-to-edit') || '0', 10);
    this.miniGoals[index] = this.miniGoalToEdit;
    console.log('Mini Goals após edição:', this.miniGoals);
    this.metaSelecionada.miniGoals = this.miniGoals;
    console.log('this.metaSelecionada após edição:', JSON.stringify(this.metaSelecionada));
    localStorage.setItem('meta-miniGoals', JSON.stringify(this.metaSelecionada.miniGoals));
    this.metaService.editarMeta(this.metaSelecionada, this.token).subscribe(() => {
      // this.openSuccess('success', 'Mini meta editada com sucesso!', true);
      // setTimeout(() => {
      //   this.closeMiniModal();
      // }, 2000);
    });
    this.closeMiniModal();
  }

  closeMiniModal() {
    this.showModalMini = false;
  }

  salvarEdicaoMeta() {
    this.metaSelecionada = { _id: this.id, titulo: this.titulo, prazo: this.prazo, categoria: this.categoria, prioridade: this.prioridade, status: this.status, descricao: this.descricao, progresso: this.progresso, enviarLembrete: this.enviarLembrete, criarMiniMetas: this.criarMiniMetas, miniGoals: this.miniGoals };
    this.perCompleted = this.progresso;
    console.log('Comp. META - Meta antes de editar:', this.metaSelecionada);

    localStorage.setItem('meta-titulo', JSON.stringify(this.metaSelecionada.titulo));
    localStorage.setItem('meta-prazo', JSON.stringify(this.metaSelecionada.prazo));
    localStorage.setItem('meta-categoria', JSON.stringify(this.metaSelecionada.categoria));
    localStorage.setItem('meta-prioridade', JSON.stringify(this.metaSelecionada.prioridade));
    localStorage.setItem('meta-status', JSON.stringify(this.metaSelecionada.status));
    localStorage.setItem('meta-descricao', JSON.stringify(this.metaSelecionada.descricao));
    localStorage.setItem('meta-progresso', JSON.stringify(this.metaSelecionada.progresso));
    localStorage.setItem('meta-enviarLembrete', JSON.stringify(this.metaSelecionada.enviarLembrete));


    this.metaService.editarMeta(this.metaSelecionada, this.token).subscribe(() => {
      // this.openSuccess('success', 'Meta editada com sucesso!', true);
      this.closeModal();
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.openSuccess('success', 'Meta editada com sucesso!', true);
        setTimeout(() => {
          this.showModalComponent = false;
        }, 1000);
      }, 1000);
    });
  }

  // ...existing code...
  onToggleminiGoal(mini: any, index: number) {
    // mini.concluido já foi atualizado pelo ngModel (atualização otimista)
    const updatedMini = { ...mini };

    // mantenha metaSelecionada sincronizada (opcional)
    if (this.metaSelecionada) {
      this.metaSelecionada.miniGoals = this.metaSelecionada.miniGoals || [];
      this.metaSelecionada.miniGoals[index] = updatedMini;
    }

    //Atualize o localStorage
    localStorage.setItem('meta-miniGoals', JSON.stringify(this.metaSelecionada.miniGoals));

    // Chame o serviço para salvar — ajuste para sua API (ex.: editarminiGoal, editarMeta, etc.)
    this.metaService.editarMeta(this.metaSelecionada, this.token).subscribe({
      next: () => {
        console.log('mini-goal salvo', updatedMini);
      },
      error: (err) => {
        console.error('Erro ao salvar mini-goal', err);
        // reverter mudança em caso de erro
        this.miniGoals[index].concluido = !this.miniGoals[index].concluido;
      }
    });
  }

  desejaExcluirMeta() {
    this.showModalDeleteGoal = true;
  }

  closeMiniModalDelete() {
    this.showModalDeleteGoal = false;
  }

  excluirMeta() {
    console.log('Tentando excluir essa meta:', this.metaSelecionada);
    if (this.metaSelecionada) {
      this.metaService.deletarMeta(this.metaSelecionada, this.token).subscribe(() => {
        console.log('Meta excluída com sucesso');
        // Redirecionar para a página de metas após exclusão
        this.closeModal();
        this.router.navigate(['/metas']);
      }, (error) => {
        console.error('Erro ao excluir meta:', error);
      });
    } else {
      console.error('ID da meta não encontrado. Não é possível excluir.');
    }
  }

  excluirSubmeta() {

    const index = parseInt(localStorage.getItem('index-miniGoal-to-edit') || '0', 10);
    this.miniGoals.splice(index, 1);
    console.log('Mini Goals após exclusão:', this.miniGoals);
    this.metaSelecionada.miniGoals = this.miniGoals;
    console.log('this.metaSelecionada após exclusão:', JSON.stringify(this.metaSelecionada));

    localStorage.setItem('meta-miniGoals', JSON.stringify(this.metaSelecionada.miniGoals));



    this.metaService.editarMeta(this.metaSelecionada, this.token).subscribe(() => {
      // this.openSuccess('success', 'Meta editada com sucesso!', true);
      // setTimeout(() => {
      //   this.closeModal();
      // }, 2000);
    });
    this.closeMiniModal();
  }




}
