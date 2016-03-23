import {Page} from 'ionic-angular';
import {Http} from 'angular2/http';

@Page({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
  static get parameters() {
    return [[Http]];
  }

  doRefresh(refresher) {
    //console.log('Doing Refresh', refresher);
    $window.location.reload();

    setTimeout(() => {
      refresher.complete();
      //console.log("Complete");
    }, 5000);
  }

  doStart(refresher) {
    $window.location.reload();
    //console.log('Doing Start', refresher);
  }

  doPulling(refresher) {
    $window.location.reload();
    //console.log('Pulling', refresher);
  }

  constructor(http) {
    this.http = http;
    this.http.get('http://api.snowparking.codeforeauclaire.org:3050/status')
        .subscribe(response => {
          this.setStatus(response.json());
        });
    //this.http.get('http://api.snowparking.codeforeauclaire.org:3050/schedule')
    //    .subscribe(response => {
    //      this.schedule(response.json());
    //    });
  }

  setStatus(status) {
    if (!status.alternateSideParking) {
      this.headers = [
        'No known snow emergency in Eau Claire, WI'
      ];
    }
    if (status.alternateSideParking == 'even' || status.alternateSideParking == 'odd') {
      this.headers = [
        'Snow Event - Alternate-Side Parking',
        'When there is a Snow Event: The City will declare a Snow Event by 6:00 p.m. for alternate-side parking to begin at midnight for 72 hours',
        'Where you can park:',
        '- Odd-numbered days; “Odd” side of the street parking (odd house numbers)',
        '- Even-numbered days; “Even” side of the street (even house numbers)',
        'What time you have to move your car: - Between 5:00 p.m. and midnight',
        'Note: If there is “NO Parking” or other signage posted, you can’t park there. Even if it’s the “alternate” side from your current parking space',
        'Disclaimer: This *site/project is courtesy of Code for Eau Claire and is in not an official City of Eau Claire endeavor. If your car is towed, Code for Eau Claire is in no way responsible or liable'
      ];

      this.contentHeadings = [
        'alternate side parking is in effect beginning at 12:01 a.m. on 2-3-16 for 72 hours.'
      ];
      this.contentList = [
        'On odd-numbered days, vehicles shall NOT be parked, stopped, or left standing on that side of the street having even-numbered addresses.',
        'On even-numbered days, vehicles shall NOT be parked, stopped, or left standing on the side of the street having odd-numbered addresses.',
        'On odd-numbered days, vehicles shall ONLY be parked, stopped, or left standing on that side of the street having odd-numbered addresses if also allowed by normal parking regulations.',
        'On even-numbered days, vehicles shall ONLY be parked, stopped, or left standing on the side of the street having even-numbered addresses if also allowed by normal parking regulations.',
        'These provisions shall only be in effect between 12:00am{midnight) and 5:00p.m.',
        'These provisions shall not supersede more restrictive parking regulations in effect in the city.'
      ];
      this.url = [
        'http://eauclairewi.gov/home/showdocument?id=11399',
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
  //schedule(schedule) {
  //    this.message2b = JSON.stringify(schedule);
  //    this.message2b = JSON.stringify(schedule.schedule);
  //}
}

