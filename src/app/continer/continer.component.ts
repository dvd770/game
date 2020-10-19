import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { ElementsPositionService } from '../services/elements-position.service';
import { EnemyFuncService } from '../services/enemy-func.service';
@Component({
  selector: 'app-continer',
  templateUrl: './continer.component.html',
  styleUrls: ['./continer.component.css'],
})
export class ContinerComponent implements AfterViewInit {
  constructor(
    private elementsPositionService: ElementsPositionService,
    private enemyFuncService: EnemyFuncService
  ) {}
  @ViewChild('container') container: ElementRef;
  click = false;
  playerWind = false;
  ngAfterViewInit(): void {
    this.elementsPositionService.continerElementSetter = this.container.nativeElement;
  }
  @HostListener('window:click') mousedown() {
    this.click = true;
    if (this.enemyFuncService.isPlayerOverlaptGetter) {
      this.click = false;
    }
  }
}
