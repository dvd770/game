import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { RouterModule } from '@angular/router';
import { HomeEnergyDirective } from './directives/home-energy.directive';
@NgModule({
  declarations: [MapComponent, HomeEnergyDirective],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: 'home-map', component: MapComponent }]),
  ],
})
export class HomeMapModule {}
