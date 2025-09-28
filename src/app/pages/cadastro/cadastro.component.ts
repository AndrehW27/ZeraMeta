import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';  
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private router: Router, private authService: AuthService) { }


  ngOnInit(): void {
  }

  isLoading = false;

  novaUsuario = { nome: '', email: '', senha: '', repeteSenha: ''};


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
    this.isLoading = true;  
    console.log(this.senhaValida, this.repeteSenhaValida);

    if(this.senhaValida && this.repeteSenhaValida){
    this.authService.register(this.novaUsuario.nome, this.novaUsuario.email,this.novaUsuario.senha).subscribe((response: any) => {
      console.log('response: ', response);
    
      localStorage.setItem('userId', response.user.id);
      localStorage.setItem('userName', response.user.nome); 
      localStorage.setItem('token', response.token); 
    
      console.log('Usuário cadastrado com ID:', localStorage.getItem('userId'));
      console.log('Token:', localStorage.getItem('token'));          

          setTimeout(() => {
            this.openSuccess(); 
            this.isLoading = false;               
            // this.openSuccess;  
          }, 1000); 
          
          setTimeout(() => {
            this.closeModal();    
            this.router.navigate(['/menu']); 
          }, 2000);

      this.novaUsuario = { nome: '', email: '', senha: '', repeteSenha: ''}; // limpa formulário

    }, error => {
      console.error('Erro ao cadastrar usuário:', error);     
      
        setTimeout(() => {
          this.isLoading = false;               
          this.openError('error', 'Erro ao cadastrar usuário: '+JSON.stringify(error.error), true);  
        }, 1000); 
        
        setTimeout(() => {
          this.closeModal();    
        }, 2000);

      });

    }else{
      
      setTimeout(() => {
        this.openError('error', 'Erro ao cadastrar usuário: Verifique as senhas', true);  
        this.isLoading = false;   
      }, 1000); 
      
      setTimeout(() => {
        this.closeModal();    
      }, 2000); 

      // setTimeout(() => {
      //   this.isLoading = false;    
      // }, 1000);   

    }
  } 
}
