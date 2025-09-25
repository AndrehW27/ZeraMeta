import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boas-vindas',
  templateUrl: './boas-vindas.component.html',
  styleUrls: ['./boas-vindas.component.scss']
})
export class BoasVindasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('userId: ');
    console.log(localStorage.getItem('userId'));
    console.log('token: ');
    console.log(localStorage.getItem('token'));
  }

}
