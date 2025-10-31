import { Component } from '@angular/core';
import { MetaService } from '../../services/meta.service';
import { GoalAiService } from '../../services/openai.service';

// interface Mensagem {
//   texto: string;
//   autor: 'ia' | 'usuario';
// }

@Component({
  selector: 'app-sugestoes-ia',
  templateUrl: './sugestoes-ia.component.html',
  styleUrls: ['./sugestoes-ia.component.scss']
})
export class SugestoesIaComponent {
  // perguntas: string[] = [
  //   "Olá! Estou aqui para te ajudar a criar novas metas. Qual área da sua vida você gostaria de focar agora? (Ex: Saúde, Carreira, Finanças, Lazer)",
  //   "Ótima escolha! Dentro dessa área, o que é mais importante para você alcançar nos próximos 6 meses?",
  //   "Entendido. E o que você acredita que te impede ou dificulta alcançar esse objetivo hoje?",
  //   "Obrigado pelas respostas! Estou analisando tudo para criar algumas sugestões para você."
  // ];

  // conversa: Mensagem[] = [];
  // respostas: string[] = [];
  // perguntaAtualIndex = 0;
  // respostaUsuario = '';
  // gerandoMetas = false;
  // metasSugeridas: string[] = [];

  // ngOnInit(): void {
  //   this.conversa.push({ texto: this.perguntas[this.perguntaAtualIndex], autor: 'ia' });
  // }

  // enviarResposta(): void {
  //   if (!this.respostaUsuario.trim()) return;

  //   // Adiciona a resposta do usuário à conversa
  //   this.conversa.push({ texto: this.respostaUsuario, autor: 'usuario' });
  //   this.respostas.push(this.respostaUsuario);
  //   this.respostaUsuario = '';

  //   // Avança para a próxima pergunta
  //   this.perguntaAtualIndex++;

  //   if (this.perguntaAtualIndex < this.perguntas.length) {
  //     // Adiciona a próxima pergunta da IA
  //     setTimeout(() => {
  //       this.conversa.push({ texto: this.perguntas[this.perguntaAtualIndex], autor: 'ia' });
  //       if (this.perguntaAtualIndex === this.perguntas.length - 1) {
  //         this.simularGeracaoDeMetas();
  //       }
  //     }, 1000);
  //   }
  // }

  // simularGeracaoDeMetas(): void {
  //   this.gerandoMetas = true;

  //   setTimeout(() => {
  //     const area = this.respostas[0] || 'desenvolvimento';
  //     const objetivo = this.respostas[1] || 'um novo projeto';

  //     this.metasSugeridas = [
  //       `Dedicar 5 horas por semana para estudar sobre ${area}.`,
  //       `Criar um plano de ação detalhado para ${objetivo}.`,
  //       `Buscar um mentor ou curso na área de ${area} em 30 dias.`
  //     ];

  //     this.gerandoMetas = false;
  //   }, 3000);
  // }

  // adicionarMeta(meta: string): void {

  //   alert(`Meta "${meta}" adicionada! (implementação pendente)`);
  // }

  token = '';
  usuarioid = '';
  isLoading = false;

  userIdea = '';
  // result: any[] = [
  //   {
  //     "title": "Perder 30 kg de forma saudável",
  //     "deadline": "em 12 meses",
  //     "description": "Alcançar uma perda total de 30 kg com foco em hábitos sustentáveis, progresso gradual e acompanhamento profissional quando possível.",
  //     "miniGoals": [
  //       {
  //         "title": "Perder 2-4 kg por mês (média de 0,5-1 kg/semana)"
  //       },
  //       {
  //         "title": "Agendar consulta com nutricionista e/ou médico"
  //       },
  //       {
  //         "title": "Registrar peso, medidas e fotos 1x por semana"
  //       }
  //     ]
  //   },
  //   {
  //     "title": "Estruturar alimentação equilibrada em déficit",
  //     "deadline": "nas próximas 8 semanas",
  //     "description": "Implementar um plano alimentar com déficit calórico moderado, priorizando proteínas, fibras, verduras e hidratação.",
  //     "miniGoals": [
  //       {
  //         "title": "Planejar cardápio e lista de compras toda semana"
  //       },
  //       {
  //         "title": "Preparar marmitas 2x por semana"
  //       },
  //       {
  //         "title": "Beber 2 litros de água por dia"
  //       }
  //     ]
  //   },
  //   {
  //     "title": "Aumentar atividade física e força",
  //     "deadline": "nas próximas 12 semanas",
  //     "description": "Alcançar 150-300 minutos semanais de atividade aeróbica e 2-3 treinos de força para preservar massa magra.",
  //     "miniGoals": [
  //       {
  //         "title": "Caminhar 30-45 minutos, 5x por semana"
  //       },
  //       {
  //         "title": "Fazer treino de força de corpo inteiro 2-3x/semana"
  //       },
  //       {
  //         "title": "Atingir 8-10 mil passos por dia"
  //       }
  //     ]
  //   }
  // ];
  result: any[] = [];
  resultFetched = false;
  Goal1 = {};
  Goal2 = {};
  Goal3 = {};
  loading = false;
  goalToBeCreated = { usuario_id: '', titulo: '', prazo: '', descricao: '', miniGoals: [] };

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


