import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { MetaService } from 'src/app/services/meta.service';

@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss']
})
export class MetaComponent implements OnInit {

  constructor(private metaService: MetaService) { }

  userId = localStorage.getItem('userId');
  token = localStorage.getItem('token') || '';

  showModal = false;
  showModalMini = false;
  showAi = false;

  minigoals: { titulo: string; concluido: boolean }[] = [{ titulo: 'Primeira mini meta', concluido: true }, { titulo: 'Segunda mini metaaaaa', concluido: false }];
  minigoalToEdit: any;
  inputNewMiniGoalModel = '';

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
  id = '';
  itensCarregados = false;
  perCompleted = 0;
  diff = 0;

  metaSelecionada = { _id: this.id, titulo: this.titulo, prazo: this.prazo, categoria: this.categoria, prioridade: this.prioridade, status: this.status, descricao: this.descricao, progresso: this.progresso, enviarLembrete: this.enviarLembrete, criarMiniMetas: this.criarMiniMetas };


  ngOnInit(): void {
    console.log('LOCAL STORAGE Meta ID:', localStorage.getItem('meta-id'));
    console.log('LOCAL STORAGE Meta Titulo:', localStorage.getItem('meta-titulo'));


    const rawId = localStorage.getItem('meta-id') || '';
    this.id = rawId.replace(/^"(.*)"$/, '$1');
    this.metaSelecionada._id = this.id;
    // console.log('LOCAL STORAGE Meta ID2:', this.id);

    // console.log('Meta Selecionada:', JSON.stringify(this.metaSelecionada));
    // console.log('Meta ID:', this.metaSelecionada._id);

    const rawTitulo = localStorage.getItem('meta-titulo') || '';
    // console.log('LOCAL STORAGE Meta Titulo:', localStorage.getItem('meta-titulo'));

    this.titulo = rawTitulo.replace(/^"(.*)"$/, '$1');
    this.metaSelecionada.titulo = this.titulo;

    const rawStatus = localStorage.getItem('meta-status') || '';
    this.status = rawStatus.replace(/^"(.*)"$/, '$1');
    this.metaSelecionada.status = this.status;

    const rawCategoria = localStorage.getItem('meta-categoria') || 'teste';
    this.categoria = rawCategoria.replace(/^"(.*)"$/, '$1');
    this.metaSelecionada.categoria = this.categoria;

    const rawPrioridade = localStorage.getItem('meta-prioridade') || '';
    this.prioridade = rawPrioridade.replace(/^"(.*)"$/, '$1');
    this.metaSelecionada.prioridade = this.prioridade;

    const rawDescricao = localStorage.getItem('meta-descricao') || '';
    this.descricao = rawDescricao.replace(/^"(.*)"$/, '$1');
    this.metaSelecionada.descricao = this.descricao;

    const rawPrazo = localStorage.getItem('meta-prazo') || '';
    this.prazo = rawPrazo.replace(/^"(.*)"$/, '$1');
    this.metaSelecionada.prazo = this.prazo;

    const rawProgresso = localStorage.getItem('meta-progresso') || '0';
    this.progresso = parseInt(rawProgresso.replace(/^"(.*)"$/, '$1'), 10);
    this.perCompleted = this.progresso;
    this.metaSelecionada.progresso = this.progresso;

    const rawEnviarLembrete = localStorage.getItem('meta-enviarLembrete') || 'false';
    this.enviarLembrete = rawEnviarLembrete.replace(/^"(.*)"$/, '$1') === 'true';
    this.metaSelecionada.enviarLembrete = this.enviarLembrete;

    this.careregarItens();

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

  addMinigoal(inputNewMiniGoalModel: any) {
    this.minigoals.push({ titulo: this.inputNewMiniGoalModel, concluido: false });
    this.inputNewMiniGoalModel = '';
    console.log('Minigoals:', this.minigoals);
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

  editMiniGoal(minigoals: any) {
    this.showModalMini = true;
    console.log('inputNewMiniGoalModel: ' + JSON.stringify(minigoals));
    this.minigoalToEdit = minigoals;
    
  }

  salvarEdicaoMiniGoal() {
    console.log('SALVAR Editar Mini Goal - Antes:', this.minigoalToEdit);
    // Encontrar o índice da mini meta que está sendo editada
    const index = this.minigoals.indexOf(this.minigoalToEdit);
    if (index !== -1) {
      // Atualizar o título da mini meta no array principal
      this.minigoals[index].titulo = this.minigoalToEdit.titulo;
      console.log('SALVAR Editar Mini Goal - Depois:', this.minigoals[index]);
    }
    this.closeMiniModal();
  }

  closeMiniModal() {
    this.showModalMini = false;
  }

  salvarEdicaoMeta() {
    this.metaSelecionada = { _id: this.id, titulo: this.titulo, prazo: this.prazo, categoria: this.categoria, prioridade: this.prioridade, status: this.status, descricao: this.descricao, progresso: this.progresso, enviarLembrete: this.enviarLembrete, criarMiniMetas: this.criarMiniMetas };
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
      setTimeout(() => {
        this.closeModal();
      }, 2000);
    });
  }

}
