import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GjbarComponent } from './gjbar.component';

describe('GjbarComponent', () => {
  let component: GjbarComponent;
  let fixture: ComponentFixture<GjbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GjbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GjbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
