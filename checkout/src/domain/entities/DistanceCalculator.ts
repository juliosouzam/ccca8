import { Coordenate } from "./Coordenate";

export class DistanceCalculator {
  static calculate(from: Coordenate, to: Coordenate): number {
    if (from.latitude === to.latitude && from.longitude === to.longitude) {
      return 0;
    }
    const radlat1 = (Math.PI * from.latitude) / 180;
    const radlat2 = (Math.PI * to.latitude) / 180;
    const theta = from.longitude - to.longitude;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) dist = 1;
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344;
    return dist;
  }
}
