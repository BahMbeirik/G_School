import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhelpComponent } from './phelp.component';

describe('PhelpComponent', () => {
  let component: PhelpComponent;
  let fixture: ComponentFixture<PhelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
