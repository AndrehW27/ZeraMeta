import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent implements OnInit {

  isLoading = false;
  showModalSair = false;
  sairContaVar = false;

  modalTemaAberto = false;
  modalNotiAberto = false;
  isTemaEscuro = false;

  constructor(private router: Router, private usuarioService: UsuarioService) { }

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

  abrirModalTema(): void {
    this.modalTemaAberto = true;
  }

  fecharModalTema(): void {
    this.modalTemaAberto = false;
  }

  abrirModalNoti(): void {
    this.modalNotiAberto = true;
  }

  fecharModalNoti(): void {
    this.modalNotiAberto = false;
  }

  sair(){
    this.showModalSair = true;
  }

  confirmarSair(){
    this.sairContaVar = true;
    if (this.sairContaVar) {
      this.router.navigate(['/']); 
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      console.log('Usuário deslogado, userId e token removidos do localStorage');
      console.log('userId: ', localStorage.getItem('userId'));
      console.log('token: ', localStorage.getItem('token'));
    }
  }

  cancelarSair(){
    this.sairContaVar = false;
    this.showModalSair = false;
  }

}
