
export class Geolocation {
  constructor(public lat: number, public lng: number) { }
}

export class GeoCoodinates {
  constructor(private latitude: number, private longitude: number){
  }
}


export const shapeConfig= {
  strokeOpacity: 0.8,
  strokeColor: '#0074D9',
  strokeWeight: 2,
  fillOpacity: 0.35,
  draggable: true,
  fillColor: '#0074D9'
};
