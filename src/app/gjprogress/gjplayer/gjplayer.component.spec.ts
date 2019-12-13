import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GjplayerComponent } from './gjplayer.component';

describe('GjplayerComponent', () => {
  let component: GjplayerComponent;
  let fixture: ComponentFixture<GjplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GjplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GjplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
