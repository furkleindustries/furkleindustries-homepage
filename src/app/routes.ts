import { AboutComponent, } from './about/about.component';
import { HomeComponent, } from './home/home.component';
import { ResourcesComponent } from './resources/resources.component';
import { ProjectsComponent } from './projects/projects.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';

export const routes = [
  { path: '', component: HomeComponent, },
  { path: 'about', component: AboutComponent, },
  { path: 'resources', component: ResourcesComponent, },
  { path: 'projects', component: ProjectsComponent, },
  { path: '**', component: FourOhFourComponent, }
];

export default routes;
