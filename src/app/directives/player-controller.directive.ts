import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { ElementsPositionService } from '../services/elements-position.service';
import { GenericFuncsService } from '../services/generic-funcs.service';
import { EnemyFuncService } from '../services/enemy-func.service';

@Directive({
  selector: '[appPlayerController]',
})
export class PlayerControllerDirective {
  constructor(
    private gnericFuncsService: GenericFuncsService,
    private elementsPositionService: ElementsPositionService,
    private el: ElementRef,
    private renderer: Renderer2,
    private enemyFuncService: EnemyFuncService
  ) {}

  @HostListener('window:click', ['$event']) mousedown(e: {
    clientX: number;
    clientY: number;
  }) {
    let enemy = this.elementsPositionService.enemyElementGetter;
    let playerPosition = this.el.nativeElement;
    let parent = this.gnericFuncsService.getParentPosition(
      this.elementsPositionService.continerElementGetter
    );
    let player = this.el.nativeElement;
    this.renderer.setStyle(player, 'transition', '0.05s');

    let xPos = e.clientX - parent.x - player.clientHeight / 2;
    let yPos = e.clientY - parent.y - player.clientWidth / 2;
    let posXY = 'translate3d(' + xPos + 'px,' + yPos + 'px,0)';
    this.renderer.setStyle(player, 'transform', posXY);
    let isOverlapping = this.gnericFuncsService.isEnemyOverlappingPlayer(
      player,
      enemy
    );

    isOverlapping
      ? (this.enemyFuncService.isPlayerOverlaptSetter = true)
      : null;

    this.elementsPositionService.playerElementSetter = playerPosition;
  }
}
