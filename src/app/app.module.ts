import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { EnemyComponent } from './enemy/enemy.component';
import { PowerElementComponent } from './power-element/power-element.component';
import { PlayerControllerDirective } from './directives/player-controller.directive';
import { EnemyContrllerDirective } from './directives/enemy-contrller.directive';
import { PowerElementControllerDirective } from './directives/power-element-controller.directive';
import { ContinerComponent } from './continer/continer.component';
import { RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    EnemyComponent,
    PowerElementComponent,
    PlayerControllerDirective,
    EnemyContrllerDirective,
    PowerElementControllerDirective,
    ContinerComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'map', component: MapComponent },
      { path: '', component: ContinerComponent },
      { path: '**', component: PageNotFoundComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
