import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-senha-por-email',
  templateUrl: './senha-por-email.component.html',
  styleUrls: ['./senha-por-email.component.scss']
})
export class SenhaPorEmailComponent implements OnInit {

  mensagem = '';
  isError = false;
  
  abrirModalSenha = true;
  senhaValida = true;
  senhaLength = false;
  senhaEmEdicao = '';
  isLoading = false;


  constructor(public http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log('userId: ');
    console.log(localStorage.getItem('userId'));
    console.log('token: ');
    console.log(localStorage.getItem('token'));
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

  verificaPreenchimentoSenha(){
    const senha = this.senhaEmEdicao;
    // Regex para validar: mínimo 8 caracteres, 1 letra, 1 número e 1 caractere especial.
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (senha.length === 0) {
      this.senhaValida = true; // Não mostra erro se o campo estiver vazio
      this.senhaLength = false; 
    } else {
      this.senhaLength = true;
      this.senhaValida = passwordRegex.test(senha);
    }
 }

 salvarAlteracaoSenha() {   
    if (this.senhaValida && this.senhaLength) {
        this.abrirModalSenha = false;        
        this.authService.redefinirSenha(localStorage.getItem('emailForPasswordReset') || '', this.senhaEmEdicao).subscribe({
        next: () => {
          this.isLoading = true;
          setTimeout(() => {
          this.isLoading = false;
          this.openSuccess('success', 'Senha alterada com sucesso!', true);
          }, 1000);
          setTimeout(() => {
          this.closeModal();  
          this.router.navigate(['/login']);      
          }, 2000);
        },
        error: (err) => {
          this.mensagem = 'Ocorreu um erro ao tentar enviar o e-mail. Tente novamente mais tarde.';
          this.isError = true;          
        }
          
        });   

        localStorage.removeItem('emailForPasswordReset');

    }
  }

  fecharModalSenha(){
    this.abrirModalSenha = false;
  }

}







