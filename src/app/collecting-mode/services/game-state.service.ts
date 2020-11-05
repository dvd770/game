import { Injectable } from '@angular/core';
import { ElementsPositionService } from './elements-position.service';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  constructor(private elementsPositionService: ElementsPositionService) {}
  isPlayerOverlaps = false;
  nothingToCollect = false;
  gameFirstClick = false;

  startGame() {
    setTimeout(() => {
      this.gameFirstClick = false;
    }, 0);
    this.isPlayerOverlaps = false;
    this.nothingToCollect = false;
    this.elementsPositionService.energyElement.splice(0);
  }
}
