import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.scss']
})
export class RedefinirSenhaComponent implements OnInit {

  email = '';
  mensagem = '';
  isError = false;
  isLoading = false;

  constructor(public http: HttpClient, private authService: AuthService) {

  }

  ngOnInit(): void {
    console.log('userId: ');
    console.log(localStorage.getItem('userId'));
    console.log('token: ');
    console.log(localStorage.getItem('token'));

  }

  async enviarEmail(): Promise<void> {
    this.isLoading = true;
    try {
      await lastValueFrom(this.authService.redefinirSenhaPorEmail(this.email));
      this.mensagem = 'Link de redefinição de senha enviado para: ' + this.email;
      localStorage.setItem('emailForPasswordReset', this.email);
      this.isError = false;
      this.email = ''; // Limpa o campo de email após o envio
    } catch (err: any) {
      if (err && err.status === 404) {
        this.mensagem = 'E-mail não encontrado em nossa base de dados.';
      } else {
        this.mensagem = 'Ocorreu um erro ao tentar enviar o e-mail. Tente novamente mais tarde.';
        console.log('ERRO : ', err);
        console.log('ERRO MSG: ', err?.message);
      }
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

}
