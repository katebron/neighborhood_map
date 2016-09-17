initialLocations = [
 {
    title: 'Uno Mas taquiza',
    addy: '1914 W. Burnside',
    description: 'Taco place megan recommended',
    url: 'http://unomastaquiza.com/',
    latitude: 45.5228908,
    longitude: -122.6926175,
    genre: 'food',
    current: false
  },
  {
    title: 'wilson high school',
    addy: '1151 SW Vermont St, Portland, OR 97219 ',
    description: 'high school near old house',
    genre: 'nostalgia',
    latitude: 45.4771954,
    longitude: -122.6920507,
    current: false
  },
   {
    title: 'Hale Pele',
    addy: '2733 NE Broadway St, Portland, OR 97232',
    description: 'Tiki bar Megan likes',
    url: 'http://halepele.com/',
    genre: 'bar',
    latitude: 45.5352796,
    longitude: -122.6394542,
    current: false
  },
  {
    title: 'Sweedeedee',
    addy: '5202 N. Albina Ave, Portland, OR 97217',
    description: 'Small breakfast place. Another Megan pick. Go on a weekday',
    url: 'http://www.sweedeedee.com/',
    genre: 'food',
    latitude: 45.5605478,
    longitude: -122.6748336,
    current: false
  },
]


var Location = function(data) {
  //this.clickCount = ko.observable(data.clickCount);
  
  this.title = ko.observable(data.title);
  this.addy = ko.observable(data.addy);
  this.description = ko.observable(data.description);
  this.latitude = ko.observable(data.latitude);
  this.longitude = ko.observable(data.longitude);
  this.url = ko.observable(data.url);
  this.genre = ko.observable(data.genre);
  this.current = ko.observable(data.current);
  //this.imgAttribution = ko.observable(data.imgAttribution);

  //this.nicknames = ko.observableArray(data.nicknames);

}

var ViewModel = function() {
  var self = this;

  this.locationList = ko.observableArray([]);

  initialLocations.forEach(function(place){
    self.locationList.push(new Location(place));
     
  });
  self.query = ko.observable('');

  // use self whenever you want to get to the outer "this" in a
  // nested function like below. 
  this.currentLocation = ko.observable(this.locationList()[0]);
  this.typeToShow = ko.observable("all");
  
  this.setCurrentLocation = function(clickedLocation) {
    //make sure other current location is not set to show as well in map
    self.currentLocation().current(false);
    //set the new current location
    self.currentLocation(clickedLocation);
    self.currentLocation().current(true);
   
    place_markers();
  }
  
  /*this.returnCoordinates = ko.computed(function() {
       var coordinates = self.currentLocation().latitude() + " by " + self.currentLocation().longitude();   
       return coordinates;
  }); */

  this.locationsToShow = ko.pureComputed(function() {
    var search = this.query().toLowerCase();
    if (search != "") return ko.utils.arrayFilter(this.locationList(), function (locale) {
        return locale.title().toLowerCase().indexOf(search) >= 0;
      });
    
    var desiredType = this.typeToShow();
        if (desiredType == "all") return this.locationList();
        return ko.utils.arrayFilter(this.locationList(), function(locale) {
          console.log("this is locale.genre " + ko.toJSON(locale.genre));
            return locale.genre() === desiredType;
        });
    }, this);

  this.locationsToShow.subscribe(function(newValue) {
    place_markers();
  });

  //this.query.subscribe(search);
}

var markers = []; 


function initializeMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45.5231, lng: -122.6765},
    zoom: 10
  });
  place_markers();
}



function place_markers(){
  clearMarkers();
  var i;
  results = vm.locationsToShow();

  for(i=0; i < results.length; i++ ) {
    addMarker(results[i]);
  }  
}

function addMarker(location){
  var latLng = new google.maps.LatLng(ko.toJSON(location.latitude),ko.toJSON(location.longitude));
  var infoWindow = new google.maps.InfoWindow({
    content: ko.toJSON(location.description),
  });
  var marker;
   var marker = new google.maps.Marker({
    position: latLng,
    map: map,
  });
  markers.push(marker); 

  if(ko.toJSON(location.current) == "true"){
    infoWindow.open(marker.get('map'), marker);
  }

 
  marker.addListener('click', function(){
    infoWindow.open(marker.get('map'), marker);
  });
  
} 

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

var vm = new ViewModel();
ko.applyBindings(vm);


//ko.applyBindings(new ViewModel());