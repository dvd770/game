import { Injectable } from '@angular/core';

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
  isEnemyOverlappingPlayer(player: HTMLElement, enemy: HTMLElement) {
    let enemyPos = enemy.getBoundingClientRect();
    let playerPos = player.getBoundingClientRect();
    let overlap = null;
    overlap = !(
      enemyPos.right < playerPos.left ||
      enemyPos.left > playerPos.right ||
      enemyPos.bottom < playerPos.top ||
      enemyPos.top > playerPos.bottom
    );
    if (overlap) return true;
  }
  isEnemyOverlappingEnergy(
    domElementsArr: HTMLElement[],
    domElement: HTMLElement
  ) {
    for (let index = 0; index < domElementsArr.length; index++) {
      let energy = domElementsArr[index];
      let enemyPos = domElement.getBoundingClientRect();
      let elementArrPos = energy.getBoundingClientRect();
      let overlap = null;
      overlap = !(
        enemyPos.right < elementArrPos.left ||
        enemyPos.left > elementArrPos.right ||
        enemyPos.bottom < elementArrPos.top ||
        enemyPos.top > elementArrPos.bottom
      );
      if (overlap) return energy;
    }
  }
}
