import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeMapModule } from './home-map/home-map.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CollectingModeModule } from './collecting-mode/collecting-mode.module';
import { BattleMapModule } from './battle-map/battle-map.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BattleMapModule,
    CollectingModeModule,
    HomeMapModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: 'home-map', redirectTo: 'home-map', pathMatch: 'full' },
      { path: 'battle-map', redirectTo: 'battle-map', pathMatch: 'full' },

      { path: '**', component: PageNotFoundComponent },
    ]),
  ],
  providers: [],

  bootstrap: [AppComponent],
})
export class AppModule {}
