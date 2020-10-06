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
  constructor(private renderer: Renderer2) {}
  posX = 500;
  posY = 500;
  energy = [
    {
      id: 0,
      type: 'energy',
      x: this.posX,
      y: this.posY,
    },
  ];
  ngAfterViewInit() {
    for (let i = 0; i < 4; i++) {
      this.posY += 50;
      this.posX += 100;
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
