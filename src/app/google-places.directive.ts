/// <reference types="@types/googlemaps" />
import { Directive, ElementRef, OnInit } from '@angular/core';

//import { } from '@types/googlemaps';

@Directive({
  selector: '[appGooglePlaces]'
})
export class GooglePlacesDirective implements OnInit {

  private element: HTMLInputElement;

  //google: google.maps.Map;

  constructor(private elRef: ElementRef) {
    //elRef will get a reference to the element where
    //the directive is placed
    this.element = elRef.nativeElement;
  }

  ngOnInit() {
    const autocomplete = new google.maps.places.Autocomplete(this.element);
  }
}
