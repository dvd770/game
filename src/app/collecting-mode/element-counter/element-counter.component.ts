import { Component, AfterViewChecked } from '@angular/core';
import { EnemyFuncService } from '../services/enemy-func.service';
import { UserStateService } from 'src/app/services/user-state.service';

@Component({
  selector: 'app-element-counter',
  templateUrl: './element-counter.component.html',
  styleUrls: ['./element-counter.component.css'],
})
export class ElementCounterComponent implements AfterViewChecked {
  constructor(private userStateService: UserStateService) {}
  elementCounter = 0;
  ngAfterViewChecked() {
    this.elementCounter = this.userStateService.energyCollocated;
  }
}
