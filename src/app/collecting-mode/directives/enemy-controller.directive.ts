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
import { EnemyFuncService } from '../services/enemy-func.service';
@Directive({
  selector: '[appEnemyController]',
})
export class EnemyControllerDirective
  implements AfterContentChecked, AfterViewChecked {
  constructor(
    private genericFuncsService: GenericFuncsService,
    private elementsPositionService: ElementsPositionService,
    private el: ElementRef,
    private renderer: Renderer2,
    private enemyFuncService: EnemyFuncService
  ) {}

  energy: HTMLElement[] = this.elementsPositionService.energyElementGetter;
  energyX: number[] = [];
  energyY: number[] = [];
  isPlayerOverlaps: boolean = this.enemyFuncService.isPlayerOverlapsGetter;
  closestEnergyRes: number;
  firstEnergyPush = 0;
  isGameStarted = false;
  i = -1;
  enemy = this.el.nativeElement;

  ngAfterViewChecked() {}

  ngAfterContentChecked() {
    this.isPlayerOverlaps = this.enemyFuncService.isPlayerOverlapsGetter;
    if (this.energyY.length < 1 && this.firstEnergyPush < 3) {
      this.enemyFuncService.pushEnergyXYToArray(
        this.energyX,
        this.energyY,
        this.energy
      );
    }
    this.firstEnergyPush++;
  }

  startGame(): void {
    let energy: HTMLElement[] = this.elementsPositionService
      .energyElementGetter;
    let counter = 0;
    let player: HTMLElement = this.elementsPositionService.playerElementGetter;
    let enemy: HTMLElement = this.el.nativeElement;
    let enemyToNextEnergy = (): void => {
      let isOverlapping = this.genericFuncsService.isEnemyOverlappingPlayer(
        player,
        enemy
      );
      if (isOverlapping) {
        this.enemyFuncService.isPlayerOverlapsSetter = true;
      }
      this.elementsPositionService.enemyElementSetter = enemy;
      this.i += 1;

      let energyOverlaps = this.genericFuncsService.isEnemyOverlappingEnergy(
        energy,
        enemy
      );
      if (!this.energy[this.i]) {
        this.enemyFuncService.nothingToCollectSetter = true;
      }
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

      if (
        this.energyX.length &&
        !this.enemyFuncService.nothingToCollectGetter
      ) {
        setTimeout(enemyToNextEnergy, 100);
        if (!this.isPlayerOverlaps && this.energy[this.i]) {
          energyOverlaps ? energyOverlaps.remove() : null;
        } else if (this.energy[this.i] && this.isPlayerOverlaps) {
          counter++;
          this.renderer.removeStyle(energyOverlaps, 'top');
          this.renderer.removeStyle(energyOverlaps, 'left');
          this.renderer.addClass(energyOverlaps, 'lightElement');
          this.renderer.addClass(enemy, 'enemy-light');
          this.enemyFuncService.elementCounterSetter = counter;
        }
      }
      this.elementsPositionService.enemyElementSetter = enemy;
    };
    enemyToNextEnergy();
  }

  @HostListener('window:click') mousedown() {
    if (!this.isGameStarted) {
      this.startGame();
    }
    this.isGameStarted = true;
  }
}
