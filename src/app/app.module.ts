import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { EnemyComponent } from './enemy/enemy.component';
import { PowerElementComponent } from './power-element/power-element.component';
import { CollisionCalculatorDirective } from './directives/collision-calculator.directive';
import { PlayerControllerDirective } from './directives/player-controller.directive';
import { EnemyContrllerDirective } from './directives/enemy-contrller.directive';
import { PowerElementControllerDirective } from './directives/power-element-controller.directive';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    EnemyComponent,
    PowerElementComponent,
    CollisionCalculatorDirective,
    PlayerControllerDirective,
    EnemyContrllerDirective,
    PowerElementControllerDirective,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
