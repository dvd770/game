import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BuildingPartsService {
  constructor() {}
  styleAndValHolder(y: number, x: number) {
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
    let val = ['0px', y + 'px', x + 'px', '10px', '20px', '1px', '1'];

    return { val, style };
  }

  roof(lineIdx: number, brickInLine: number, val: string[], x: number) {
    this.roofShape(lineIdx, brickInLine, val);
    let temp = [10, 11];
    if (temp.includes(lineIdx)) {
      x -= 20;
    }

    val[2] = x + 'px';
    return val;
  }

  private roofShape(lineIdx: number, brickInLine: number, val: string[]) {
    if (lineIdx === 9 && brickInLine === 4) {
      val[3] = '10.1px';
      val[4] = '20.1px';
      val[7] = 'polygon(100% 0, 0 100%, 100% 100%)';
    }
    if (lineIdx === 10 && brickInLine === 2) {
      val[3] = '10.1px';
      val[4] = '20.1px';
      val[7] = 'polygon(100% 0, 0 100%, 100% 100%)';
    }

    if (lineIdx === 10 && brickInLine === 0) {
      val[3] = '10.1px';
      val[4] = '20.1px';
      val[7] = 'polygon(0 0, 0% 100%, 100% 100%)';
    }
    if (lineIdx === 9 && brickInLine === 0) {
      val[3] = '10.1px';
      val[4] = '20.1px';
      val[7] = 'polygon(0 0, 0% 100%, 100% 100%)';
    }
    if (lineIdx === 11) {
      val[3] = '10.1px';
      val[4] = '20.1px';
      val[7] = 'polygon(50% 50%, 0% 100%, 100% 100%)';
    }
  }

  window(lineIdx: number, brickInLine: number, val: string[]) {
    let line = [2, 4, 6];
    let bricks = [1, 3];
    if (line.includes(lineIdx) && bricks.includes(brickInLine)) {
      val[3] = '10.1px';
      val[4] = '20.1px';
      val.push(
        'polygon(28.4% 100%, 14.2% 100%, 14.2% 0, 84.2% 0, 84.2% 100%, 71% 100%, 71% 0, 56.8% 0, 56.8% 100%, 42.6% 100%, 42.6% 0, 28.4% 0'
      );
    }
  }

  door(lineIdx: number, brickInLine: number, val: string[]) {
    let line = [-1, 0];
    let bricks = [2];
    if (line.includes(lineIdx) && bricks.includes(brickInLine)) {
      val[1] = '10px';
      val[2] = '10px';
    }
  }
}
