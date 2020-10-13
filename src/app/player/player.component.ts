import { Component, SimpleChanges } from '@angular/core';
import sumFunc from './arr';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent {
  changeLog: any;
  ngOnInit() {
    this.changeLog = 1;
  }
}
