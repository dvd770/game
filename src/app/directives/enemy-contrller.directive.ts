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
  implements OnInit, AfterContentChecked, AfterViewChecked {
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
    if (this.enemyFuncService.isPlayerOverlaptGetter) {
      this.energyX = [];
      this.energyY = [];
      this.firstEnergyPush = 0;
      this.i = -1;
      this.enemyFuncService.isPlayerOverlaptSetter = false;
    }
    this.isPlayerOverlapt = this.enemyFuncService.isPlayerOverlaptGetter;
    if (this.energyY.length < 1 && this.firstEnergyPush < 3) {
      this.enemyFuncService.pushEnergyXYToArray(
        this.energyX,
        this.energyY,
        this.energy
      );
    }
    let enemy = this.el.nativeElement;
    if (this.energyY.length > 0) {
      this.closestEnergyRes = this.enemyFuncService.closestEnergyXYIDX(
        enemy,
        this.energyX,
        this.energyY
      );
    }
    this.firstEnergyPush++;
  }

  startGame(): void {
    let energy: HTMLElement[] = this.elementsPositionService
      .energyElementGetter;

    let enemyToNextEnergy = (): void => {
      let enemy: HTMLElement = this.el.nativeElement;
      this.elementsPositionService.enemyElementSetter = enemy;
      this.i = this.i + 1;
      let energyToRemove = this.gnericFuncsService.isEnemyOverlappingEnergy(
        energy,
        enemy
      );
      if (this.energy[this.i]) {
        let energyToMoveTo = this.energy[this.i].getBoundingClientRect();
        let left = energyToMoveTo.left - 8;
        let top = energyToMoveTo.top - 10;
        this.renderer.setStyle(enemy, 'left', left + 'px');
        this.renderer.setStyle(enemy, 'top', top + 'px');
      }
      if (this.energyX.length && !this.isPlayerOverlapt && this.i < 50) {
        setTimeout(enemyToNextEnergy, 100);
        energyToRemove ? energyToRemove.remove() : null;
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
  ngOnInit() {}
}
