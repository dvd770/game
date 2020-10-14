import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnergyFuncService {
  energyArrOnService;
  set energyArrOnServiceSetter(energy) {
    this.energyArrOnService.push(energy);
  }
  get energyArrOnServiceGetter() {
    return this.energyArrOnService;
  }
}
