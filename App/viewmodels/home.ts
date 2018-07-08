import m_logger = require('services/logger');
import ICrime = require('interfaces/ICrime');

class HomeView {
    title: string = 'Crime Tracking';
    public apiUrl: KnockoutObservable<string>;
    public postcode: KnockoutObservable<string> = ko.observable('');
    public crimes: KnockoutObservableArray<ICrime> = ko.observableArray<ICrime>();
    public map: google.maps.Map;

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

        var myApiUrl = _self.apiUrl() + '&lat=' + myLat + '&lng=' + myLng;
        $.ajax({
            dataType: 'json',
            url: myApiUrl,
            headers: {
                "X-Mashape-Key": "zTWh1BDhG0msh6XIcvTMkh3dagw0p1mE7xDjsnS4MP3f1G3wHE"
            },
            success: function(data) {

                m_logger.logger.log(data.length + ' crime(s) returned.', null, 'home', true);

                _self.map = new google.maps.Map(document.getElementById('map'), { center: { lat: myLat, lng: myLng }, zoom: 17 });

                $.each(data, function(_, crime) {
                    var marker = new google.maps.Marker({position: { lat: parseFloat(crime.location.latitude), lng: parseFloat(crime.location.longitude) }, map: _self.map });
                    var windowcontent = 'Category: ' + crime.category + '<br/>';
                    if (crime.outcome_status) {
                        windowcontent += 'Outcome Status: ' + crime.outcome_status.category;
                    }

                    var infowindow = new google.maps.InfoWindow({content: windowcontent});
                    marker.addListener('click', function() {
                        infowindow.open(_self.map, marker);
                    })
                })
            },
            error: function() {
                m_logger.logger.log('Error when requesting requesting crime data.', null, 'home', true);
            }
        });
    }

    public clickUpdateCrimes() {

        var _self = this;

        m_logger.logger.log('Requesting crimes.', null, 'home', true);

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