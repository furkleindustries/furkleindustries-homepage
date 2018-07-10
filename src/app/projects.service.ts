import { Injectable } from '@angular/core';
import { projects } from './projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor() { }

  getProjects() {
    return projects;
  }
}
