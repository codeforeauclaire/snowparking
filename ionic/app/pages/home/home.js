import {Page} from 'ionic-framework/ionic';
import {Http} from 'angular2/http';

@Page({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
  static get parameters() {
    return [[Http]];
  }

  constructor(http) {
    this.http = http;
    this.http.get('http://api.snowparking.codeforeauclaire.org:3050/status')
        .subscribe(response => {
          console.log(response.json());
          this.getMessage1(response.json());
        });
    this.http.get('http://api.snowparking.codeforeauclaire.org:3050/schedule')
        .subscribe(response => {
          console.log(response.json());
          this.getMessage2(response.json());
        });
  }

  getMessage1(status) {
      if (!status.alternateSideParking) {
          this.message1a = 'false';
      }
      if (status.alternateSideParking == 'even') {
          this.message1a = status.alternateSideParking;
      }
      if (status.alternateSideParking == 'odd') {
          this.message1a = status.alternateSideParking;
      }
  }
  getMessage2(schedule) {
      //this.message2b = JSON.stringify(schedule);
      //this.message2b = JSON.stringify(schedule.schedule);
  }
}
