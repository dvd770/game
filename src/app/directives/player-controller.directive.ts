import {
  Directive,
  HostListener,
  HostBinding,
  ElementRef,
  Input,
  Renderer2,
  OnInit,
} from '@angular/core';
import { ElementsPositionService } from '../services/elements-position.service';
import { GenericFuncsService } from '../services/generic-funcs.service';

@Directive({
  selector: '[appPlayerController]',
})
export class PlayerControllerDirective implements OnInit {
  constructor(
    private gnericFuncsService: GenericFuncsService,
    private elementsPositionService: ElementsPositionService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    const playerElementR = this.el.nativeElement;
    this.elementsPositionService.playerElementSetter = playerElementR;
  }
  click: boolean = false;

  @HostListener('window:mouseup') mousup() {
    this.click = false;
  }

  // @HostListener('window:mousemove', ['$event']) mousmove(e: {
  //   clientX: number;
  //   clientY: number;
  // }) {
  //   console.log(this.click);

  //   let playerPosition = this.el.nativeElement;
  //   let parent = this.gnericFuncsService.getPosition(
  //     this.elementsPositionService.continerElementGetter
  //   );
  //   let player = this.el.nativeElement;
  //   let xPos = e.clientX - parent.x - player.clientHeight / 2;
  //   let yPos = e.clientY - parent.y - player.clientWidth / 2;
  //   let posXY = 'translate3d(' + xPos + 'px,' + yPos + 'px,0)';
  //   this.elementsPositionService.playerElementSetter = playerPosition;
  //   //   this.click === true
  //   //   ? this.renderer.setStyle(player, 'transform', posXY)
  //   //   : null;
  // }
  @HostListener('window:click', ['$event']) mousedown(e: {
    clientX: number;
    clientY: number;
  }) {
    this.click = true;

    let playerPosition = this.el.nativeElement;
    this.elementsPositionService.playerElementSetter = playerPosition;
    let parent = this.gnericFuncsService.getPosition(
      this.elementsPositionService.continerElementGetter
    );
    let player = this.el.nativeElement;

    let xPos = e.clientX - parent.x - player.clientHeight / 2;
    let yPos = e.clientY - parent.y - player.clientWidth / 2;

    let posXY = 'translate3d(' + xPos + 'px,' + yPos + 'px,0)';
    this.renderer.setStyle(player, 'transform', posXY);
    // this.elementsPositionService.playerElementSetter = playerPosition;
    this.click = false;
  }

  @HostListener('window:keydown.enter') enterEvent() {}
  @HostListener('window:keydown.space') spaceEvent() {}
}
