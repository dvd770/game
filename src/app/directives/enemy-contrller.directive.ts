import {
  Directive,
  HostListener,
  HostBinding,
  ElementRef,
  ViewChild,
  ContentChild,
  Renderer2,
} from '@angular/core';
import { GenericFuncsService } from '../services/generic-funcs.service';
import { EnemyComponent } from '../enemy/enemy.component';
import { ElementsPositionService } from '../services/elements-position.service';

@Directive({
  selector: '[appEnemyContrller]',
})
export class EnemyContrllerDirective {
  constructor(
    private gnericFuncsService: GenericFuncsService,
    private elementsPositionService: ElementsPositionService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    const enemyElementR = this.el.nativeElement;
    this.elementsPositionService.enemyElementSetter = enemyElementR;
    let enemy = this.el.nativeElement;
    let energy = this.elementsPositionService.energyElementGetter;
    let i = -1;
    const enemyToNextEnergy = () => {
      i = (i + 1) % energy.length;
      let tergetX = this.gnericFuncsService.getTranslateXValue(
        energy[i].style.transform
      );
      let tergetY = this.gnericFuncsService.getTranslateYValue(
        energy[i].style.transform
      );
      console.log(energy[i], i);
      let energyHeightWidth = 50;
      let enemyHeightWidth = 50;
      let yPos = tergetY - energyHeightWidth - enemyHeightWidth + 100;
      let xPos = tergetX - energyHeightWidth - enemyHeightWidth + 30;

      let posXY = 'translate3d(' + xPos + 'px,' + yPos + 'px,0)';
      this.renderer.setStyle(enemy, 'transform', posXY);
      console.log(
        this.elementsPositionService.enemyElementGetter.style.transform
      );
      setTimeout(enemyToNextEnergy, 1000);
    };
    enemyToNextEnergy();
    this.elementsPositionService.enemyElementSetter = enemy;
  }

  @HostListener('window:click') mousedown() {}
}
