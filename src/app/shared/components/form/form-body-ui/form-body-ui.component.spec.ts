import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBodyUIComponent } from './form-body-ui.component';

describe('FormBodyUIComponent', () => {
  let component: FormBodyUIComponent;
  let fixture: ComponentFixture<FormBodyUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBodyUIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBodyUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
