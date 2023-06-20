import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetCreationComponent } from './projet-creation.component';

describe('ProjetCreationComponent', () => {
  let component: ProjetCreationComponent;
  let fixture: ComponentFixture<ProjetCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
