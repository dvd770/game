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
    let enemyX = this.gnericFuncsService.getTranslateXValue(
      enemy.style.transform
    );
    let enemyY = this.gnericFuncsService.getTranslateYValue(
      enemy.style.transform
    );
    console.log(enemyX, enemyY);
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
    var sumBetweenX = energyX.reduce((acc, val) => {
      console.log(enemyY, acc, val);

      enemyX % acc > val ? (acc = val) : null;
      return acc;
    });
    var sumBetweenY = energyY.reduce((acc, val) => {
      console.log(enemyY, acc, val);

      enemyY % acc > val ? (acc = val) : null;
      return acc;
    });
    console.log('x', sumBetweenX);
    console.log('y', sumBetweenY);

    console.log('X', energyX);
    console.log('Y', energyY);
  }

  ngOnInit() {
    let energy = this.elementsPositionService.energyElementGetter;
    let enemy = this.el.nativeElement;
    this.elementsPositionService.enemyElementSetter = enemy;
    let i = -1;
    const enemyToNextEnergy = () => {
      i = (i + 1) % energy.length;
      let tergetX = this.gnericFuncsService.getTranslateXValue(
        energy[i].style.transform
      );
      let tergetY = this.gnericFuncsService.getTranslateYValue(
        energy[i].style.transform
      );
      let parent = this.gnericFuncsService.getPosition(
        this.elementsPositionService.continerElementGetter
      );
      let energyHeightWidth = 45;
      let enemyHeightWidth = 55;
      let yPos = tergetY - parent.y + energyHeightWidth - enemyHeightWidth;
      let xPos = tergetX - parent.x - energyHeightWidth - enemyHeightWidth;
      let posXY = 'translate3d(' + xPos + 'px,' + yPos + 'px,0)';
      this.renderer.setStyle(enemy, 'transform', posXY);
      // setTimeout(enemyToNextEnergy, 1000);
    };
    enemyToNextEnergy();
    this.elementsPositionService.enemyElementSetter = enemy;
  }
}
