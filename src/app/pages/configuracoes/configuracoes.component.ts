import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent implements OnInit {

  modalTemaAberto = false;
  modalNotiAberto = false;
  isTemaEscuro = false; // Você pode inicializar isso com base em uma preferência salva

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

  constructor() { }

  ngOnInit(): void {
  }

}
