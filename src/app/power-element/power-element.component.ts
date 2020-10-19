import {
  Component,
  OnInit,
  AfterContentChecked,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  EmbeddedViewRef,
  ViewContainerRef,
} from '@angular/core';
import { EnemyFuncService } from '../services/enemy-func.service';
import { prototype } from 'assert';
@Component({
  selector: 'app-power-element',
  templateUrl: './power-element.component.html',
  styleUrls: ['./power-element.component.css'],
})
export class PowerElementComponent
  implements OnInit, AfterContentChecked, AfterViewInit {
  @ViewChildren('energy') energy: ViewContainerRef;
  constructor(private enemyFuncService: EnemyFuncService) {}
  temp = [];
  posX = 100;
  posY = 100;
  win = false;
  lose = false;
  winFunc() {}
  loseFunc() {}
  energyArr = [
    {
      id: 0,
      type: 'energy',
      x: this.posX,
      y: this.posY,
    },
  ];

  createGameElements() {
    this.posX = 100;
    this.posY = 100;
    for (let i = 0; i < 8; i++) {
      this.posY += 50;
      this.posX += 70;
      for (let i = 0; i < 20; i++) {
        i === 0 ? (this.posX = 50) : null;
        this.posX += 60;
        let energy = {
          id: i + 1,
          type: 'energy',
          x: this.posX,
          y: this.posY,
        };
        this.energyArr.push(energy);
      }
    }
  }

  ngAfterViewInit() {
    this.removeGameElements();
  }
  ngOnInit(): void {
    this.createGameElements();
  }

  ngAfterContentChecked() {
    if (this.enemyFuncService.isPlayerOverlaptGetter) {
      console.log(this.energy.length);
      this.removeGameElements();
      console.log(this.energy.length);
      this.createGameElements();
    }
  }
  removeGameElements() {
    this.energy.remove();
    this.energyArr.splice(0);
  }
}
