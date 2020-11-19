import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BuildingPartsService {
  constructor() {}
  styleAndValHolder(y: number, x: number, xVal: number, yVal: number) {
    let style = [
      'border-radius',
      'top',
      'left',
      'height',
      'width',
      'border-width',
      'opacity',
      'clip-path',
    ];
    let val = ['0px', y + 'px', x + 'px', yVal + 'px', xVal + 'px', '1px', '1'];

    return { val, style };
  }

  roof(lineIdx: number, brickInLine: number, val: string[], x: number) {
    this.roofShape(lineIdx, brickInLine, val);
    if (lineIdx >= 10) {
      x -= 20 * 3;
    }
    val[2] = x + 'px';
    return val;
  }

  hightWidth(val: string[]) {
    val[3] = '30.1px';
    val[4] = '60.1px';
  }

  roofShape(lineIdx: number, brickInLine: number, val: string[]) {
    let tileRight = 'polygon(0 0, 0% 101%, 100% 101%)';
    let tileLeft = 'polygon(100% 0, 0 101%, 100% 101%)';

    if (
      (lineIdx === 10 && brickInLine === 2) ||
      (lineIdx === 9 && brickInLine === 4)
    ) {
      this.hightWidth(val);
      val[7] = tileLeft;
    }
    if (
      (lineIdx === 9 && brickInLine === 0) ||
      (lineIdx === 10 && brickInLine === 0)
    ) {
      this.hightWidth(val);
      val[7] = tileRight;
    }
    if (lineIdx === 11) {
      this.hightWidth(val);
      val[7] = 'polygon(50% 50%, 0% 101%, 100% 101%)';
    }
  }

  window(lineIdx: number, brickInLine: number, val: string[]) {
    let line = [2, 4, 6];
    let bricks = [1, 3];
    if (line.includes(lineIdx) && bricks.includes(brickInLine)) {
      this.hightWidth(val);
      val.push(
        'polygon(28.4% 100%, 14.2% 100%, 14.2% 0, 84.2% 0, 84.2% 100%, 71% 100%, 71% 0, 56.8% 0, 56.8% 100%, 42.6% 100%, 42.6% 0, 28.4% 0'
      );
    }
  }

  door(lineIdx: number, brickInLine: number, val: string[]) {
    let line = [-1, 0];
    let bricks = [2];
    if (line.includes(lineIdx) && bricks.includes(brickInLine)) {
      val.push('polygon(0 0)');
    }
  }
}
