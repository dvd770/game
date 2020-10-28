import { Directive, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHomeEnergy]',
})
export class HomeEnergyDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {}
}
