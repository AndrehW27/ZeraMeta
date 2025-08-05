import { Component } from '@angular/core';

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
  perguntas: string[] = [
    "Olá! Estou aqui para te ajudar a criar novas metas. Qual área da sua vida você gostaria de focar agora? (Ex: Saúde, Carreira, Finanças, Lazer)",
    "Ótima escolha! Dentro dessa área, o que é mais importante para você alcançar nos próximos 6 meses?",
    "Entendido. E o que você acredita que te impede ou dificulta alcançar esse objetivo hoje?",
    "Obrigado pelas respostas! Estou analisando tudo para criar algumas sugestões para você."
  ];

  conversa: Mensagem[] = [];
  respostas: string[] = [];
  perguntaAtualIndex = 0;
  respostaUsuario = '';
  gerandoMetas = false;
  metasSugeridas: string[] = [];

  ngOnInit(): void {
    this.conversa.push({ texto: this.perguntas[this.perguntaAtualIndex], autor: 'ia' });
  }

  enviarResposta(): void {
    if (!this.respostaUsuario.trim()) return;

    // Adiciona a resposta do usuário à conversa
    this.conversa.push({ texto: this.respostaUsuario, autor: 'usuario' });
    this.respostas.push(this.respostaUsuario);
    this.respostaUsuario = '';

    // Avança para a próxima pergunta
    this.perguntaAtualIndex++;

    if (this.perguntaAtualIndex < this.perguntas.length) {
      // Adiciona a próxima pergunta da IA
      setTimeout(() => {
        this.conversa.push({ texto: this.perguntas[this.perguntaAtualIndex], autor: 'ia' });
        if (this.perguntaAtualIndex === this.perguntas.length - 1) {
          this.simularGeracaoDeMetas();
        }
      }, 1000);
    }
  }

  simularGeracaoDeMetas(): void {
    this.gerandoMetas = true;
    // **PONTO DE INTEGRAÇÃO**
    // Aqui você faria a chamada para uma API de IA real (como Gemini, OpenAI, etc.),
    // enviando o array `this.respostas`.
    // Por enquanto, vamos simular a resposta da IA.

    setTimeout(() => {
      const area = this.respostas[0] || 'desenvolvimento';
      const objetivo = this.respostas[1] || 'um novo projeto';

      this.metasSugeridas = [
        `Dedicar 5 horas por semana para estudar sobre ${area}.`,
        `Criar um plano de ação detalhado para ${objetivo}.`,
        `Buscar um mentor ou curso na área de ${area} em 30 dias.`
      ];

      this.gerandoMetas = false;
    }, 3000);
  }

  adicionarMeta(meta: string): void {
    // Lógica para adicionar a meta à lista principal do usuário.
    // Você pode usar um serviço compartilhado para isso.
    alert(`Meta "${meta}" adicionada! (implementação pendente)`);
  }
}

// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-sugestoes-ia',
//   templateUrl: './sugestoes-ia.component.html',
//   styleUrls: ['./sugestoes-ia.component.scss']
// })

// export class SugestoesIaComponent {
//   form = {
//     area: '',
//     objetivo: ''
//   };

//   respostaIa: string = '';

//   constructor(private http: HttpClient) {}

//   gerarSugestoes() {
//     const prompt = `Sugira metas para alguém que quer melhorar em ${this.form.area}, com o objetivo de "${this.form.objetivo}". Retorne metas e microtarefas.`;

//     this.http.post<any>('https://api.openai.com/v1/completions', {
//       model: 'text-davinci-003',
//       prompt: prompt,
//       max_tokens: 200,
//     }, {
//       headers: {
//         'Authorization': 'Bearer SUA_CHAVE_OPENAI',
//         'Content-Type': 'application/json'
//       }
//     }).subscribe(res => {
//       this.respostaIa = res.choices[0].text.trim();
//     });
//   }
// }
