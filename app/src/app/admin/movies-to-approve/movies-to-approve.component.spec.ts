import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesToApproveComponent } from './movies-to-approve.component';

describe('MoviesToApproveComponent', () => {
  let component: MoviesToApproveComponent;
  let fixture: ComponentFixture<MoviesToApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesToApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesToApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
