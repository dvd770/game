import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ElementsPositionService {
  private enemyElement: HTMLElement;
  private playerElement: HTMLElement;
  private containerElement: HTMLElement;
  public energyElement: HTMLElement[] = [];

  set containerElementSetter(containerElement: HTMLElement) {
    this.containerElement = containerElement;
  }

  set enemyElementSetter(enemyElement: HTMLElement) {
    this.enemyElement = enemyElement;
  }

  set playerElementSetter(playerElement: HTMLElement) {
    this.playerElement = playerElement;
  }

  set energyElementSetter(energyElement: HTMLElement) {
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

  get containerElementGetter() {
    return this.containerElement;
  }
}
