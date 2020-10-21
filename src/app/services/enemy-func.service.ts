import { Injectable } from '@angular/core';
import { GenericFuncsService } from './generic-funcs.service';

@Injectable({
  providedIn: 'root',
})
export class EnemyFuncService {
  constructor(private gnericFuncsService: GenericFuncsService) {}
  isPlayerOverlapt: boolean = false;
  elementCounterService = 0;
  set elementCounterSetter(count: number) {
    this.elementCounterService = count;
  }

  get elementCounterGetter() {
    return this.elementCounterService;
  }

  set isPlayerOverlaptSetter(isOverlapt: boolean) {
    this.isPlayerOverlapt = isOverlapt;
  }
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
      let addToPrev = prev + 1000;
      let addToCurr = curr + 1000;
      let res =
        Math.abs(addToCurr - enemyXYCombind) <
        Math.abs(addToPrev - enemyXYCombind)
          ? curr
          : prev;
      return res;
    });
    let res = energyXYCombind.indexOf(closest);
    return res;
  }

  closestEnergyXYIDX(
    enemy: HTMLElement,
    energyX: number[],
    energyY: number[]
  ): number {
    let enemyXY = enemy.getBoundingClientRect();
    let enemyXYCombind = enemyXY.left + enemyXY.top;
    let closest = this.closestEnergy(energyX, energyY, enemyXYCombind);
    return closest;
  }

  pushEnergyXYToArray(
    energyX: number[],
    energyY: number[],
    energy: HTMLElement[]
  ): void {
    for (let i = 0; i < energy.length; i++) {
      let energyXY = energy[i].getBoundingClientRect();
      energyX.push(energyXY.left);
      energyY.push(energyXY.top);
    }
  }
}
