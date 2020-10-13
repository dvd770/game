import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.css'],
})
export class EnemyComponent {
  enemyCount: number[] = [];
  ngOnInit() {
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
