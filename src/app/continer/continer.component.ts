import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ElementsPositionService } from '../services/elements-position.service';

@Component({
  selector: 'app-continer',
  templateUrl: './continer.component.html',
  styleUrls: ['./continer.component.css'],
})
export class ContinerComponent {
  constructor(private elementsPositionService: ElementsPositionService) {}
  @ViewChild('container') container: ElementRef;
  ngAfterViewInit(): void {
    this.elementsPositionService.continerElementSetter = this.container.nativeElement;
  }
}
