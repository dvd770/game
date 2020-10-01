import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericFuncsService {
  getPosition(el) {
    var xPosition = 0;
    var yPosition = 0;
    while (el) {
      if (el.tagName == 'BODY') {
        var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
        var yScrollPos = el.scrollTop || document.documentElement.scrollTop;
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
  moveTo(
    position_left: number,
    position_top: number,
    position_left_terget: number,
    position_top_terget: number
  ) {
    position_left > position_left_terget ? position_left-- : position_left++;
    position_top > position_top_terget ? position_top-- : position_top++;
  }
}
