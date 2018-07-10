import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavgridComponent } from './navgrid.component';

describe('SectionGridComponent', () => {
  let component: NavgridComponent;
  let fixture: ComponentFixture<NavgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
