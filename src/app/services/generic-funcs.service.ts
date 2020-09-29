import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericFuncsService {
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
