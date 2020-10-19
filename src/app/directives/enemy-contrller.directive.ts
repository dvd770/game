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
import { prototype } from 'assert';
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
      console.log(this.energyY);
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
    let i = -1;
    let enemyToNextEnergy = (): void => {
      let enemy: HTMLElement = this.el.nativeElement;
      this.elementsPositionService.enemyElementSetter = enemy;
      i = i + 1;
      let energyToRemove = this.gnericFuncsService.isEnemyOverlappingEnergy(
        energy,
        enemy
      );
      console.log(this.closestEnergyRes);
      let left;
      let top;
      let energyToMoveTo;
      let prevPos;

      // if (this.energy[i]) {
      //   energyToMoveTo = this.energy[i].getBoundingClientRect();
      //   left = energyToMoveTo.left;
      //   top = energyToMoveTo.top;
      // }
      if (this.energy[this.closestEnergyRes] === prototype.HTMLElement) {
        console.log(this.energy[this.closestEnergyRes]);
        prevPos = energyToRemove.getBoundingClientRect();
        let energyToMoveTo = this.energy[
          this.closestEnergyRes
        ].getBoundingClientRect();
        left = energyToMoveTo.left;
        top = energyToMoveTo.top;
      }
      this.renderer.setStyle(enemy, 'left', left + 'px');
      this.renderer.setStyle(enemy, 'top', top + 'px');
      if (this.energyX.length && !this.isPlayerOverlapt && i < 50) {
        setTimeout(enemyToNextEnergy, 100);
        energyToRemove ? energyToRemove.remove() : null;
        console.log('prevPos', prevPos);
        console.log('nextPos', energyToMoveTo);
        console.log(i);
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
