import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
  ViewChildren,
  AfterViewInit,
} from '@angular/core';
import { EnemyFuncService } from '../services/enemy-func.service';
import { ContainerComponent } from '../container/container.component';
import { ElementsPositionService } from '../services/elements-position.service';
@Component({
  selector: 'app-power-element',
  templateUrl: './power-element.component.html',
  styleUrls: ['./power-element.component.css'],
})
export class PowerElementComponent implements OnInit {
  posX = 100;
  posY = 100;

  energyArr = [
    {
      x: this.posX,
      y: this.posY,
    },
  ];

  createGameElements() {
    this.posX = 100;
    this.posY = 100;
    for (let i = 0; i < 5; i++) {
      this.posY += 50;
      i % 2 === 0 ? (this.posX -= 60) : (this.posX += 60);
      for (let index = 0; index < 10; index++) {
        i % 2 === 0 ? (this.posX += 60) : (this.posX -= 60);
        let energy = {
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
