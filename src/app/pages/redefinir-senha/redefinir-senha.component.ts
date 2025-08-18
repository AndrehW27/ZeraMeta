import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.scss']
})
export class RedefinirSenhaComponent implements OnInit {

  email = '';
  mensagem = '';
  isError = false;

  constructor(public http: HttpClient) {
    
   }

  ngOnInit(): void {
  }

    enviarEmail() {
    this.http.post('http://localhost:3000/forgot-password', { email: this.email })
      .subscribe({
        next: (res: any) => {
          this.mensagem = res.message;
          this.isError = false;
        },
        error: err => {
          this.mensagem = err.error.message;
          this.isError = true;
        }
      });
      //Enquanto não tiver o backend, vamos simular o envio de email
      this.mensagem = 'Link de redefinição de senha enviado para: ' + this.email;
      this.isError = false;
      this.email = ''; // Limpa o campo de email após o envio
      this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

}
