import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  AfterContentChecked,
  AfterViewChecked,
  Input,
  OnChanges,
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
  isFirstStartGame = true;

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

  startGame() {
    let energy: HTMLElement[] = this.elementsPositionService
      .energyElementGetter;
    let i = -1;
    let enemyToNextEnergy = () => {
      let enemy: HTMLElement = this.el.nativeElement;
      this.elementsPositionService.enemyElementSetter = enemy;
      i = i + 1;
      let energyToRemove = this.gnericFuncsService.isEnemyOverlappingEnergy(
        energy,
        enemy
      );
      let left;
      let top;
      if (this.energy[i]) {
        let energyToMove = this.energy[i].getBoundingClientRect();
        left = energyToMove.left;
        top = energyToMove.top;
      }
      this.renderer.setStyle(enemy, 'left', left + 'px');
      this.renderer.setStyle(enemy, 'top', top + 'px');
      if (this.energyX.length && !this.isPlayerOverlapt && i < 200) {
        setTimeout(enemyToNextEnergy, 100);
        energyToRemove ? energyToRemove.remove() : null;
      }
      this.elementsPositionService.enemyElementSetter = enemy;
    };
    enemyToNextEnergy();
  }

  @HostListener('window:click') mousedown() {
    if (this.isFirstStartGame) {
      this.startGame();
    }
    this.isFirstStartGame = false;
  }
  ngOnInit() {}
}
