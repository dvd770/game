import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PlayerComponent } from './player/player.component';
import { EnemyComponent } from './enemy/enemy.component';
import { PowerElementComponent } from './power-element/power-element.component';
import { PlayerControllerDirective } from './directives/player-controller.directive';
import { EnemyControllerDirective } from './directives/enemy-controller.directive';
import { PowerElementControllerDirective } from './directives/power-element-controller.directive';
import { ContainerComponent } from './container/container.component';
import { ElementCounterComponent } from './element-counter/element-counter.component';

@NgModule({
  declarations: [
    PlayerComponent,
    EnemyComponent,
    PowerElementComponent,
    PlayerControllerDirective,
    EnemyControllerDirective,
    PowerElementControllerDirective,
    ContainerComponent,
    ElementCounterComponent,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ContainerComponent }]),
  ],
})
export class CollectingModeModule {}
