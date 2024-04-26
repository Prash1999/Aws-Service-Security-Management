import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsmComponent } from './ssm.component';

describe('SsmComponent', () => {
  let component: SsmComponent;
  let fixture: ComponentFixture<SsmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
