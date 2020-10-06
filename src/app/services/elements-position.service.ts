import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElementsPositionService {
  private enemyElement: HTMLElement;
  private playerElement: HTMLElement;
  private continerElement: HTMLElement;
  private energyElement: HTMLElement[] = [];

  set continerElementSetter(continerElement: HTMLElement) {
    this.continerElement = continerElement;
  }

  set enemyElementSetter(enemyElement: HTMLElement) {
    this.enemyElement = enemyElement;
  }

  set playerElementSetter(playerElement: HTMLElement) {
    this.playerElement = playerElement;
  }

  set energyElementSetter(energyElement: HTMLElement) {
    // this.energyElement = energyElement;
    this.energyElement.push(energyElement);
  }

  get playerElementGetter() {
    return this.playerElement;
  }

  get enemyElementGetter() {
    return this.enemyElement;
  }

  get energyElementGetter() {
    return this.energyElement;
  }

  get continerElementGetter() {
    return this.continerElement;
  }
}
