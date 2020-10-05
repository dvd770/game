import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';
import { ElementsPositionService } from '../services/elements-position.service';
import { GenericFuncsService } from '../services/generic-funcs.service';

@Directive({
  selector: '[appPowerElementController]',
})
export class PowerElementControllerDirective implements OnInit {
  constructor(
    private gnericFuncsService: GenericFuncsService,
    private elementsPositionService: ElementsPositionService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    const energyElementR = this.el.nativeElement;
    this.elementsPositionService.energyElementSetter = energyElementR;
  }
}
