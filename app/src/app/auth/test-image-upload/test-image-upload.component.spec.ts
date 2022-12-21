import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestImageUploadComponent } from './test-image-upload.component';

describe('TestImageUploadComponent', () => {
  let component: TestImageUploadComponent;
  let fixture: ComponentFixture<TestImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestImageUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
