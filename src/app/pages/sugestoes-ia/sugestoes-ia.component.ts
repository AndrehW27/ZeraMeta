import { Component } from '@angular/core';
// import { MetaService } from '../../services/meta.service';
import { GoalAiService } from '../../services/openai.service';

interface Mensagem {
  texto: string;
  autor: 'ia' | 'usuario';
}

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

  userIdea = '';
  result: any[] = [];
  resultFetched = false;
  Goal1 = {};
  Goal2 = {};
  Goal3 = {};
  // result = "[\n  {\n    \"objetivo\": \"Organizar o orçamento e reduzir gastos discricionários em 15% em 90 dias\",\n    \"mini_objetivos\": [\n      {\n        \"descricao\": \"Rastrear todas as despesas por 30 dias com app ou planilha\",\n        \"prazo\": \"30 dias\",\n        \"medida_de_sucesso\": \"100% das transações categorizadas\"\n      },\n      {\n        \"descricao\": \"Definir orçamento mensal por categorias (ex.: 50/30/20) e configurar alertas\",\n        \"prazo\": \"7 dias após o rastreamento\",\n        \"medida_de_sucesso\": \"Limites definidos para 100% das categorias\"\n      },\n      {\n        \"descricao\": \"Cortar ou renegociar ao menos 3 despesas recorrentes (telefonia, streaming, seguro, tarifas)\",\n        \"prazo\": \"45 dias\",\n        \"medida_de_sucesso\": \"Economia mensal mínima de R$200 ou 15% vs. base\"\n      }\n    ]\n  },\n  {\n    \"objetivo\": \"Formar uma reserva de emergência de 3 meses do custo de vida em 12 meses\",\n    \"mini_objetivos\": [\n      {\n        \"descricao\": \"Calcular custo de vida mensal e a meta total da reserva\",\n        \"prazo\": \"7 dias\",\n        \"medida_de_sucesso\": \"Meta definida (R$) = 3 x custo mensal\"\n      },\n      {\n        \"descricao\": \"Escolher aplicação de alta liquidez (ex.: conta remunerada/CDB-D+) e ativar aporte automático\",\n        \"prazo\": \"14 dias\",\n        \"medida_de_sucesso\": \"Débito automático de R$X no dia do salário\"\n      },\n      {\n        \"descricao\": \"Aportar pelo menos 10% da renda mensal até atingir a meta\",\n        \"prazo\": \"Mensal (12 meses)\",\n        \"medida_de_sucesso\": \"25% da meta em 3 meses, 60% em 6 meses, 100% em 12 meses\"\n      }\n    ]\n  },\n  {\n    \"objetivo\": \"Quitar dívidas caras e melhorar a saúde de crédito em 6–9 meses\",\n    \"mini_objetivos\": [\n      {\n        \"descricao\": \"Listar todas as dívidas (saldo, taxa, vencimento) e priorizar por juros (método avalanche)\",\n        \"prazo\": \"7 dias\",\n        \"medida_de_sucesso\": \"Planilha com 100% das dívidas e ordem de pagamento\"\n      },\n      {\n        \"descricao\": \"Negociar redução de juros/parcelamento ou portabilidade; consolidar apenas se a taxa efetiva for menor\",\n        \"prazo\": \"30 dias\",\n        \"medida_de_sucesso\": \"Taxa média reduzida em ≥20% ou cronograma fechado\"\n      },\n      {\n        \"descricao\": \"Automatizar pagamentos e direcionar excedente à dívida prioritária; manter uso do cartão <30% do limite\",\n        \"prazo\": \"Mensal\",\n        \"medida_de_sucesso\": \"Atrasos = 0; saldo total cai ≥3% ao mês\"\n      }\n    ]\n  }\n]";
  loading = false;
  // qtdSugestoes = this.result.split('},').length;

  constructor(private goalAI: GoalAiService) { }

  ngOnInit(): void {
    // console.log('Quantidade de sugestões: ' + this.qtdSugestoes);
    console.log('result: ' + this.result);
    // console.log('result[0]: ' + JSON.stringify(this.result[2]));

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

}


