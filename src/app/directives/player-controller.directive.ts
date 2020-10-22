import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
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
    let parent = this.gnericFuncsService.getParentPosition(
      this.elementsPositionService.continerElementGetter
    );
    let player = this.el.nativeElement;
    let left;
    let top;
    let playerPos = player.getBoundingClientRect();
    left = playerPos.left;
    top = playerPos.top;
    this.renderer.setStyle(player, 'transition', '0.05s');
    let xPos = e.clientX - parent.x - player.clientHeight / 2;
    let yPos = e.clientY - parent.y - player.clientWidth / 2;
    this.renderer.setStyle(player, 'left', xPos + 'px');
    this.renderer.setStyle(player, 'top', yPos + 'px');
    this.elementsPositionService.playerElementSetter = player;
  }
}
