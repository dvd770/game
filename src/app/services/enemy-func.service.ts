import { Injectable } from '@angular/core';
import { GenericFuncsService } from './generic-funcs.service';

@Injectable({
  providedIn: 'root',
})
export class EnemyFuncService {
  constructor(private gnericFuncsService: GenericFuncsService) {}
  isPlayerOverlapt: boolean = false;
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
      let res =
        Math.abs(curr - enemyXYCombind) < Math.abs(prev - enemyXYCombind)
          ? curr
          : prev;
      return res;
    });

    let res = energyXYCombind.indexOf(closest);
    if (res - enemyXYCombind > 50) {
      console.log('closest - enemyXYCombind', closest - enemyXYCombind);
      console.log('closest', closest);
      console.log('enemyXYCombind', enemyXYCombind);
    }
    return res;
  }

  closestEnergyXYIDX(enemy: HTMLElement, energyX: number[], energyY: number[]) {
    let enemyXY = this.gnericFuncsService.getTranslateXYValue(
      enemy.style.transform
    );
    let enemyXYCombind = enemyXY.x + enemyXY.y;
    let closest = this.closestEnergy(energyX, energyY, enemyXYCombind);

    return closest;
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
  }
}
