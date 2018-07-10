import { Component, OnInit, Input, Sanitizer } from '@angular/core';
import { INavBarItemProps } from '../../navBarItems';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-navgrid-item',
  templateUrl: './navgrid-item.component.html',
  styleUrls: ['./navgrid-item.component.scss']
})
export class NavgridItemComponent implements OnInit {
  @Input() item: INavBarItemProps;
  sanitizedImgSrc: SafeStyle;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const bypass = this.sanitizer.bypassSecurityTrustStyle;
    this.sanitizedImgSrc = bypass(`url(${this.item.imgSrc})`);
  }
}