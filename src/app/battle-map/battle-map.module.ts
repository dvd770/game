import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattleMapComponent } from './battle-map/battle-map.component';
import { RouterModule } from '@angular/router';
import { CrystalsComponent } from './crystals/crystals.component';

@NgModule({
  declarations: [BattleMapComponent, CrystalsComponent],
  imports: [
    RouterModule.forChild([
      { path: 'battle-map', component: BattleMapComponent },
    ]),
    CommonModule,
  ],
})
export class BattleMapModule {}
