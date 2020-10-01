import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  Renderer2,
  NgZone,
} from '@angular/core';

import { ElementsPositionService } from '../services/elements-position.service';
import { GenericFuncsService } from '../services/generic-funcs.service';
import sumFunc from './arr';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent {
  constructor(
    private gnericFuncsService: GenericFuncsService,
    private zone: NgZone,
    private elementsPositionService: ElementsPositionService,
    private renderer: Renderer2
  ) {}
  @ViewChild('playerElement') playerElement: ElementRef;
  @ViewChild('contaner') contaner: ElementRef;
  playerElementCurrentPosition;

  stoptClick: boolean = false;
  ngAfterViewInit() {
    // sumFunc();
    const playerElementR = this.playerElement.nativeElement;
    let bounds = this.playerElement.nativeElement.getBoundingClientRect();
    this.elementsPositionService.playerElementSetter = playerElementR;
  }

  @HostListener('window:click', ['$event']) mousedown(e: {
    clientX: number;
    clientY: number;
  }) {
    let player = this.playerElement.nativeElement;
    let xPos = e.clientX - player.clientHeight;
    let yPos = e.clientY - player.clientWidth;
    let posXY = 'translate3d(' + xPos + 'px,' + yPos + 'px,0)';
    this.renderer.setStyle(player, 'transform', posXY);
    let playerPosition = this.playerElement.nativeElement.getBoundingClientRect();
    this.elementsPositionService.playerElementSetter = playerPosition;
    console.log(this.elementsPositionService.playerElementGetter);
  }
}
