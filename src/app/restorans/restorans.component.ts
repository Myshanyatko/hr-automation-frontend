import { Restaurant } from './../models/restaurant';
import { Component, OnInit } from '@angular/core';
// <reference path="./style-reference.d.ts" />

@Component({
  selector: 'app-restorans',
  templateUrl: './restorans.component.html',
  styleUrls: ['./restorans.component.css'],
})
export class RestoransComponent implements OnInit {
  restaurants: Restaurant[] = [
    {
      id: 0,
      name: 'пешком постою',
      rating: 3,
      statusId: 1,
      check: 400,
      address: 'усова, 14а',
      coordinates: { lat: 56.465152202424484, lng: 84.95378432534983 },
      reviews: [],
    },
    {
      id: 1,
      name: 'еки токи',
      rating: 10,
      statusId: 1,
      check: 400,
      address: 'усова, 78',
      coordinates: { lat: 56.464413315407455, lng: 84.95530196728016 },
      reviews: [],
    },
  ];
  markers = [
    { lat: 56.465152202424484, lng: 84.95378432534983 },
    { lat: 56.464413315407455, lng: 84.95530196728016 },
    { lat: 56.456114865250285, lng: 84.95185844214778 },
  ];
  constructor() {}

  ngOnInit(): void {}
}
