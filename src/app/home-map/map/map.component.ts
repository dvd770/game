import {
  Component,
  OnInit,
  AfterViewChecked,
  ViewChild,
  ElementRef,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnemyFuncService } from '../../collecting-mode/services/enemy-func.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  constructor(
    private router: Router,
    private enemyFuncService: EnemyFuncService,
    private renderer: Renderer2
  ) {}
  elementCounter = this.enemyFuncService.elementCounterGetter;
  @ViewChild('test') testEl: ElementRef;
  @ViewChildren('bricks') bricksRef: ElementRef;
  bricks: number[] = [1, 2, 3];
  ex() {
    // getBoundingClientRect()
    let arr = [];
    let arr1 = [];
    let bricks: HTMLElement[] = this.bricksRef['_results'];
    bricks.map((val) => arr.push(val));
    arr.map((val) => arr1.push(val.nativeElement));
    console.log(arr1[0].getBoundingClientRect());

    this.renderer.setStyle(this.testEl.nativeElement, 'top', '200px');
  }
  gameClick() {
    this.enemyFuncService.startGame();
    this.router.navigate(['/']);
  }
}
