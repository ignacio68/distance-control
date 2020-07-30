import { TokenModel } from 'nativescript-ui-autocomplete'

export class LocationModel extends TokenModel {
  public address: string
  public city: string
  public country: string

  constructor(address: string, city: string, country: string, image: string) {
    super(address + ", " + city + ", " + country, image)
    this.address = address
    this.city = city
    this.country = country
  }

  toString() {
    return this.address + ", " + this.city + ", " + this.country
  }
}

// let dataItems = new ObservableArray<CityModel>();

// for (let i = 0; i < data.items.length; i++) {
//     const d = data.items[i].flag;
//     const ds = "res://" + d;
//     dataItems.push(new CityModel(data.items[i].id, data.items[i].city, data.items[i].country, ds));
// }
