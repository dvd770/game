import {
  Component,
  OnInit,
  AfterViewChecked,
  ViewChild,
  ElementRef,
  Renderer2,
  ViewChildren,
  HostListener,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { EnemyFuncService } from '../../collecting-mode/services/enemy-func.service';
import { UserStateService } from 'src/app/services/user-state.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private enemyFuncService: EnemyFuncService,
    private renderer: Renderer2,
    private userStateService: UserStateService
  ) {}
  elementCounter = this.userStateService.energyCollocated;
  loaded = false;
  bricks: [{ x: number; y: number }] = [{ x: 10, y: 10 }];
  bricksNativeElement: HTMLElement[] = [];
  @ViewChildren('test', { read: ElementRef }) Children: QueryList<ElementRef>;
  building = false;
  ngOnInit() {
    console.log(this.elementCounter);
    for (let i = 0; i < this.elementCounter; i++) {
      this.bricks.push({ x: 10, y: 10 });
    }
  }
  ngAfterViewInit() {
    this.Children.forEach((div) =>
      this.bricksNativeElement.push(div.nativeElement)
    );
  }

  createBuilding() {
    let idx = 0;
    let idx2 = -1;
    let x = 0;
    let y = 0;
    if (this.loaded === true) {
      let build = () => {
        this.building = true;
        idx++;
        idx2++;
        if (idx2 === 5) {
          idx2 = 0;
          y -= 10;
          x = 0;
        }
        x -= 20;
        let style = [
          'border-radius',
          'top',
          'left',
          'height',
          'width',
          'border-width',
          'opacity',
        ];
        let val = [
          '0px',
          300 + y + 'px',
          300 + x + 'px',
          '10px',
          '20px',
          '1px',
          '1',
        ];
        if (this.bricksNativeElement[idx] && this.elementCounter > 0) {
          this.changeStyles(this.bricksNativeElement[idx], style, val);
          this.elementCounter = this.userStateService.energyCollocated;
          this.userStateService.energyCollocated--;
          setTimeout(build, 100);
        }
      };
      !this.building ? build() : null;
    }

    this.loaded = true;
  }
  @HostListener('window:click', ['$event']) mousedown(e: {
    clientX: number;
    clientY: number;
  }) {
    this.createBuilding();
  }
  changeStyles(elementRef: HTMLElement, styles: string[], val: string[]) {
    styles.forEach((style, idx) => {
      this.renderer.setStyle(elementRef, style, val[idx]);
    });
  }
  gameClick() {
    this.enemyFuncService.startGame();
    this.router.navigate(['/']);
  }
}
