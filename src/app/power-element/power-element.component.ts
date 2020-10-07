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
  constructor() {}
  posX = 100;
  posY = 100;
  energy = [
    {
      id: 0,
      type: 'energy',
      x: this.posX,
      y: this.posY,
    },
  ];
  ngAfterViewInit() {
    for (let i = 0; i < 10; i++) {
      let randomY = 50; //Math.floor(Math.random() * 100);
      let randomX = 5; //Math.floor(Math.random() * 200);
      this.posY += randomY;
      // this.posX += randomX;
      let energyArr = {
        id: i + 1,
        type: 'energy',
        x: this.posX,
        y: this.posY,
      };
      this.energy.push(energyArr);
    }
  }
}
