import m_logger = require('services/logger');
import ICrime = require('interfaces/ICrime');

class HomeView {
    title: string = 'Crime Tracking';
    apiurl: string = 'https://stolenbikes88-datapoliceuk.p.mashape.com/crimes-at-location?date=2018-04&lat=51.66747&lng=-3.92846';
    public postcode: KnockoutObservable<string> = ko.observable('');
    public crimes: KnockoutObservableArray<ICrime> = ko.observableArray<ICrime>();

    public activate() {


        return true;
    }

    public clickUpdateCrimes() {
        var newThis = this;
        $.ajax({
            dataType: 'json',
            url: this.apiurl,
            headers: {
                "X-Mashape-Key": "zTWh1BDhG0msh6XIcvTMkh3dagw0p1mE7xDjsnS4MP3f1G3wHE"
            },
            success: function(data) {
                newThis.crimes(data);
                
            }
        });
    }
}

export = HomeView;