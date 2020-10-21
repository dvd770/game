import { Directive, ElementRef, OnInit } from '@angular/core';
import { ElementsPositionService } from '../services/elements-position.service';

@Directive({
  selector: '[appPowerElementController]',
})
export class PowerElementControllerDirective implements OnInit {
  constructor(
    private elementsPositionService: ElementsPositionService,
    private el: ElementRef
  ) {}

  ngOnInit() {
    const energyElementR = this.el.nativeElement;
    this.elementsPositionService.energyElementSetter = energyElementR;
  }
}
