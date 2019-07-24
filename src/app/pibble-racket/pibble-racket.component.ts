import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pibble-racket',
  templateUrl: './pibble-racket.component.html',
  styleUrls: ['./pibble-racket.component.css']
})
export class PibbleRacketComponent implements OnInit {

  private ra: string;
  private dec: string;
  private alt: string;
  private az: string;

  constructor() { }

  ngOnInit() {
    this.ra = '21 10.6';
    this.dec = '+33 46';
    this.alt = '90°';
    this.az = '52,9°';
  }

}
