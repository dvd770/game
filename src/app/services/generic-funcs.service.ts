import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericFuncsService {
  getTranslateXYValue(translateString) {
    let x = translateString.indexOf('(');
    let x1 = translateString.indexOf(',');
    let xPosition = parseInt(translateString.slice(x + 1, x1 - 2));
    let y = translateString.indexOf(',');
    let y1 = translateString.indexOf(')');
    let yPosition = parseInt(translateString.slice(y + 1, y1 - 1));
    return { x: xPosition, y: yPosition };
  }

  getParentPosition(el) {
    let xPosition = 0;
    let yPosition = 0;
    while (el) {
      if (el.tagName == 'BODY') {
        let xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
        let yScrollPos = el.scrollTop || document.documentElement.scrollTop;
        xPosition += el.offsetLeft - xScrollPos + el.clientLeft;
        yPosition += el.offsetTop - yScrollPos + el.clientTop;
      } else {
        xPosition += el.offsetLeft - el.scrollLeft + el.clientLeft;
        yPosition += el.offsetTop - el.scrollTop + el.clientTop;
      }
      el = el.offsetParent;
    }
    return {
      x: xPosition,
      y: yPosition,
    };
  }
  isOverlapping(energyArr: HTMLElement[], enemy: HTMLElement) {
    for (let index = 0; index < energyArr.length; index++) {
      let e2 = energyArr[index];
      let rect1 = enemy.getBoundingClientRect();
      let rect2 = e2.getBoundingClientRect();
      let overlap = null;
      overlap = !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      );
      if (overlap) return e2;
    }
  }
}
