import { Component, OnInit, ViewChild } from '@angular/core';
import { EnemyContrllerDirective } from '../directives/enemy-contrller.directive';
@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.css'],
})
export class EnemyComponent {
  @ViewChild(EnemyContrllerDirective) dir;

  enemyCount: number[] = [];
}
