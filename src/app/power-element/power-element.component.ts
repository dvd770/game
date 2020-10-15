import { Component, AfterViewInit, OnInit } from '@angular/core';
import { EnergyFuncService } from '../services/energy-func.service';
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
      id: 0,
      type: 'energy',
      x: this.posX,
      y: this.posY,
    },
  ];

  ngOnInit(): void {
    for (let i = 0; i < 8; i++) {
      let randomY: number = Math.floor(Math.random() * 100);
      let randomX: number = Math.floor(Math.random() * 200);
      this.posY += 60; //randomY;
      this.posX += 60; //randomX;
      for (let i = 0; i < 20; i++) {
        i === 0 ? (this.posX = 50) : null;
        randomX = Math.floor(Math.random() * 100 + 50);
        this.posX += 60; // randomX;
        i % 2 === 0 ? (this.posY += 50) : (this.posY -= 50);
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
}
