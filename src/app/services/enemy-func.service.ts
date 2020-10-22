import { Injectable } from '@angular/core';
import { GenericFuncsService } from './generic-funcs.service';

@Injectable({
  providedIn: 'root',
})
export class EnemyFuncService {
  isPlayerOverlapt = false;
  nothingToCellact = false;
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

  set nothingToCellactSetter(bool: boolean) {
    this.nothingToCellact = bool;
  }
  get nothingToCellactGetter() {
    return this.nothingToCellact;
  }
  set isPlayerOverlaptSetter(isOverlapt: boolean) {
    this.isPlayerOverlapt = isOverlapt;
  }
  get isPlayerOverlaptGetter() {
    return this.isPlayerOverlapt;
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
