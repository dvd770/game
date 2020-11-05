import {
  Directive,
  ElementRef,
  Renderer2,
  AfterContentChecked,
  AfterViewChecked,
  HostListener,
} from '@angular/core';
import { GenericFuncsService } from '../services/generic-funcs.service';
import { ElementsPositionService } from '../services/elements-position.service';
import { UserStateService } from 'src/app/services/user-state.service';
import { GameStateService } from '../services/game-state.service';
import { EnemyFuncService } from '../services/enemy-func.service';
@Directive({
  selector: '[appEnemyController]',
})
export class EnemyControllerDirective
  implements AfterContentChecked, AfterViewChecked {
  constructor(
    private genericFuncsService: GenericFuncsService,
    private enemyFunc: EnemyFuncService,
    private elementsPositionService: ElementsPositionService,
    private el: ElementRef,
    private renderer: Renderer2,
    private gameStateService: GameStateService,
    private userStateService: UserStateService
  ) {}

  energy: HTMLElement[] = this.elementsPositionService.energyElementGetter;
  isPlayerOverlaps: boolean;
  i = -1;
  enemy = this.el.nativeElement;

  ngAfterViewChecked() {}

  ngAfterContentChecked() {
    this.isPlayerOverlaps = this.gameStateService.isPlayerOverlaps;
  }

  startGame(): void {
    let energy: HTMLElement[] = this.elementsPositionService
      .energyElementGetter;
    let counter = this.userStateService.energyCollocated;
    let player: HTMLElement = this.elementsPositionService.playerElementGetter;
    let enemy: HTMLElement = this.el.nativeElement;
    let enemyToNextEnergy = (): void => {
      let energyOverlaps = this.overlappingCheck(player, enemy, energy);
      if (!this.energy[this.i]) {
        this.gameStateService.nothingToCollect = true;
      }
      this.setNextPosition(player, enemy);
      counter = this.continueGame(
        enemyToNextEnergy,
        energyOverlaps,
        counter,
        enemy
      );
      this.elementsPositionService.enemyElementSetter = enemy;
    };
    enemyToNextEnergy();
  }

  setNextPosition(player: HTMLElement, enemy: HTMLElement) {
    let energyToMoveTo = this.energy[this.i].getBoundingClientRect();
    let left = energyToMoveTo.left - 8;
    let top = energyToMoveTo.top - 10;
    if (energyToMoveTo.left === 0) {
      left = 50;
      top = 100;
      this.renderer.setStyle(player, 'left', '200px');
      this.renderer.setStyle(player, 'top', '50px');
    }
    this.renderer.setStyle(enemy, 'left', left + 'px');
    this.renderer.setStyle(enemy, 'top', top + 'px');
  }

  overlappingCheck(
    player: HTMLElement,
    enemy: HTMLElement,
    energy: HTMLElement[]
  ) {
    let isOverlapping = this.genericFuncsService.isEnemyOverlappingPlayer(
      player,
      enemy
    );
    if (isOverlapping) {
      this.gameStateService.isPlayerOverlaps = true;
    }
    this.elementsPositionService.enemyElementSetter = enemy;
    this.i += 1;
    let energyOverlaps = this.genericFuncsService.isEnemyOverlappingEnergy(
      energy,
      enemy
    );
    return energyOverlaps;
  }

  private continueGame(
    enemyToNextEnergy: () => void,
    energyOverlaps: HTMLElement,
    counter: number,
    enemy: HTMLElement
  ) {
    if (!this.gameStateService.nothingToCollect) {
      setTimeout(enemyToNextEnergy, 100);
      if (!this.isPlayerOverlaps && this.energy[this.i]) {
        energyOverlaps ? energyOverlaps.remove() : null;
      } else if (this.energy[this.i] && this.isPlayerOverlaps) {
        counter++;
        this.renderer.removeStyle(energyOverlaps, 'top');
        this.renderer.removeStyle(energyOverlaps, 'left');
        this.renderer.addClass(energyOverlaps, 'lightElement');
        this.renderer.addClass(enemy, 'to-light');
        this.userStateService.energyCollocated = counter;
      }
    }
    return counter;
  }

  @HostListener('window:click') mousedown() {
    if (!this.gameStateService.gameFirstClick) {
      this.startGame();
    }
    this.gameStateService.gameFirstClick = true;
  }
}
