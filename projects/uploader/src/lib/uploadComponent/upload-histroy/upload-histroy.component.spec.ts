import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadHistroyComponent } from './upload-histroy.component';

describe('UploadHistroyComponent', () => {
  let component: UploadHistroyComponent;
  let fixture: ComponentFixture<UploadHistroyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadHistroyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadHistroyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
