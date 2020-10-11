import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  HostListener,
} from '@angular/core';
import { ElementsPositionService } from '../services/elements-position.service';
import { GenericFuncsService } from '../services/generic-funcs.service';

@Directive({
  selector: '[appPowerElementController]',
})
export class PowerElementControllerDirective implements OnInit {
  constructor(
    private elementsPositionService: ElementsPositionService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    const energyElementR = this.el.nativeElement;
    this.elementsPositionService.energyElementSetter = energyElementR;
    // let player = this.el.nativeElement;
    // let posXY = 'translate3d(' + '1000' + 'px,' + '500' + 'px,0)';
    // this.renderer.setStyle(player, 'transform', posXY);
  }
}
