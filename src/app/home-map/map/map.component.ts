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
import { UserStateService } from 'src/app/services/user-state.service';
import { GameStateService } from 'src/app/collecting-mode/services/game-state.service';
import { HomeMapService } from '../services/home-map.service';
import { BuildingPartsService } from '../services/building-parts.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private gameStateService: GameStateService,
    private renderer: Renderer2,
    private userStateService: UserStateService,
    private homeMapService: HomeMapService,
    private BuildingPartsService: BuildingPartsService
  ) {}
  elementCounter = 59; // this.userStateService.energyCollocated;
  bricks: [{ x: number; y: number }] = [{ x: 10, y: 10 }];
  bricksNativeElement: HTMLElement[] = [];
  @ViewChildren('test', { read: ElementRef }) Children: QueryList<ElementRef>;
  building = false;
  clickBuild = false;
  ngOnInit() {
    for (let i = 0; i < this.elementCounter; i++) {
      this.bricks.push({ x: 10, y: 10 });
    }
  }
  ngAfterViewInit() {
    this.Children.forEach((div) =>
      this.bricksNativeElement.push(div.nativeElement)
    );
  }

  createBuilding(e: MouseEvent) {
    let elementIdx = -1;
    let brickInLine = -1;
    let brickInLineSum = 5;
    let lineIdx = -1;
    let x = e.clientX;
    let y = e.clientY;
    let build = () => {
      elementIdx++;
      brickInLine++;
      if (brickInLine === brickInLineSum) {
        lineIdx++;
        brickInLine = 0;
        y -= 10;
        x = e.clientX;
        if (lineIdx === 10 || lineIdx === 11) {
          brickInLineSum -= 2;
          if (lineIdx === 11) {
            x -= 20;
          }
        }
      }
      x -= 20;
      let { val, style } = this.BuildingPartsService.styleAndValHolder(y, x);
      if (this.bricksNativeElement[elementIdx] && this.elementCounter > 0) {
        if (lineIdx === -1) {
          console.log(this.bricksNativeElement[elementIdx]);
        }
        this.BuildingPartsService.window(lineIdx, brickInLine, val);
        this.BuildingPartsService.door(lineIdx, brickInLine, val);
        val = this.BuildingPartsService.roof(lineIdx, brickInLine, val, x);

        this.changeStyles(this.bricksNativeElement[elementIdx], style, val);
        this.elementCounter--; //= this.userStateService.energyCollocated;
        // this.userStateService.energyCollocated--;
        setTimeout(build, 10);
      } else {
        this.building = false;
      }
    };
    !this.building ? build() : null;
    this.building = true;
  }

  buildClick() {
    setTimeout(() => {
      this.clickBuild = true;
    }, 0);
  }
  @HostListener('window:click', ['$event']) mousedown(e: MouseEvent) {
    // if (this.clickBuild) {
    this.createBuilding(e);
    // }
  }
  changeStyles(elementRef: HTMLElement, styles: string[], val: string[]) {
    styles.forEach((style, idx) => {
      this.renderer.setStyle(elementRef, style, val[idx]);
    });
  }
  gameClick() {
    this.gameStateService.startGame();
    this.router.navigate(['/']);
  }
}
