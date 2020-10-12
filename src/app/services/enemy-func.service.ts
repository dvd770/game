import { Injectable } from '@angular/core';
import { GenericFuncsService } from './generic-funcs.service';

@Injectable({
  providedIn: 'root',
})
export class EnemyFuncService {
  constructor(private gnericFuncsService: GenericFuncsService) {}
  closestEnergy(energyX: number[], energyY: number[], enemyXYCombind: number) {
    let energyXYCombind = energyX.map((num, idx) => {
      return num + energyY[idx];
    });
    let closest = energyXYCombind.reduce((prev, curr, idx) => {
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
    isSecondRound: number,
    energy: HTMLElement[]
  ) {
    if (isSecondRound < 2) {
      for (let i = 0; i < energy.length; i++) {
        let tergetXY = this.gnericFuncsService.getTranslateXYValue(
          energy[i].style.transform
        );
        energyX.push(tergetXY.x);
        energyY.push(tergetXY.y);
      }
    }
    isSecondRound++;
  }
}
