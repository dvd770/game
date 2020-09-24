import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.css'],
})
export class EnemyComponent implements OnInit {
  constructor(private renderer: Renderer2) {}
  enemyCount: number[] = [1, 1];

  UpDown = 10;
  LeftRight = 10;

  @ViewChild('enemyElement') enemyElement: ElementRef;

  PositionCalculation(enemy, player) {
    // let enemyPosition = [this.enemyElementLeft, this.enemyElementTop];
    // let playerPosition = [this.playerElementLeft , this.playerElementTop]
  }
  ngAfterViewInit() {
    let x = 10;
    let enemyElementLeft = this.enemyElement.nativeElement.style.left;
    let enemyElementTop = this.enemyElement.nativeElement.style.top;
    this.renderer.setStyle(this.enemyElement, 'top', x + '%');
    console.log(enemyElementLeft, enemyElementTop);
    enemyElementLeft = x + '%';
    enemyElementTop = x + '%';
    console.log(enemyElementLeft, enemyElementTop);
  }
  ngOnInit(): void {
    // setInterval(() => {
    //   this.enemyCount.push(1);
    //   console.log(this.enemyCount);
    // }, 1000);
    // console.log(this.enemyCount);
    // setInterval(() => {
    //   let UpDownDecision = Math.floor(Math.random() * 10 + 1);
    //   let LeftRightDecision = Math.floor(Math.random() * 10 + 1);
    //   UpDownDecision % 2 ? this.UpDown++ : this.UpDown--;
    //   LeftRightDecision % 2 ? this.LeftRight++ : this.LeftRight--;
    // }, 500);
  }
}
