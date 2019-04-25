import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ProjectsService,
} from '../projects.service';
import {
  IProjectListItemProps,
} from '../projects';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: [ './projects.component.scss' ],
})
export class ProjectsComponent implements OnInit {
  public projects: ReadonlyArray<IProjectListItemProps> = this.projectsService.getProjects();
  constructor(private projectsService: ProjectsService) {}
  ngOnInit() {}
}
