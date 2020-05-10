import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagnetsComponent } from './magnets.component';

describe('MagnetsComponent', () => {
  let component: MagnetsComponent;
  let fixture: ComponentFixture<MagnetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagnetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagnetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