  constructor(private goalAI: GoalAiService, private metaService: MetaService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.usuarioid = localStorage.getItem('userId') || '';
  }

  generate() {
    this.loading = true;
    this.goalAI.getSuggestions(this.userIdea).subscribe({
      next: (res) => {
        console.log('RES: ' + JSON.stringify(res));

        this.resultFetched = true;
        this.result = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }


  addsuggest1() {
    this.goalToBeCreated = this.result[0];
    this.goalToBeCreated.usuario_id = this.usuarioid;
    // console.log('goalToBeCreated: ' + JSON.stringify(this.goalToBeCreated));
    const r: any = this.result[0] ?? {};
    this.goalToBeCreated = {
      usuario_id: this.usuarioid,
      titulo: r.title ?? r.titulo ?? '',
      prazo: r.deadline ?? r.prazo ?? '',
      descricao: r.description ?? r.descricao ?? '',
      miniGoals: Array.isArray(r.miniGoals)
        ? r.miniGoals.map((m: any) => ({
          titulo: m.title ?? m.titulo ?? '',
          concluido: !!m.concluido
        }))
        : []
    };
    console.log('goalToBeCreated:', JSON.stringify(this.goalToBeCreated));
    this.metaService.criarMeta(this.goalToBeCreated, this.token).subscribe((res) => {
      console.log('Meta criada com sucesso: ', res);

      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.openSuccess('success', 'Meta criada com sucesso!', true);
        setTimeout(() => {
          this.closeModal();
        }, 1000);
      }, 1000);

    });
  }

  addsuggest2() {
    this.goalToBeCreated = this.result[1];
    this.goalToBeCreated.usuario_id = this.usuarioid;
    // console.log('goalToBeCreated: ' + JSON.stringify(this.goalToBeCreated));
    const r: any = this.result[1] ?? {};
    this.goalToBeCreated = {
      usuario_id: this.usuarioid,
      titulo: r.title ?? r.titulo ?? '',
      prazo: r.deadline ?? r.prazo ?? '',
      descricao: r.description ?? r.descricao ?? '',
      miniGoals: Array.isArray(r.miniGoals)
        ? r.miniGoals.map((m: any) => ({
          titulo: m.title ?? m.titulo ?? '',
          concluido: !!m.concluido
        }))
        : []
    };
    console.log('goalToBeCreated:', JSON.stringify(this.goalToBeCreated));
    this.metaService.criarMeta(this.goalToBeCreated, this.token).subscribe((res) => {
      console.log('Meta criada com sucesso: ', res);

      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.openSuccess('success', 'Meta criada com sucesso!', true);
        setTimeout(() => {
          this.closeModal();
        }, 1000);
      }, 1000);

    });
  }
  addsuggest3() {
    this.goalToBeCreated = this.result[2];
    this.goalToBeCreated.usuario_id = this.usuarioid;
    // console.log('goalToBeCreated: ' + JSON.stringify(this.goalToBeCreated));
    const r: any = this.result[2] ?? {};
    this.goalToBeCreated = {
      usuario_id: this.usuarioid,
      titulo: r.title ?? r.titulo ?? '',
      prazo: r.deadline ?? r.prazo ?? '',
      descricao: r.description ?? r.descricao ?? '',
      miniGoals: Array.isArray(r.miniGoals)
        ? r.miniGoals.map((m: any) => ({
          titulo: m.title ?? m.titulo ?? '',
          concluido: !!m.concluido
        }))
        : []
    };
    console.log('goalToBeCreated:', JSON.stringify(this.goalToBeCreated));
    this.metaService.criarMeta(this.goalToBeCreated, this.token).subscribe((res) => {
      console.log('Meta criada com sucesso: ', res);

      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.openSuccess('success', 'Meta criada com sucesso!', true);
        setTimeout(() => {
          this.closeModal();
        }, 1000);
      }, 1000);

    });
  }



}


