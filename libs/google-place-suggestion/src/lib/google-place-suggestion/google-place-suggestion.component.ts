import { Component, OnInit, Input, forwardRef, ViewChild, NgZone, ElementRef, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators, FormControl,
  ControlValueAccessor, NG_VALUE_ACCESSOR
} from '@angular/forms';

declare var google: any;
//import { } from '@types/googlemaps';
@Component({
  selector: 'app-google-place-suggestion',
  templateUrl: './google-place-suggestion.component.html',
  styleUrls: ['./google-place-suggestion.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GooglePlaceSuggestionComponent),
      multi: true
    }
  ]
})
export class GooglePlaceSuggestionComponent implements OnInit, ControlValueAccessor, Validators {
  @Input() inputControl: any;
  @Output() addressFound: EventEmitter<Address> = new EventEmitter<Address>();
  @ViewChild('placeInput') placeInput: ElementRef;
  circle: any;
  placeText: string;
  LocationForm: FormGroup;
  controlId: string;
  selected = false;
  isTyped = false;
  focusIn = false;
  keyPressed = false;
  placeVal: Address = {
    city: '',
    state: '',
    street: ''
  };

  propagateChange = (_any: any) => { }
  constructor(private formBuilder: FormBuilder, private zone: NgZone) {
    /* istanbul ignore next */
    this.geoLocate();
  }

  ngOnInit() {
    this.controlId = this.inputControl.id;
    this.LocationForm = this.formBuilder.group({
      name: new FormControl('', { validators: [Validators.required] })
    });
  }

  /* istanbul ignore next */
  geoLocate() {
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(function (position) {
        if (position) {
          const geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          });
          /* istanbul ignore next */
          this.getReverseGeoCode(geolocation);
        }
      }.bind(this));
    }
  }
  /* istanbul ignore next */
  getReverseGeoCode(geolocation): void {
    const latlng = new google.maps.LatLng(geolocation.lat, geolocation.lng);
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, (results, status) => {
      for (let i = 0; i < results[0].address_components.length; i++) {
        const addressType = results[0].address_components[i].types[0];
        const addr = results[0].address_components[i]['long_name'];
        if (addressType === 'locality') {
          this.placeVal.city = addr;
        }
        else if (addressType === 'administrative_area_level_1') {
          this.placeVal.state = addr;
        }
        else if (addressType === 'route') {
          this.placeVal.street = addr;
        }
      }
      this.addressFound.emit(this.placeVal);
    });
  }

  get name() { return this.LocationForm.get('name'); }

  clearText() {
    this.selected = false;
    this.placeText = '';
    this.propagateChange(this.placeText);
  }

  onFocusOut() {
    this.placeText.trim().length === 0 ? this.placeText = '' : '';
    const placeValue = this.inputControl.autocomplete ? (this.keyPressed ? '' : this.placeText) : this.placeText;
    this.propagateChange(placeValue);
  }

  setFocus(): void {
    this.placeInput.nativeElement.focus();
  }

  /* istanbul ignore next */
  onFocus() {
    this.focusIn = true;
    this.initAutocomplete()
  }

  onKeyPress() {
    this.keyPressed = true;
    this.selected = false;
  }
  /* istanbul ignore next */
  initAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById(this.controlId) as HTMLInputElement),
      { types: ['geocode'] });
    if (this.circle) {
      autocomplete.setBounds(this.circle.getBounds());
    }
    /* istanbul ignore next */
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      this.getPlaceSuggestion(autocomplete);
    });
  }

  /* istanbul ignore next */
  getPlaceSuggestion(autocomplete) {
    this.zone.run(() => {
      this.placeText = '';
      this.selected = true;
      this.keyPressed = false;
    })
    const place = autocomplete.getPlace();
    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      const addr = place.address_components[i]['long_name'];
      if (this.inputControl.id === 'citystate' && (addressType === 'locality' || addressType === 'administrative_area_level_1')) {
        this.placeText = `${this.placeText === '' ? addr : `${this.placeText}, ${addr}`}`;
      } else if (this.inputControl.id === 'streetname' && (addressType === 'route' || addressType === 'street_number' || addressType === 'sublocality_level_1')) {
        this.placeText = addr;
        break;
      }
    }
    /* this.zone.run(() => {
      this.placeText;
    }) */
    this.propagateChange(this.placeText);
  }

  writeValue(obj: any): void {
    this.placeText = obj;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  onKeyUp(event) {
    if (!!navigator.userAgent.match(/Android | Mobile/)) {
      const placeText = event.target;
      placeText.value = (event.target.value.length > 100) ? placeText.value.slice(0, 100) : placeText.value.replace(/[^a-zA-Z0-9_., ]+/g, '');
      if (event.target.value.length === 0) {
        this.placeText = '';
      }
    }
    else { }
  }
}

export interface Address {
  city: string;
  state: string;
  street: string;
}
