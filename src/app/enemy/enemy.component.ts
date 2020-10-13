import { Component, OnInit } from '@angular/core';
import { ElementsPositionService } from '../services/elements-position.service';

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.css'],
})
export class EnemyComponent {
  constructor(private elementsPositionService: ElementsPositionService) {}
  enemyCount: number[] = [];
  ngOnInit() {
    console.log('init');

    // let counter = 0;
    // let Interval = setInterval(() => {
    //   counter++;
    //   this.enemyCount.push(1);
    //   if (counter === 2) {
    //     clearInterval(Interval);
    //   }
    // }, 500);
  }
}
