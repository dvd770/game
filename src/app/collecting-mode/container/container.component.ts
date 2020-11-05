import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements AfterViewChecked {
  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private gameStateService: GameStateService
  ) {}

  @ViewChild('container') container: ElementRef;
  click = false;
  nothingToCollect = false;

  ngAfterViewChecked() {
    this.nothingToCollect = this.gameStateService.nothingToCollect;
    this.click = this.gameStateService.gameFirstClick;
    this.cdRef.detectChanges();
  }

  mapClick() {
    this.router.navigate(['/home-map']);
  }
}
