import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { ElementsPositionService } from '../services/elements-position.service';
@Component({
  selector: 'app-continer',
  templateUrl: './continer.component.html',
  styleUrls: ['./continer.component.css'],
})
export class ContinerComponent implements AfterViewInit {
  constructor(private elementsPositionService: ElementsPositionService) {}
  @ViewChild('container') container: ElementRef;
  click = false;
  playerWind = false;
  ngAfterViewInit(): void {
    this.elementsPositionService.continerElementSetter = this.container.nativeElement;
  }
  @HostListener('window:click') mousedown() {
    this.click = true;
  }
}
