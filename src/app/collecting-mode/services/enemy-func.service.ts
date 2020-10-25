import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnemyFuncService {
  isPlayerOverlaps = false;
  nothingToCollect = false;
  elementCounterService = 0;
  gameFirstClick = false;

  set gameFirstClickSetter(bool: boolean) {
    this.gameFirstClick = bool;
  }

  get gameFirstClickGetter() {
    return this.gameFirstClick;
  }
  set elementCounterSetter(count: number) {
    this.elementCounterService = count;
  }

  get elementCounterGetter() {
    return this.elementCounterService;
  }

  set nothingToCollectSetter(bool: boolean) {
    this.nothingToCollect = bool;
  }
  get nothingToCollectGetter() {
    return this.nothingToCollect;
  }
  set isPlayerOverlapsSetter(isOverlaps: boolean) {
    this.isPlayerOverlaps = isOverlaps;
  }
  get isPlayerOverlapsGetter() {
    return this.isPlayerOverlaps;
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
