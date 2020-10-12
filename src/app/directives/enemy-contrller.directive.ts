import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  AfterViewChecked,
} from '@angular/core';
import { GenericFuncsService } from '../services/generic-funcs.service';
import { ElementsPositionService } from '../services/elements-position.service';
import { EnemyFuncService } from '../services/enemy-func.service';
@Directive({
  selector: '[appEnemyContrller]',
})
export class EnemyContrllerDirective implements OnInit, AfterViewChecked {
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
  isSecondRound = 0;
  ngAfterViewChecked() {
    let enemy = this.el.nativeElement;
    this.energyXYarray(enemy, this.energyX, this.energyY);
  }
  energyXYarray(enemy: HTMLElement, energyX: number[], energyY: number[]) {
    let enemyXY = this.gnericFuncsService.getTranslateXYValue(
      enemy.style.transform
    );
    let enemyXYCombind = enemyXY.x + enemyXY.y;

    this.enemyFuncService.pushEnergyXYToArray(
      energyX,
      energyY,
      this.isSecondRound,
      this.energy
    );

    let closest = this.enemyFuncService.closestEnergy(
      energyX,
      energyY,
      enemyXYCombind
    );
    console.log('res ', closest);
  }

  ngOnInit() {
    let energy: HTMLElement[] = this.elementsPositionService
      .energyElementGetter;
    let enemy: HTMLElement = this.el.nativeElement;
    this.elementsPositionService.enemyElementSetter = enemy;
    let i = -1;
    let enemyToNextEnergy = () => {
      i = i + 1;
      let tergetXY = this.gnericFuncsService.getTranslateXYValue(
        energy[i].style.transform
      );

      let energyToRemove = this.gnericFuncsService.isOverlapping(energy, enemy);
      energyToRemove ? energyToRemove.remove() : null;
      let yPos = tergetXY.y - 20;
      let xPos = tergetXY.x - 115;
      let posXY = 'translate3d(' + xPos + 'px,' + yPos + 'px,0)';
      this.renderer.setStyle(enemy, 'transform', posXY);
      i !== 25 ? setTimeout(enemyToNextEnergy, 100) : null;
      this.elementsPositionService.enemyElementSetter = enemy;
    };
    enemyToNextEnergy();
  }
}
// function closestEnergy(
//   energyX: number[],
//   energyY: number[],
//   enemyXYCombind: number
// ) {
//   let energyXYCombind = energyX.map((num, idx) => {
//     return num + energyY[idx];
//   });
//   let closest = energyXYCombind.reduce((prev, curr) => {
//     return Math.abs(curr - enemyXYCombind) < Math.abs(prev - enemyXYCombind)
//       ? curr
//       : prev;
//   });
//   return closest;
// }
