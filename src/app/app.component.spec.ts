import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet, RouterModule, provideRoutes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarItemComponent } from './navbar/navbar-item/navbar-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './routes';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ResourcesComponent } from './resources/resources.component';
import { ProjectsComponent } from './projects/projects.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { NavgridComponent } from './navgrid/navgrid.component';
import { NavgridItemComponent } from './navgrid/navgrid-item/navgrid-item.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { ProjectsListItemComponent } from './projects/projects-list/projects-list-item/projects-list-item.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        NavbarComponent,
        NavbarItemComponent,
        HomeComponent,
        AboutComponent,
        ProjectsComponent,
        ResourcesComponent,
        ProjectsListComponent,
        ProjectsListItemComponent,
        FourOhFourComponent,
        NavgridComponent,
        NavgridItemComponent,
      ],

      imports: [
        RouterTestingModule,
        RouterModule,
      ],

      providers: [
        provideRoutes(routes),
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Furkle Industries Homepage'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Furkle Industries Homepage');
  }));
});
