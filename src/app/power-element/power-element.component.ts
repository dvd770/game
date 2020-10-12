import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ViewChildren,
} from '@angular/core';
import { ElementsPositionService } from '../services/elements-position.service';
import { GenericFuncsService } from '../services/generic-funcs.service';
import sumFunc from '../player/arr';
@Component({
  selector: 'app-power-element',
  templateUrl: './power-element.component.html',
  styleUrls: ['./power-element.component.css'],
})
export class PowerElementComponent implements AfterViewInit {
  posX = 100;
  posY = 100;
  energyArr = [
    {
      id: 0,
      type: 'energy',
      x: this.posX,
      y: this.posY,
    },
  ];
  ngAfterViewInit(): void {
    for (let i = 0; i < 5; i++) {
      let randomY: number = Math.floor(Math.random() * 100);
      let randomX: number = Math.floor(Math.random() * 200);
      this.posY += randomY;
      this.posX += randomX;
      for (let i = 0; i < 5; i++) {
        i === 0 ? (this.posX = 10) : null;
        randomY = Math.floor(Math.random() * 100);
        randomX = Math.floor(Math.random() * 100 + 50);
        this.posX += randomX;
        i % 2 === 0 ? (this.posY += randomY) : (this.posY -= randomY);
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
  enrgyArrRemove(i: number) {
    this.energyArr.splice(i, 1);
  }
}
