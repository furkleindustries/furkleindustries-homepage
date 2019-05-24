import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavgridComponent } from './navgrid.component';
import { NavgridItemComponent } from './navgrid-item/navgrid-item.component';

describe('NavgridComponent', () => {
  let component: NavgridComponent;
  let fixture: ComponentFixture<NavgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavgridComponent,
        NavgridItemComponent,
      ],
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
