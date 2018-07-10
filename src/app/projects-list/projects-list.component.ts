import { Component, OnInit, Input } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { IProjectListItemProps } from '../projects';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects: Array<IProjectListItemProps>;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projects = this.getProjects();
  }

  getProjects() {
    return this.projectsService.getProjects();
  }
}
