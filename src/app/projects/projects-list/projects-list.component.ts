import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  IProjectListItemProps,
} from '../../projects';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: [ './projects-list.component.scss' ],
})
export class ProjectsListComponent implements OnInit {
  @Input() projects: IProjectListItemProps[];
  public ngOnInit = () => {};
}
