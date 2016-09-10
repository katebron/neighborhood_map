initialLocations = [
 {
    title: 'Uno Mas taquiza',
    addy: '1914 W. Burnside',
    description: 'Taco place megan recommended',
    url: 'http://unomastaquiza.com/',
    latitude: 45.5228908,
    longitude: -122.6926175,
    current: false
  },
  {
    title: 'wilson high school',
    addy: '1151 SW Vermont St, Portland, OR 97219 ',
    description: 'high school near old house',
    latitude: 45.4771954,
    longitude: -122.6920507,
    current: false
  },
   {
    title: 'Hale Pele',
    addy: '2733 NE Broadway St, Portland, OR 97232',
    description: 'Tiki bar Megan likes',
    url: 'http://halepele.com/',
    latitude: 45.5352796,
    longitude: -122.6394542,
    current: false
  },
  {
    title: 'Sweedeedee',
    addy: '5202 N. Albina Ave, Portland, OR 97217',
    description: 'Small breakfast place. Another Megan pick. Go on a weekday',
    url: 'http://www.sweedeedee.com/',
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
  // use self whenever you want to get to the outer "this" in a
  // nested function like below. 
  this.currentLocation = ko.observable(this.locationList()[0]);
  
  this.setCurrentLocation = function(clickedLocation) {
    //make sure other current location is not set to show as well in map
    self.currentLocation().current(false);
    //set the new current location
    self.currentLocation(clickedLocation);
    self.currentLocation().current(true);
   
    initializeMap();
  }

  this.returnCoordinates = ko.computed(function() {
       var coordinates = self.currentLocation().latitude() + " by " + self.currentLocation().longitude();   
       return coordinates;
  }); 

  this.locationsToShow = ko.pureComputed(function() {
    return self.locationList();
  }, this);   
  
  

  //this.incrementCounter = function (clickedCat) {
   // self.currentCat().clickCount(self.currentCat().clickCount() + 1);
   //};
 //when you click it passes in an object
  //this.setCurrentCat = function(clickedCat) {
    //self.currentCat(clickedCat);
  //}


}

 

function initializeMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45.5231, lng: -122.6765},
    zoom: 10
  });
 
  results = vm.locationsToShow();
  var locationsSelect = document.getElementById('location-list');
  google.maps.event.addDomListener(locationsSelect, 'click', function() {
          google.maps.event.trigger(map, 'redraw'); 
          console.log('redraw');
        });

  //current = vm.returnCurrentLocation();
  //console.log(ko.toJSON(current));

  var marker, i, infowindow;
  
  for(i=0; i < results.length; i++ ) {
    infowindow = new google.maps.InfoWindow({
      content: ko.toJSON(results[i].description)
    });

    var latLng = new google.maps.LatLng(ko.toJSON(results[i].latitude),ko.toJSON(results[i].longitude));
    marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: ko.toJSON(results[i].title)
    
    });
    isCurrent = ko.toJSON(results[i].current);
      
    if(isCurrent == "true"){
       
          marker.setAnimation(google.maps.Animation.BOUNCE);

      }

    //marker.addListener('click', function() {
      //infowindow.open(map, marker);
    //});

    
    
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        console.log("this is description: " + ko.toJSON(results[i].url));
        content = '<strong><a href="' + ko.toJSON(results[i].url) + '">' + ko.toJSON(results[i].title) + '</a></strong><br/>' + ko.toJSON(results[i].description);
        infowindow.setContent(content);
        infowindow.open(map, marker);
      }
    })(marker, i));

  }
  


 /* marker.setAnimation(google.maps.Animation.BOUNCE);
    marker = new google.maps.Marker({
      position: curLatLng,
      map: map,
      title: ko.toJSON(current.title),
      animation: google.maps.Animation.DROP
    });*/
}


var vm = new ViewModel();
ko.applyBindings(vm);


//ko.applyBindings(new ViewModel());