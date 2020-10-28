import { Injectable } from '@angular/core';
import { ElementsPositionService } from './elements-position.service';

@Injectable({
  providedIn: 'root',
})
export class EnemyFuncService {
  isPlayerOverlaps = false;
  nothingToCollect = false;
  elementCounterService = 0;
  gameFirstClick = false;

  constructor(private elementsPositionService: ElementsPositionService) {}
  startGame() {
    this.gameFirstClickSetter = false;
    this.isPlayerOverlapsSetter = false;
    this.nothingToCollectSetter = false;
    this.elementCounterService = 0;
    console.log(this.elementCounterService);

    this.elementsPositionService.energyElement.splice(0);
  }

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
}
