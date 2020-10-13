import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  AfterViewChecked,
  AfterContentChecked,
} from '@angular/core';
import { GenericFuncsService } from '../services/generic-funcs.service';
import { ElementsPositionService } from '../services/elements-position.service';
import { EnemyFuncService } from '../services/enemy-func.service';
@Directive({
  selector: '[appEnemyContrller]',
})
export class EnemyContrllerDirective implements OnInit, AfterContentChecked {
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

  ngAfterContentChecked() {
    this.energyY.length < 3
      ? this.enemyFuncService.pushEnergyXYToArray(
          this.energyX,
          this.energyY,
          this.energy
        )
      : null;
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
      i !== 25 && !this.isPlayerOverlapt
        ? setTimeout(enemyToNextEnergy, 100)
        : null;
      this.elementsPositionService.enemyElementSetter = enemy;
    };
    enemyToNextEnergy();
  }
}
