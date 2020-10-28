import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {}
  github() {
    this.document.location.href = 'https://github.com/dvd770/game';
  }
}
