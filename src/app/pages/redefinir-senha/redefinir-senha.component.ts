import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.scss']
})
export class RedefinirSenhaComponent implements OnInit {

  email = '';
  mensagem = '';
  isError = false;

  constructor(public http: HttpClient, private authService: AuthService) {
    
   }

  ngOnInit(): void {
    console.log('userId: ');
    console.log(localStorage.getItem('userId'));
    console.log('token: ');
    console.log(localStorage.getItem('token'));
    
  }

  enviarEmail() {
    this.authService.redefinirSenhaPorEmail(this.email).subscribe({
      next: () => {
        this.mensagem = 'Link de redefinição de senha enviado para: ' + this.email;
        localStorage.setItem('emailForPasswordReset', this.email);
        this.isError = false;
        this.email = ''; // Limpa o campo de email após o envio
      },
      error: (err) => {
        if (err.status === 404) {
          this.mensagem = 'E-mail não encontrado em nossa base de dados.';
        } else {
          this.mensagem = 'Ocorreu um erro ao tentar enviar o e-mail. Tente novamente mais tarde.';
        }
        this.isError = true;
      }
    });

    // this.http.post('http://localhost:3000/forgot-password', { email: this.email })
    //   .subscribe({
    //     next: (res: any) => {
    //       this.mensagem = res.message;
    //       this.isError = false;
    //       this.abrirModalSenha = true;
    //     },
    //     error: err => {
    //       this.mensagem = err.error.message;
    //       this.isError = true;
    //     }
    //   });
    //   //Enquanto não tiver o backend, vamos simular o envio de email
    //   this.mensagem = 'Link de redefinição de senha enviado para: ' + this.email;
    //   this.isError = false;
    //   this.email = ''; // Limpa o campo de email após o envio
    //   this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

}
