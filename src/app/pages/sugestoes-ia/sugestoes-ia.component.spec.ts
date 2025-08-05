import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugestoesIaComponent } from './sugestoes-ia.component';

describe('SugestoesIaComponent', () => {
  let component: SugestoesIaComponent;
  let fixture: ComponentFixture<SugestoesIaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SugestoesIaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SugestoesIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
