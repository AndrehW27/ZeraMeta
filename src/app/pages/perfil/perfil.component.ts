import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// O decorador @Component estava faltando. Este é o principal motivo dos erros.
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  // Guarda os dados do usuário em um objeto para facilitar a manipulação
  usuario = {
    nome: 'André Willian Gorgo de Carvalho',
    email: 'andre.gorgo@email.com',
    senha: '********',
    telefone: '(51) 99999-9999',
    plano: 'Plus 1+',
    fotoUrl: 'https://pt.quizur.com/_image?href=https://img.quizur.com/f/img64c609b3f0dc75.65980291.jpg?lastEdited=1690700315&w=600&h=600&f=webp',
    tema: 'claro',
    notificacoes: true
  };


  // Controla a visibilidade do modal
  abrirModalInfo = false;
  abrirModalEmail = false;
  abrirModalSenha = false;
  abrirModalTelefone = false;
  abrirModalPlano = false;
  // Armazena o nome enquanto ele está sendo editado no modal
  nomeEmEdicao = '';
  emailEmEdicao = '';
  senhaEmEdicao = '';
  telefoneEmEdicao = '';
  planoEmEdicao = '';
  planoOptions = ['Plus 1+', 'Plus 2+', 'Plus 3+'];

  // Referência ao elemento de input de arquivo no template
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  // Abre o modal e copia o nome atual para o campo de edição
  editarInfo() {
    this.nomeEmEdicao = this.usuario.nome;
    this.abrirModalInfo = true;
  }

    editarEmail() {
    this.emailEmEdicao = this.usuario.email;
    this.abrirModalEmail = true;
  }

  editarSenha() {
    this.senhaEmEdicao = ''; // Não preenchemos com a senha atual por segurança
    this.abrirModalSenha = true;
  }

  editarTelefone() {
    this.telefoneEmEdicao = this.usuario.telefone;
    this.abrirModalTelefone = true;
  }

  editarPlano() {
    this.planoEmEdicao = this.usuario.plano;
    this.abrirModalPlano = true;
  }

  // Aciona o clique no input de arquivo oculto
  editarFoto() {
    this.fileInput.nativeElement.click();
  }

  // É chamado quando o usuário seleciona um arquivo
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.usuario.fotoUrl = e.target.result; // Atualiza a URL da foto com a imagem em base64
      };
      reader.readAsDataURL(file);
    }
  }

  // Salva o novo nome e fecha o modal
  salvarAlteracao() {
    this.usuario.nome = this.nomeEmEdicao;
    this.abrirModalInfo = false;
  }

    salvarAlteracaoEmail() {
    // Atualiza o e-mail através do serviço para manter o estado centralizado
    this.usuario.email = this.emailEmEdicao;
    this.abrirModalEmail = false;
  }

  salvarAlteracaoSenha() {
    // Em um app real, aqui você faria a chamada para o backend.
    // Apenas para demonstração, não estamos salvando a senha real no serviço.
    this.usuario.senha = '********';
    this.abrirModalSenha = false;
  }

  salvarAlteracaoTelefone() {
    this.usuario.telefone = this.telefoneEmEdicao;
    this.abrirModalTelefone = false;
  }

  salvarAlteracaoPlano() {
    this.usuario.plano = this.planoEmEdicao;
    this.abrirModalPlano = false;
  }

  // Apenas fecha o modal, descartando alterações
  fecharModal() {
    this.abrirModalInfo = false;
  }

  fecharModalEmail() {
    this.abrirModalEmail = false;
  }

  fecharModalSenha() {
    this.abrirModalSenha = false;
  }

  fecharModalTelefone() {
    this.abrirModalTelefone = false;
  }

  fecharModalPlano() {
    this.abrirModalPlano = false;
  }
}
