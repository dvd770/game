import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { EnemyFuncService } from '../services/enemy-func.service';
import { ContinerComponent } from '../continer/continer.component';
@Component({
  selector: 'app-power-element',
  templateUrl: './power-element.component.html',
  styleUrls: ['./power-element.component.css'],
})
export class PowerElementComponent implements OnInit {
  @ViewChild('energy') energy: ElementRef;
  @ViewChildren('energyChild') energyChild: ElementRef;
  constructor(
    private enemyFuncService: EnemyFuncService,
    private renderer: Renderer2
  ) {}
  public continerRef: ContinerComponent;
  public unique_key: number;
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
      i % 2 === 0 ? (this.posX -= 60) : (this.posX += 60);
      for (let index = 0; index < 20; index++) {
        i % 2 === 0 ? (this.posX += 60) : (this.posX -= 60);
        console.log('this.posX', this.posX);
        console.log('this.posY', this.posY);
        let energy = {
          id: index + 1,
          type: 'energy',
          x: this.posX,
          y: this.posY,
        };
        this.energyArr.push(energy);
      }
    }
  }

  ngOnInit(): void {
    this.createGameElements();
  }
}
