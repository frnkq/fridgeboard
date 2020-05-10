import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMagnetFormComponent } from './create-magnet-form.component';

describe('CreateMagnetFormComponent', () => {
  let component: CreateMagnetFormComponent;
  let fixture: ComponentFixture<CreateMagnetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMagnetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMagnetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
