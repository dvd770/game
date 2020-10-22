import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnemyFuncService } from '../services/enemy-func.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  constructor(
    private router: Router,
    private enemyFuncService: EnemyFuncService
  ) {}

  ngOnInit(): void {}
  gameClick() {
    this.enemyFuncService.gameFirstClickSetter = false;
    this.enemyFuncService.isPlayerOverlaptSetter = false;
    this.enemyFuncService.elementCounterSetter = 0;
    this.enemyFuncService.nothingToCellactSetter = false;
    this.router.navigate(['/']);
  }
}
