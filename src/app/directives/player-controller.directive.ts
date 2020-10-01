import {
  Directive,
  HostListener,
  HostBinding,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';
import { ElementsPositionService } from '../services/elements-position.service';

@Directive({
  selector: '[appPlayerController]',
})
export class PlayerControllerDirective {
  constructor(
    private elementsPositionService: ElementsPositionService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('window:keydown.enter') enterEvent() {
    let el = this.el.nativeElement;
    this.renderer.setStyle(el, 'top', '20%');
    console.log('el' + el);
  }
  @HostListener('window:keydown.space') spaceEvent() {}
}
