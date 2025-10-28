import { Component, OnInit } from '@angular/core';
import { log } from 'console';

@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss']
})
export class MetaComponent implements OnInit {

  constructor() { }

  showModal = false;
  showModalMini = false;
  showAi = false;

  minigoals: { titulo: string; concluido: boolean }[] = [{ titulo: 'stringggggggggggggggggggggggggg', concluido: true }, { titulo: 'fasdfa', concluido: false }];
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
  id = 0;
  itensCarregados = false;
  perCompleted = 0;
  diff = 0;

  ngOnInit(): void {
    console.log('INITIAL this.showModal: ' + this.showModal);


    const rawTitulo = localStorage.getItem('meta-titulo') || '';
    this.titulo = rawTitulo.replace(/^"(.*)"$/, '$1');
    const rawStatus = localStorage.getItem('meta-status') || '';
    this.status = rawStatus.replace(/^"(.*)"$/, '$1');
    const rawCategoria = localStorage.getItem('meta-categoria') || 'teste';
    this.categoria = rawCategoria.replace(/^"(.*)"$/, '$1');
    const rawPrioridade = localStorage.getItem('meta-prioridade') || '';
    this.prioridade = rawPrioridade.replace(/^"(.*)"$/, '$1');
    const rawDescricao = localStorage.getItem('meta-descricao') || '';
    this.descricao = rawDescricao.replace(/^"(.*)"$/, '$1');
    const rawPrazo = localStorage.getItem('meta-prazo') || '';
    this.prazo = rawPrazo.replace(/^"(.*)"$/, '$1');
    const rawProgresso = localStorage.getItem('meta-progresso') || '0';
    this.progresso = parseInt(rawProgresso.replace(/^"(.*)"$/, '$1'), 10);
    this.perCompleted = this.progresso;
    const rawEnviarLembrete = localStorage.getItem('meta-enviarLembrete') || 'false';
    this.enviarLembrete = rawEnviarLembrete.replace(/^"(.*)"$/, '$1') === 'true';


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

  editMiniGoal(inputNewMiniGoalModel: any) {
    this.showModalMini = true;
  }

  closeMiniModal() {
    this.showModalMini = false;
  }

}
