import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElementsPositionService {
  // private data: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  // data$: Observable<any> = this.data.asObservable();
  private enemyElement: HTMLElement;
  private playerElement: HTMLElement;
  // setData(newData) {
  //   this.data.next(newData);
  // }
  set enemyElementSetter(enemyElement) {
    this.enemyElement = enemyElement;
  }

  set playerElementSetter(playerElement) {
    this.playerElement = playerElement;
  }

  get playerElementGetter() {
    return this.playerElement;
  }

  get enemyElementGetter() {
    return this.enemyElement;
  }
}
