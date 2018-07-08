import { Component, OnInit, Input } from '@angular/core';
import { IProjectListItemProps } from '../../projects';

@Component({
  selector: 'app-projects-list-item',
  templateUrl: './projects-list-item.component.html',
  styleUrls: ['./projects-list-item.component.scss']
})
export class ProjectsListItemComponent implements OnInit {
  @Input() project: IProjectListItemProps;

  constructor() { }

  ngOnInit() {
  }

}
