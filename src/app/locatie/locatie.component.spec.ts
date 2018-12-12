import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatieComponent } from './locatie.component';

describe('LocatieComponent', () => {
  let component: LocatieComponent;
  let fixture: ComponentFixture<LocatieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocatieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
