import { Component, OnInit, HostListener } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent {
  ArrowUpDown: number = 50
  ArrowLeftRight: number = 50
  enter;
  space;

  @HostListener('window:keydown.ArrowDown') ArrowDownEvent() { 
    this.ArrowUpDown += 1
  }
  @HostListener('window:keydown.ArrowUp') ArrowUpEvent() {
    this.ArrowUpDown -= 1
  }
  @HostListener('window:keydown.ArrowLeft') ArrowLeftEvent() {
    this.ArrowLeftRight -= 0.5
  }
  @HostListener('window:keydown.ArrowRight') ArrowRightEvent() {
    this.ArrowLeftRight += 0.5
  }
  @HostListener('window:keydown.enter') enterEvent() {

  }
  @HostListener('window:keydown.space') spaceEvent() {
  }
}
