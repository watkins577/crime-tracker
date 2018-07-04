import m_logger = require('services/logger');
import ICrime = require('interfaces/ICrime');

class HomeView {
    title: string = 'Crime Tracking';
    public apiUrl: KnockoutObservable<string>;
    public postcode: KnockoutObservable<string> = ko.observable('');
    public crimes: KnockoutObservableArray<ICrime> = ko.observableArray<ICrime>();

    public activate() {

        this.apiUrl = ko.observable('https://stolenbikes88-datapoliceuk.p.mashape.com/crimes-at-location?date=2018-04');

        return true;
    }

    public geocoderCallback(results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) {

        var _self = this;

        if (results.length == 0) {
            //TODO: Error, postcode not found
            return;
        }
        var myResult = results[0];
        var myLat = myResult.geometry.location.lat();
        var myLng = myResult.geometry.location.lng();

        var myApiUrl = this.apiUrl() + '&lat=' + myLat + '&lng=' + myLng;
        $.ajax({
            dataType: 'json',
            url: myApiUrl,
            headers: {
                "X-Mashape-Key": "zTWh1BDhG0msh6XIcvTMkh3dagw0p1mE7xDjsnS4MP3f1G3wHE"
            },
            success: function(data) {
                _self.crimes(data);
            },
            error: function() {
                //TODO: Error
            }
        });
    }

    public clickUpdateCrimes() {

        var _self = this;

        //First get the latitude and longitude from the postcode entered
        var myGeocoder = new google.maps.Geocoder();

        var geocoderRequest = {
            //TODO: Verify postcode
            address: _self.postcode(),
            componentRestrictions: {
                country: 'GB'
            }
        }

        myGeocoder.geocode(geocoderRequest, function(results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) {
            _self.geocoderCallback(results, status);
        });
    }
}

export = HomeView;