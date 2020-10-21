import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  AfterContentChecked,
  AfterViewChecked,
  HostListener,
} from '@angular/core';
import { GenericFuncsService } from '../services/generic-funcs.service';
import { ElementsPositionService } from '../services/elements-position.service';
import { EnemyFuncService } from '../services/enemy-func.service';
@Directive({
  selector: '[appEnemyContrller]',
})
export class EnemyContrllerDirective
  implements AfterContentChecked, AfterViewChecked {
  constructor(
    private gnericFuncsService: GenericFuncsService,
    private elementsPositionService: ElementsPositionService,
    private el: ElementRef,
    private renderer: Renderer2,
    private enemyFuncService: EnemyFuncService
  ) {}

  energy: HTMLElement[] = this.elementsPositionService.energyElementGetter;
  energyX: number[] = [];
  energyY: number[] = [];
  isPlayerOverlapt: boolean = this.enemyFuncService.isPlayerOverlaptGetter;
  closestEnergyRes: number;
  firstEnergyPush = 0;
  isGameStarted = false;
  i = -1;
  enemy = this.el.nativeElement;

  ngAfterViewChecked() {}

  ngAfterContentChecked() {
    this.isPlayerOverlapt = this.enemyFuncService.isPlayerOverlaptGetter;
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

    let enemyToNextEnergy = (): void => {
      let enemy: HTMLElement = this.el.nativeElement;
      this.elementsPositionService.enemyElementSetter = enemy;
      this.i += 1;

      let energyOverlapt = this.gnericFuncsService.isEnemyOverlappingEnergy(
        energy,
        enemy
      );
      let energyToMoveTo = this.energy[this.i].getBoundingClientRect();
      let left = energyToMoveTo.left - 8;
      let top = energyToMoveTo.top - 10;
      this.renderer.setStyle(enemy, 'left', left + 'px');
      this.renderer.setStyle(enemy, 'top', top + 'px');
      if (this.energyX.length) {
        setTimeout(enemyToNextEnergy, 100);
        if (!this.isPlayerOverlapt && this.energy[this.i]) {
          energyOverlapt ? energyOverlapt.remove() : null;
        } else {
          counter++;
          this.renderer.removeStyle(energyOverlapt, 'top');
          this.renderer.removeStyle(energyOverlapt, 'left');
          this.renderer.addClass(energyOverlapt, 'lightElement');
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
