import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-round-image',
  templateUrl: './round-image.component.html',
  styleUrls: ['./round-image.component.scss']
})
export class RoundImageComponent implements OnInit {

  @Input() src: string;
  @Input() alt: string;

  constructor() { }

  ngOnInit() {
  }

}
