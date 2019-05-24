import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavgridItemComponent } from './navgrid-item.component';

describe('NavgridItemComponent', () => {
  let component: NavgridItemComponent;
  let fixture: ComponentFixture<NavgridItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavgridItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavgridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
