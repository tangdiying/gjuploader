import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GjprogressComponent } from './gjprogress.component';

describe('GjprogressComponent', () => {
  let component: GjprogressComponent;
  let fixture: ComponentFixture<GjprogressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GjprogressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GjprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
