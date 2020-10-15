import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  AfterContentChecked,
  AfterViewChecked,
  Input,
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
  first = 0;
  isFirst = true;
  ngAfterViewChecked() {}
  ngAfterContentChecked() {
    this.isPlayerOverlapt = this.enemyFuncService.isPlayerOverlaptGetter;

    if (this.energyY.length < 1 && this.first < 3) {
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
    this.first++;
  }
  @HostListener('window:click') mousedown() {
    if (this.isFirst) {
      this.startGame();
    }
    this.isFirst = false;
  }
  startGame() {
    console.log('directiv start game');
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
      energyToRemove ? energyToRemove.remove() : null;
      let yPos = this.energyY[this.closestEnergyRes] - 20;
      let xPos = this.energyX[this.closestEnergyRes] - 115;
      this.energyY.splice(this.closestEnergyRes, 1),
        this.energyX.splice(this.closestEnergyRes, 1);
      let posXY = 'translate3d(' + xPos + 'px,' + yPos + 'px,0)';
      this.renderer.setStyle(enemy, 'transform', posXY);
      if (this.energyX.length && !this.isPlayerOverlapt) {
        setTimeout(enemyToNextEnergy, 100);
      }

      this.elementsPositionService.enemyElementSetter = enemy;
    };
    enemyToNextEnergy();
  }

  ngOnInit() {}
}
