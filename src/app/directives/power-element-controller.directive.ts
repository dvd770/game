import { Directive } from '@angular/core';
import { ElementsPositionService } from '../services/elements-position.service';

@Directive({
  selector: '[appPowerElementController]',
})
export class PowerElementControllerDirective {
  constructor(private elementsPositionService: ElementsPositionService) {}
}
