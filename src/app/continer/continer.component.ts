import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { ElementsPositionService } from '../services/elements-position.service';
import { EnemyFuncService } from '../services/enemy-func.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-continer',
  templateUrl: './continer.component.html',
  styleUrls: ['./continer.component.css'],
})
export class ContinerComponent implements AfterViewInit, AfterViewChecked {
  constructor(
    private elementsPositionService: ElementsPositionService,
    private enemyFuncService: EnemyFuncService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {}
  elementCounter = 0;
  @ViewChild('container') container: ElementRef;
  click = false;
  nothingToCellact = false;
  ngAfterViewInit(): void {
    this.elementsPositionService.continerElementSetter = this.container.nativeElement;
  }
  ngAfterViewChecked() {
    this.elementCounter = this.enemyFuncService.elementCounterGetter;
    this.nothingToCellact = this.enemyFuncService.nothingToCellactGetter;
    this.cdRef.detectChanges();
  }
  mapClick() {
    this.router.navigate(['/map']);
  }
  @HostListener('window:click') mousedown() {
    this.enemyFuncService.gameFirstClickSetter = true;
    this.click = this.enemyFuncService.gameFirstClickGetter;
  }
}
