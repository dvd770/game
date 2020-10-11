import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  AfterViewChecked,
} from '@angular/core';
import { GenericFuncsService } from '../services/generic-funcs.service';
import { ElementsPositionService } from '../services/elements-position.service';
@Directive({
  selector: '[appEnemyContrller]',
})
export class EnemyContrllerDirective implements OnInit, AfterViewChecked {
  constructor(
    private gnericFuncsService: GenericFuncsService,
    private elementsPositionService: ElementsPositionService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}
  energy = this.elementsPositionService.energyElementGetter;
  energyX = [];
  energyY = [];
  ngAfterViewChecked() {
    let enemy = this.el.nativeElement;
    this.energyXYarray(enemy, this.energyX, this.energyY);
  }
  energyXYarray(enemy: HTMLElement, energyX: any[], energyY: any[]) {
    let enemyXY = this.gnericFuncsService.getTranslateXYValue(
      enemy.style.transform
    );
    for (let i = 0; i < this.energy.length; i++) {
      let tergetXY = this.gnericFuncsService.getTranslateXYValue(
        this.energy[i].style.transform
      );
      energyX.push(tergetXY.x);
      energyY.push(tergetXY.y);
    }
    let sumBetweenX = energyX.reduce((acc, val) => {
      enemyXY.x % acc > val ? (acc = val) : null;
      return acc;
    });
    let sumBetweenY = energyY.reduce((acc, val) => {
      enemyXY.y % acc > val ? (acc = val) : null;
      return acc;
    });
  }
  ngOnInit() {
    let energy: HTMLElement[] = this.elementsPositionService
      .energyElementGetter;
    let enemy: HTMLElement = this.el.nativeElement;
    this.elementsPositionService.enemyElementSetter = enemy;
    let i = -1;
    let enemyToNextEnergy = () => {
      i = (i + 1) % energy.length;
      let tergetXY = this.gnericFuncsService.getTranslateXYValue(
        energy[i].style.transform
      );
      let parent = this.gnericFuncsService.getParentPosition(
        this.elementsPositionService.continerElementGetter
      );
      this.gnericFuncsService.isOverlapping(energy, enemy);
      let yPos = tergetXY.y - parent.y - 10;
      let xPos = tergetXY.x - parent.x - 45 - 55;
      let posXY = 'translate3d(' + xPos + 'px,' + yPos + 'px,0)';
      this.renderer.setStyle(enemy, 'transform', posXY);
      setTimeout(enemyToNextEnergy, 1000);
      this.elementsPositionService.enemyElementSetter = enemy;
    };
    enemyToNextEnergy();
  }
}
