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
          //console.log(response.json());
          this.getMessage1(response.json());
        });
    this.http.get('http://api.snowparking.codeforeauclaire.org:3050/schedule')
        .subscribe(response => {
          //console.log(response.json());
          this.getMessage2(response.json());
        });
  }

  getMessage1(status) {
      if (!status.alternateSideParking) {
          this.message = 'No known snow emergency in Eau Claire, WI';
      }
      if (status.alternateSideParking == 'even') {
          this.headerLine1 = 'alternate Side parking in Effect';
          this.headerLine2 = 'Full Residential Snow plow to Begin';
          this.headerLine3 = 'alternate side parking is in effect beginning at 12:01 a.m. on 2-3-16 for 72 hours.';
          this.headerLine4 = 'post Date: 02/02/2016 2:51 pm';

          this.contentHeading = 'alternate side parking is in effect beginning at 12:01 a.m. on 2-3-16 for 72 hours.';
          this.contentList = [
              'On odd-numbered days, vehicles shall only be parked, stopped or left standing on that side of the street having odd-numbered addresses.',
              'On even-numbered days, vehicles shall only be parked, stopped or left standing on the side of the street having even-numbered addresses.',
              'These provisions shall only be in effect between midnight and 5:00 p.m.',
              'These provisions shall not supersede more restrictive parking regulations in effect in the city.'
          ];
          this.url = [
              'url: http://eauclairewi.gov/home/showdocument?id=11399',
              'http://twitter.com/cityofecstreets',
              'http://facebook.com/cityofeauclaire'
          ];
          this.text = [
              'alternate Side parking Fact Sheet',
              'Twitter',
              'Facebook'
          ];
          this.links = [];
          for(let i = 0; i < 3; i++) {
              this.links.push({
                  url: this.url[i],
                  text: this.text[i]
              });
          }
      }
      if (status.alternateSideParking == 'odd') {
          this.headerLine1 = 'alternate Side parking in Effect';
          this.headerLine2 = 'Full Residential Snow plow to Begin';
          this.headerLine3 = 'alternate side parking is in effect beginning at 12:01 a.m. on 2-3-16 for 72 hours.';
          this.headerLine4 = 'post Date: 02/02/2016 2:51 pm';

          this.contentHeading = 'alternate side parking is in effect beginning at 12:01 a.m. on 2-3-16 for 72 hours.';
          this.contentList = [
              'On odd-numbered days, vehicles shall only be parked, stopped or left standing on that side of the street having odd-numbered addresses.',
              'On even-numbered days, vehicles shall only be parked, stopped or left standing on the side of the street having even-numbered addresses.',
              'These provisions shall only be in effect between midnight and 5:00 p.m.',
              'These provisions shall not supersede more restrictive parking regulations in effect in the city.'
          ];
          this.url = [
              'url: http://eauclairewi.gov/home/showdocument?id=11399',
              'http://twitter.com/cityofecstreets',
              'http://facebook.com/cityofeauclaire'
          ];
          this.text = [
              'alternate Side parking Fact Sheet',
              'Twitter',
              'Facebook'
          ];
          this.links = [];
          for(let i = 0; i < 3; i++) {
              this.links.push({
                  url: this.url[i],
                  text: this.text[i]
              });
          }
      }
  }
  getMessage2(schedule) {
      //this.message2b = JSON.stringify(schedule);
      //this.message2b = JSON.stringify(schedule.schedule);
  }
}

