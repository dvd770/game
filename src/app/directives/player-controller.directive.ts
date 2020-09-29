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
  ArrowUpDown = 50;

  ngAfterViewInit() {}

  @HostBinding('style.left') left: string = '50%';
  @HostBinding('style.top') top: string = this.ArrowUpDown + '%';
  // @Input('appPlayerController') appPlayerControllerLeft: string;

  @HostListener('window:keydown.ArrowDown') ArrowDownEvent() {
    let ex = this.el.nativeElement.querySelector('.light-bulb');
    this.renderer.setStyle(ex, 'top', '40%');
    console.log(ex);
  }
  @HostListener('window:keydown.ArrowUp') ArrowUpEvent() {
    this.ArrowUpDown -= 10;
    console.log(this.ArrowUpDown);
  }
  @HostListener('window:keydown.ArrowLeft') ArrowLeftEvent() {
    // this.ArrowLeftRight -= 0.5;
  }
  @HostListener('window:keydown.ArrowRight') ArrowRightEvent() {
    // this.ArrowLeftRight += 0.5;
  }
  @HostListener('window:keydown.enter') enterEvent() {}
  @HostListener('window:keydown.space') spaceEvent() {}
}
