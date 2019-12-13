import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTotalProgressComponent } from './upload-total-progress.component';

describe('UploadTotalProgressComponent', () => {
  let component: UploadTotalProgressComponent;
  let fixture: ComponentFixture<UploadTotalProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadTotalProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTotalProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
