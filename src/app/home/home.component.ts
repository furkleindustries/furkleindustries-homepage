import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  scrollToSection(section: number) {
    /* NOTE: the section argument is 1-indexed, e.g. section=1 refers to the
     * first section, not the second. */

    if (!document || !document.getElementsByTagName) {
      throw new Error(
        'Either the document or its getElementsByTagName method was missing ' +
        'when HomeComponent.scrollToSection was executed. Are you on the ' +
        'server without JSDom or the like installed?');
    } else if (section <= 0 || section % 1 !== 0) {
      throw new Error(
        'The section argument passed to HomeComponent.scrollToSection was ' +
        'not a positive integer.');
    }

    const rootElem = document.firstElementChild;

    const thisElem = document.getElementsByTagName('app-home')[0];
    if (!thisElem) {
      throw new Error(
        'The app-home element could not be found when ' +
        'HomeComponent.scrollToSection was executing.');
    }

    const sections = thisElem.getElementsByTagName('section');
    const sectionToScrollTo = sections[section - 1];
    if (!sectionToScrollTo) {
      throw new Error(
        `The value of the section argument passed to ` +
        `HomeComponent.scrollToSection was ${section}, but there was no ` +
        `section at the ${section - 1} position in the sections array ` +
        `derived from document.getElementsByTagName.`);
    }

    window.scrollTo({
      top: sectionToScrollTo.offsetTop,
      behavior: 'smooth',
    });
  }
}
