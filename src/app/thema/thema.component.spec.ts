import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemaComponent } from './thema.component';

describe('ThemaComponent', () => {
  let component: ThemaComponent;
  let fixture: ComponentFixture<ThemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
