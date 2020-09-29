import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { ElementsPositionService } from '../services/elements-position.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent {
  constructor(
    private elementsPositionService: ElementsPositionService,
    private renderer: Renderer2
  ) {}
  @ViewChild('playerElement') playerElement: ElementRef;
  temp: boolean = true;
  ngAfterViewInit() {
    const playerElementR = this.playerElement.nativeElement;
    this.elementsPositionService.enemyElementSetter = playerElementR;
    // console.log(playerElementR);
  }
  @HostListener('window:keydown.ArrowUp') ArrowUpEvent() {
    this.temp = false;
    console.log(this.temp);
    // clearInterval(this.ArrowDownEvent);
  }
  @HostListener('window:keydown.ArrowDown') ArrowDownEvent() {
    let ArrowDown = 50;
    console.log(ArrowDown);
    let x = setInterval(() => {
      console.log('tic');
      ArrowDown += 10;
      console.log(ArrowDown);
      this.renderer.setStyle(
        this.playerElement.nativeElement,
        'left',
        ArrowDown + 'px'
      );
      console.log(x);

      if (this.temp === false) {
        clearInterval(x);
      }
    }, 1000 / 50);
  }
}
