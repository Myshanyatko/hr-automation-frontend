import { Observable } from 'rxjs';
import { City } from './../models/city';
import {
  selectCities,
  selectCurrentCity,
  selectFiltredRestaurants,
} from './../store/selectors/restaurants.selectors';
import { Store } from '@ngrx/store';
import {
  getRestaurants,
  getCities,
  setCurrentCity,
  deleteCity,
  getFiltredRestaurants,
} from './../store/actions/restaurants.actions';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Restaurant } from './../models/restaurant';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
  ElementRef,
} from '@angular/core';
import { AppState } from '../store/state/app.state';
import { selectAllRestaurants } from '../store/selectors/restaurants.selectors';
import { shortRest } from '../models/shortRest';
import {
  MapAnchorPoint,
  MapInfoWindow,
  MapMarker,
  MapMarkerClusterer,
} from '@angular/google-maps';

@Component({
  selector: 'app-restorans',
  templateUrl: './restorans.component.html',
  styleUrls: ['./restorans.component.css'],
})
export class RestoransComponent implements OnInit, OnDestroy {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  restForm!: FormGroup;
  filterForm!: FormGroup;
  cities$ = this.store$.select(selectCities);
  currentCity$ = this.store$.select(selectCurrentCity);
  builds$ = this.store$.select(selectAllRestaurants);
  openMap = false;
  openClusterInfo = false;
  filtredRestaurants$: Observable<shortRest[] | null> | null =
    this.store$.select(selectFiltredRestaurants);
  open = false;
  markerClustererImagePath =
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';

  constructor(private fb: FormBuilder, private store$: Store<AppState>) {}

  ngOnInit(): void {
    localStorage.getItem('restFilter')
      ? (this.filtredRestaurants$ = this.store$.select(
          selectFiltredRestaurants
        ))
      : (this.filtredRestaurants$ = null);
    this.open = false;
    this.openMap = false;
    this.restForm = this.fb.group({
      name: [localStorage.getItem('restFilter'), []],
    });
    this.currentCity$.subscribe((city) =>
      this.store$.dispatch(getRestaurants({ cityId: city.id }))
    );
  }
  showDialog() {
    this.store$.dispatch(getCities());
    this.open = true;
  }
  showMap() {
    this.store$.dispatch(getCities());
    this.openMap = true;
  }
  changeCity(city: City) {
    this.open = false;
    this.store$.dispatch(setCurrentCity({ city: city }));
  }
  deleteCity(id: number) {
    this.store$.dispatch(deleteCity({ id: id }));
  }
  ngOnDestroy() {
    this.open = false;
    this.openMap = false;
  }
  search() {
    if (this.restForm.value.name != null || this.restForm.value.name != '') {
      localStorage.setItem('restFilter', this.restForm.value.name);
      this.store$.dispatch(
        getFiltredRestaurants({ filter: this.restForm.value.name })
      );
    }
  }
  click() {}
  openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.open(marker);
  }
  openInfo(infoWindow: MapInfoWindow) {
    infoWindow.open();
  }
  showAllRestaurants(address: string) {
    localStorage.setItem('restFilter', address);
    this.openMap = false;
    this.ngOnInit();
  }
}
