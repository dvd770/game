import {
  Directive,
  HostListener,
  HostBinding,
  ElementRef,
  ViewChild,
  ContentChild,
  Renderer2,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';
import { GenericFuncsService } from '../services/generic-funcs.service';
import { EnemyComponent } from '../enemy/enemy.component';
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

  ngAfterViewChecked() {
    let energyX = [];
    let energyY = [];
    let enemy = this.el.nativeElement;
    this.energyXYarray(enemy, energyX, energyY);
  }

  private energyXYarray(enemy: any, energyX: any[], energyY: any[]) {
    let enemyX = this.gnericFuncsService.getTranslateXValue(
      enemy.style.transform
    );
    let enemyY = this.gnericFuncsService.getTranslateYValue(
      enemy.style.transform
    );
    for (let i = 0; i < this.energy.length; i++) {
      let tergetX = this.gnericFuncsService.getTranslateXValue(
        this.energy[i].style.transform
      );
      let tergetY = this.gnericFuncsService.getTranslateYValue(
        this.energy[i].style.transform
      );
      energyX.push(tergetX);
      energyY.push(tergetY);
    }
    let sumBetweenX = energyX.reduce((acc, val) => {
      enemyX % acc > val ? (acc = val) : null;
      return acc;
    });
    let sumBetweenY = energyY.reduce((acc, val) => {
      enemyY % acc > val ? (acc = val) : null;
      return acc;
    });
  }

  ngOnInit() {
    let energy: HTMLElement[] = this.elementsPositionService
      .energyElementGetter;
    let enemy: HTMLElement = this.el.nativeElement;
    this.elementsPositionService.enemyElementSetter = enemy;
    let i = -1;
    const enemyToNextEnergy = () => {
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
    this.elementsPositionService.enemyElementSetter = enemy;
  }
}
