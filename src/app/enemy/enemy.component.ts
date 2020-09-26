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
  enemyCount: [{}] = [{}];
  UpDown = 10;
  LeftRight = 10;
  enemyElementLeft;
  enemyElementTop;
  x = 1;
  y = 1;
  @ViewChild('enemyElement') enemyElement: ElementRef;

  ngAfterViewInit() {
    this.enemyElementLeft = this.enemyElement.nativeElement.style.left;
    this.enemyElementTop = this.enemyElement.nativeElement.style.top;

    setInterval(() => {
      console.log('tic');
      this.enemyElementLeft = this.x + '%';
      this.enemyElementTop = this.x + '%';
      console.log(this.enemyElementLeft);
      // this.enemyElementLeft === '100%'? this.revers():this.defolt()
      // let UpDownDecision = Math.floor(Math.random() * 10 + 1);
      // let LeftRightDecision = Math.floor(Math.random() * 10 + 1);
      // UpDownDecision % 2 ? this.x++ : this.x--;
      // LeftRightDecision % 2 ? this.x++ : this.x--;
    }, 100);
  }

  ngOnInit(): void {
    for (let index = 0; index < 5; index++) {
      let enemy = {
        id: index,
        type: 'enemy',
      };
      this.enemyCount.push(enemy);
    }
  }
}
