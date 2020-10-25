import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnemyFuncService } from '../../collecting-mode/services/enemy-func.service';

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
    this.enemyFuncService.isPlayerOverlapsSetter = false;
    this.enemyFuncService.elementCounterSetter = 0;
    this.enemyFuncService.nothingToCollectSetter = false;
    this.router.navigate(['/']);
  }
}
