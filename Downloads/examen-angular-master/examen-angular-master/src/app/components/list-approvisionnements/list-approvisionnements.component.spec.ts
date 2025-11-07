import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApprovisionnementsComponent } from './list-approvisionnements.component';

describe('ListApprovisionnementsComponent', () => {
  let component: ListApprovisionnementsComponent;
  let fixture: ComponentFixture<ListApprovisionnementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListApprovisionnementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListApprovisionnementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
