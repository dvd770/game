import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { ElementsPositionService } from '../services/elements-position.service';
import { EnemyFuncService } from '../services/enemy-func.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements AfterViewInit, AfterViewChecked {
  constructor(
    private elementsPositionService: ElementsPositionService,
    private enemyFuncService: EnemyFuncService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {}
  elementCounter = 0;
  @ViewChild('container') container: ElementRef;
  click = false;
  nothingToCollect = false;

  ngAfterViewInit(): void {
    this.elementsPositionService.containerElementSetter = this.container.nativeElement;
  }
  ngAfterViewChecked() {
    this.elementCounter = this.enemyFuncService.elementCounterGetter;
    this.nothingToCollect = this.enemyFuncService.nothingToCollectGetter;
    this.click = this.enemyFuncService.gameFirstClickGetter;
    this.cdRef.detectChanges();
  }
  mapClick() {
    this.enemyFuncService.gameFirstClickSetter = false;
    this.click = this.enemyFuncService.gameFirstClickGetter;
    this.router.navigate(['/home-map']);
  }
}
