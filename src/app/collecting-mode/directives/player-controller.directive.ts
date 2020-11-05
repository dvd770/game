import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { ElementsPositionService } from '../services/elements-position.service';
import { GenericFuncsService } from '../services/generic-funcs.service';
import { GameStateService } from '../services/game-state.service';

@Directive({
  selector: '[appPlayerController]',
})
export class PlayerControllerDirective {
  constructor(
    private genericFuncsService: GenericFuncsService,
    private elementsPositionService: ElementsPositionService,
    private el: ElementRef,
    private renderer: Renderer2,
    private gameStateService: GameStateService
  ) {}

  @HostListener('window:click', ['$event']) mousedown(e: {
    clientX: number;
    clientY: number;
  }) {
    let parent = this.genericFuncsService.getParentPosition(
      this.elementsPositionService.containerElementGetter
    );
    let player = this.el.nativeElement;
    this.renderer.setStyle(player, 'transition', '0.05s');
    let xPos = e.clientX - parent.x - player.clientHeight / 2;
    let yPos = e.clientY - parent.y - player.clientWidth / 2;
    if (!this.gameStateService.nothingToCollect) {
      this.renderer.setStyle(player, 'left', xPos + 'px');
      this.renderer.setStyle(player, 'top', yPos + 'px');
    }

    this.elementsPositionService.playerElementSetter = player;
  }
}
