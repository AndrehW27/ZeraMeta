import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  ngOnInit(): void {
  }

  novaUsuario = { nome: '', email: '', senha: '', repeteSenha: ''};

  constructor(private usuarioService: UsuarioService, private router: Router) { }

    // Funções para chamar modal de sucesso/erro podem ser adicionadas aqui
  showModal = false;
  modalType: 'success' | 'error' = 'success';
  modalMessage = '';

  openSuccess() {
    this.modalType = 'success';
    this.modalMessage = 'Usuário criado com sucesso!';
    this.showModal = true;
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

 //Validacao de senhas
 nomeValido = true;
 emailValido = true;
 senhaValida = true;
 repeteSenhaValida = true;

  verificaPreenchimentoSenha(){
    const senha = this.novaUsuario.senha;
    // Regex para validar: mínimo 8 caracteres, 1 letra, 1 número e 1 caractere especial.
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (senha.length === 0) {
      this.senhaValida = true; // Não mostra erro se o campo estiver vazio
    } else {
      this.senhaValida = passwordRegex.test(senha);
    }
    this.verificaSeSaoIguais(); // Re-valida a repetição da senha
 }

  verificaSeSaoIguais(){
    if (this.novaUsuario.repeteSenha.length === 0) {
      this.repeteSenhaValida = false; // Não mostra erro se o campo estiver vazio
    } else {
      this.repeteSenhaValida = this.novaUsuario.senha === this.novaUsuario.repeteSenha;
    }
 }

verificaPreenchimentoNome(){
  const nome = this.novaUsuario.nome;
  // Regex para validar: apenas letras e espaços, mínimo 2 caracteres
  const nomeRegex = /^[A-Za-zÀ-ÿ\s]{2,}$/;

  if (nome.length === 0) {
    this.nomeValido = true; // Não mostra erro se o campo estiver vazio
  } else {
    this.nomeValido = nomeRegex.test(nome);
  }
}

verificaPreenchimentoEmail(){
  const email = this.novaUsuario.email;
  // Regex: algo antes do @, @, algo depois do @, termina com .com
  const emailRegex = /^[^@]+@[^@]+\.com(\.[^@]+)?$/;

  if (email.length === 0) {
    this.emailValido = true; // Não mostra erro se o campo estiver vazio
  } else {
    this.emailValido = emailRegex.test(email);
  }
}

//Validacao de senhas



  cadastrar(){
    if(this.senhaValida && this.repeteSenhaValida){
    this.usuarioService.criarUsuario(this.novaUsuario).subscribe((response: any) => {

      // salvar id criado
      sessionStorage.setItem('userId', response._id);
      console.log('Usuário cadastrado com ID:', response._id);
      console.log('Usuário cadastrado com ID:', response);      

      this.openSuccess();
      setTimeout(() => {
        this.closeModal();
        this.router.navigate(['/metas']);
      }, 1000);
      this.novaUsuario = { nome: '', email: '', senha: '', repeteSenha: ''}; // limpa formulário

    }, error => {
      console.error('Erro ao cadastrar usuário:', error);
      this.openError('error', 'Erro ao cadastrar usuário: '+JSON.stringify(error.error), true);
        setTimeout(() => {
        this.closeModal();
      }, 1000);
      });
    }else{
      this.openError('error', 'Erro ao cadastrar usuário: Verifique as senhas', true);
      setTimeout(() => {
        this.closeModal();
      }, 1000);
    }
  } 
}
