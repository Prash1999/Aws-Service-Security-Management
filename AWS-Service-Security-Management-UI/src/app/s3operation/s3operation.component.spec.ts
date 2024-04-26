import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S3operationComponent } from './s3operation.component';

describe('S3operationComponent', () => {
  let component: S3operationComponent;
  let fixture: ComponentFixture<S3operationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S3operationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(S3operationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
