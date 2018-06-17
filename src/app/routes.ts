import { AboutComponent, } from './about/about.component';
import { HomeComponent, } from './home/home.component';
import { ResourcesComponent } from './resources/resources.component';
import { UserStoriesComponent } from './user-stories/user-stories.component';

export const routes = [
  { path: '', component: HomeComponent, },
  { path: 'about', component: AboutComponent, },
  { path: 'resources', component: ResourcesComponent, },
  { path: 'user-stories', component: UserStoriesComponent, },
];

export default routes;