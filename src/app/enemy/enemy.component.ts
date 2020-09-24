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

  @ViewChild('enemyElement') enemyElement: ElementRef;

  ngAfterViewInit() {
    this.enemyElementLeft = this.enemyElement.nativeElement.style.left;
    this.enemyElementTop = this.enemyElement.nativeElement.style.top;
    let x = 10;
    setInterval(() => {
      let UpDownDecision = Math.floor(Math.random() * 10 + 1);
      let LeftRightDecision = Math.floor(Math.random() * 10 + 1);
      UpDownDecision % 2 ? x++ : x--;
      LeftRightDecision % 2 ? x++ : x--;
    }, 1000);
    this.enemyElementLeft = x + '%';
    this.enemyElementTop = x + '%';
  }

  ngOnInit(): void {
    for (let index = 0; index < 5; index++) {
      let enemy = {
        id: index,
        type: 'enemy',
      };
      for (let index = 0; index < 5; index++) {
        const element = this.enemyCount[index];
        this.enemyCount.push(element);
      }
    }
  }
}
