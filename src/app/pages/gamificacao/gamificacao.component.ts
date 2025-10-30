import { Component, OnInit } from '@angular/core';
import { MetaService } from '../../services/meta.service';

@Component({
  selector: 'app-gamificacao',
  templateUrl: './gamificacao.component.html',
  styleUrls: ['./gamificacao.component.scss']
})
export class GamificacaoComponent implements OnInit {

  constructor(private metaService: MetaService) { }

  showRules = false;
  showBuyXp = false;

  goalsAmount = 0;
  goals100Amount = 0;
  goals75mount = 0;
  goals50Amount = 0;
  goals25Amount = 0;
  totalXp = 0;
  level = 0; // Exemplo de XP
  titulo = '';

  ngOnInit(): void {
    this.caculateTotalXpAndLevel();

  }

  compartilharConquista() { }

  showRulesAction() {
    this.showRules = true;
  }

  closeRulesAction() {
    this.showRules = false;
  }

  showBuyXpAction() {
    this.showBuyXp = true;
  }

  closeBuyXp() {
    this.showBuyXp = false;
  }

  caculateTotalXpAndLevel() {
    this.metaService.listarMetasPorUsuario(localStorage.getItem('userId') || '123', localStorage.getItem('token') || '123').subscribe(data => {
      // console.log('Metas carregadas: ' + JSON.stringify(data));
      this.goalsAmount = data.length;
      console.log('Quantidade de metas: ' + this.goalsAmount);
      this.goals100Amount = data.filter((meta: any) => meta.progresso === 100).length;
      console.log('Quantidade de metas 100: ' + this.goals100Amount);
      this.goals75mount = data.filter((meta: any) => meta.progresso >= 75 && meta.progresso < 100).length;
      console.log('Quantidade de metas 75: ' + this.goals75mount);
      this.goals50Amount = data.filter((meta: any) => meta.progresso >= 50 && meta.progresso < 75).length;
      console.log('Quantidade de metas 50: ' + this.goals50Amount);
      this.goals25Amount = data.filter((meta: any) => meta.progresso >= 25 && meta.progresso < 50).length;
      console.log('Quantidade de metas 25: ' + this.goals25Amount);

      this.totalXp = (this.goalsAmount * 100) + (this.goals100Amount * 1000) + (this.goals75mount * 750) + (this.goals50Amount * 500) + (this.goals25Amount * 250);
      console.log('Total de XP: ' + this.totalXp);
      localStorage.setItem('total-xp', this.totalXp.toString());
      this.level = Math.floor(this.totalXp / 1000);
      console.log('Nível calculado: ' + this.level);
      localStorage.setItem('level', this.level.toString());

      // this.totalXp = 16000;

      if (this.totalXp < 1000) {
        this.titulo = 'Novato';
      } else if (this.totalXp >= 1000 && this.totalXp < 5000) {
        this.titulo = 'Focado';
      } else if (this.totalXp >= 5000 && this.totalXp < 15000) {
        this.titulo = 'Confiante';
      } else {
        this.titulo = 'Determinado';
      }
      localStorage.setItem('titulo-xp', this.titulo);

    });
  }



}
