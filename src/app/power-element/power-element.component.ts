import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ElementsPositionService } from '../services/elements-position.service';
import { GenericFuncsService } from '../services/generic-funcs.service';
import sumFunc from '../player/arr';
@Component({
  selector: 'app-power-element',
  templateUrl: './power-element.component.html',
  styleUrls: ['./power-element.component.css'],
})
export class PowerElementComponent implements AfterViewInit {
  constructor(private elementsPositionService: ElementsPositionService) {}
  @ViewChild('energyElement') energyElement: ElementRef;

  ngAfterViewInit() {
    sumFunc();
    const energyElementR = this.energyElement.nativeElement;
    this.elementsPositionService.energyElementSetter = energyElementR;
  }
}
