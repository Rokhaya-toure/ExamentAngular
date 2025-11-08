import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateApprovisionnementsComponent } from './create-approvisionnements.component';

describe('CreateApprovisionnementsComponent', () => {
  let component: CreateApprovisionnementsComponent;
  let fixture: ComponentFixture<CreateApprovisionnementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateApprovisionnementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateApprovisionnementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
