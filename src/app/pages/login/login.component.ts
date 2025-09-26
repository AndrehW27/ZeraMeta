import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router'; //import

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private AuthService: AuthService, private router: Router) { }

    email = "";
    senha = "";

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

  ngOnInit(): void {
  }

  handleLogin(email: any, senha: any){
    this.AuthService.login(email, senha).subscribe(
      data => {
        localStorage.setItem('userId', data.user.id); 
        localStorage.setItem('userName', data.user.nome); 
        localStorage.setItem('token', data.token); 
        if (localStorage.getItem('token')) {
          this.showModal = false;
          this.openSuccess('success', 'Login realizado com sucesso!', true);
          setTimeout(() => {
            this.closeModal();    
            this.router.navigate(['/menu']); 
          }, 2000);        
        }
      },
      error => {
        // Aqui você captura e loga o erro HTTP 400
        if (error.status === 400) {
          console.error('Erro 400 - Bad Request:', error);
          this.openError('error', 'E-mail ou senha inválidos!', true);
          setTimeout(() => {
          this.closeModal();    
          }, 2000);   
        } else {
          console.error('Erro durante o login:', error);
          this.openError('error', 'Erro inesperado ao fazer login.', true);
          setTimeout(() => {
          this.closeModal();    
          }, 2000); 
        }
      }
    );
  }

}
