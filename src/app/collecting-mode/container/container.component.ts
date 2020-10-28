import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  AfterViewChecked,
  ChangeDetectorRef,
  OnInit,
  ComponentFactoryResolver,
} from '@angular/core';
import { ElementsPositionService } from '../services/elements-position.service';
import { EnemyFuncService } from '../services/enemy-func.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements AfterViewChecked {
  constructor(
    private enemyFuncService: EnemyFuncService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {}
  @ViewChild('container') container: ElementRef;
  click = false;
  nothingToCollect = false;

  ngAfterViewChecked() {
    this.nothingToCollect = this.enemyFuncService.nothingToCollectGetter;
    this.click = this.enemyFuncService.gameFirstClickGetter;
    this.cdRef.detectChanges();
  }
  mapClick() {
    let elementsCounter = this.enemyFuncService.elementCounterGetter;
    this.router.navigate(['/home-map']);
  }
}
