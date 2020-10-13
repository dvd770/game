import { Injectable } from '@angular/core';
import { GenericFuncsService } from './generic-funcs.service';

@Injectable({
  providedIn: 'root',
})
export class EnemyFuncService {
  constructor(private gnericFuncsService: GenericFuncsService) {}
  isPlayerOverlapt: boolean = false;
  get isPlayerOverlaptGetter() {
    return this.isPlayerOverlapt;
  }
  closestEnergy(
    energyX: number[],
    energyY: number[],
    enemyXYCombind: number
  ): number {
    let energyXYCombind = energyX.map((num, idx) => {
      return num + energyY[idx];
    });
    let closest = energyXYCombind.reduce((prev, curr) => {
      let res =
        Math.abs(curr - enemyXYCombind) < Math.abs(prev - enemyXYCombind)
          ? curr
          : prev;
      return res;
    });
    let closest1 = energyXYCombind.reduce(
      (acc, curr, idx) => (curr === closest ? [...acc, idx] : acc),
      []
    );
    return closest1[0];
  }

  pushEnergyXYToArray(
    energyX: number[],
    energyY: number[],
    energy: HTMLElement[]
  ): void {
    for (let i = 0; i < energy.length; i++) {
      let tergetXY = this.gnericFuncsService.getTranslateXYValue(
        energy[i].style.transform
      );
      energyX.push(tergetXY.x);
      energyY.push(tergetXY.y);
    }
    console.log(energyX, energyY, energy);
  }
  energyXYarray(
    enemy: HTMLElement,
    energyX: number[],
    energyY: number[]
  ): number {
    let enemyXY = this.gnericFuncsService.getTranslateXYValue(
      enemy.style.transform
    );
    let enemyXYCombind = enemyXY.x + enemyXY.y;
    let closest = this.closestEnergy(energyX, energyY, enemyXYCombind);
    console.log(closest);
    return closest;
  }
}
