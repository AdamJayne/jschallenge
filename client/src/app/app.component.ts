import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as fetch from "node-fetch";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  places: any[] = [];
  lat;
  long;

  constructor(public http: HttpClient) {
  }

  private callApi(): void {
    this.http.post("http://localhost:8080/locations", {
      lat: this.lat,
      long: this.long
    }).subscribe((value: any) => {
      if(value.businesses && value.businesses.length) {
        this.checkIfOpen(value.businesses);
      }
    })
  }

  private checkIfOpen(array: any[]): void {
    array.forEach(item => {
      item.is_closed ? console.log("closed") : this.places.push(item);
    })
    console.log(this.places[0]);
  }

  ngOnInit() {
    console.log("TESTING");
    navigator.geolocation.getCurrentPosition(value => {
      console.log(value);
      const { latitude, longitude } = value.coords;
      this.lat = latitude;
      this.long = longitude;
      this.callApi();
    });
  }
}
