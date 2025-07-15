import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamificacaoComponent } from './gamificacao.component';

describe('GamificacaoComponent', () => {
  let component: GamificacaoComponent;
  let fixture: ComponentFixture<GamificacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamificacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
