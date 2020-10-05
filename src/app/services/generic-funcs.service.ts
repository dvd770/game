import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericFuncsService {
  getTranslateXValue(translateString) {
    var n = translateString.indexOf('(');
    var n1 = translateString.indexOf(',');
    var res = parseInt(translateString.slice(n + 1, n1 - 2));
    return res;
  }
  getTranslateYValue(translateString) {
    var n = translateString.indexOf(',');
    var n1 = translateString.indexOf(')');
    var res = parseInt(translateString.slice(n + 1, n1 - 1));
    return res;
  }
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
}
