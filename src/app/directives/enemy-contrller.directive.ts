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
  }
  @HostListener('window:click') mousedown() {
    let enemy = this.el.nativeElement;
    let player = this.elementsPositionService.energyElementGetter;
    let tergetX = this.gnericFuncsService.getTranslateXValue(
      player.style.transform
    );
    let tergetY = this.gnericFuncsService.getTranslateYValue(
      player.style.transform
    );
    let playerHeightWidth = player.clientHeight;
    let enemyHeightWidth = enemy.clientHeight;

    let xPos = tergetX - enemyHeightWidth - playerHeightWidth + 30;
    let yPos = tergetY - enemyHeightWidth - playerHeightWidth + 100;

    let posXY = 'translate3d(' + xPos + 'px,' + yPos + 'px,0)';

    this.renderer.setStyle(enemy, 'transform', posXY);

    this.elementsPositionService.enemyElementSetter = enemy;
  }
}
