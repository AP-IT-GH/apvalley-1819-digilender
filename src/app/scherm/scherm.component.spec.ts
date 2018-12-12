import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchermComponent } from './scherm.component';

describe('SchermComponent', () => {
  let component: SchermComponent;
  let fixture: ComponentFixture<SchermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
