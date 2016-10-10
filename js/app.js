

initialLocations = [
{
    title: 'Air b&b',
    address: '745 NE Sumner St, Portland OR 97211',
    description: 'Our backyard',
    url: 'https://www.airbnb.com',
    latitude: 45.560812,
    longitude: -122.657447,
    genre: 'lodging',
  },
 {
    title: 'Uno Mas taquiza',
    address: '1914 W. Burnside',
    description: 'Taco place megan recommended',
    url: 'http://unomastaquiza.com/',
    latitude: 45.5228908,
    longitude: -122.6926175,
    genre: 'food',
  },
  {
    title: 'Wilson high school',
    address: '1151 SW Vermont St, Portland, OR 97219 ',
    description: 'high school near old house',
    genre: 'nostalgia',
    latitude: 45.4771954,
    longitude: -122.6920507,
  },
   {
    title: 'Hale Pele',
    address: '2733 NE Broadway St, Portland, OR 97232',
    description: 'Tiki bar Megan likes',
    url: 'http://halepele.com/',
    genre: 'bar',
    latitude: 45.5352796,
    longitude: -122.6394542,
  },
  {
    title: 'Sweedeedee',
    address: '5202 N. Albina Ave, Portland, OR 97217',
    description: 'Small breakfast place. Another Megan pick. Go on a weekday',
    url: 'http://www.sweedeedee.com/',
    genre: 'food',
    latitude: 45.5605478,
    longitude: -122.6748336,
  },
  {
    title: 'Little Bird Bistro',
    address: '215 SW 6th Ave, Portland, OR 97204',
    description: 'Jess pick',
    url: 'http://littlebirdbistro.com/',
    genre: 'food',
    latitude: 45.522229,
    longitude: -122.677192,
  },
   {
    title: 'Farm Spirit PDX',
    address: '1414 SE Morrison Street, Portland OR 97202',
    description: 'Jess pick: Aka Portlands most refined vegetable-focused restaurant yet',
    url: 'http://farmspiritpdx.com/',
    genre: 'food',
    latitude: 45.517108,
    longitude: -122.651217,
  },
   {
    title: 'Toro Bravo',
    address: '120 NE Russell St Portland, OR, 97212',
    description: 'Jess pick',
    url: 'http://www.torobravopdx.com/',
    genre: 'food',
    latitude: 45.517108,
    longitude: -122.651217,
  },
  {
    title: 'Nuestra Concina',
    address: '2135 SE Division Street Portland, OR 97202',
    description: 'Jess pick',
    url: 'http://nuestracocina.com/',
    genre: 'food',
    latitude: 45.505052,
    longitude: -122.643843,
  },
 {
    title: 'Tasty n Alder',
    address: '580 SW 12th Ave, Portland, OR, 97205',
    description: 'Jess pick: i can\'t eat much here but it looks good and i\'m sure that i could find something to eat',
    url: 'http://www.tastynalder.com/',
    genre: 'food',
    latitude: 45.521341,
    longitude: -122.683477,
  },
   {
    title: 'Mediterranean Exploration Company',
    address: '333 NW 13th Ave, Portland OR 97209',
    description: 'Jess pick: even if not on your bday, i\'d like to go here one night',
    url: 'http://www.tastynalder.com/',
    genre: 'food',
    latitude: 45.521341,
    longitude: -122.683477,
  },
  {
    title: 'Sauce Box',
    address: '214 sw broadway, portland, or 97205',
    description: "From Kris: I think this is where i went with Katie",
    url: 'http://www.saucebox.com/',
    genre: 'bar',
    latitude: 45.522696,
    longitude: -122.678183,
  },
   {
    title: 'Longfellows',
    address: '1401 SE Division St, Portland, OR 97202',
    description: "Mainstay for classic titles, first editions, fine bindings, rare periodicals, posters & ephemera.",
    url: 'http://www.saucebox.com/',
    genre: 'bookstore',
    latitude: 45.505030,
    longitude: -122.651610,
  },
]


var Location = function(data) {  
  this.title = ko.observable(data.title);
  this.address = ko.observable(data.address);
  this.description = ko.observable(data.description);
  this.latitude = ko.observable(data.latitude);
  this.longitude = ko.observable(data.longitude);
  this.url = ko.observable(data.url);
  this.genre = ko.observable(data.genre);
  this.genreIcon = ko.observable(data.genreIcon);
  this.current = ko.observable(data.current);
  this.showInfo = ko.observable(data.showInfo);
  this.neighborhood = ko.observable();
  this.showSvg = ko.observable(false);
  
}



var ViewModel = function() {
  var self = this;

  this.locationList = ko.observableArray([]);
  this.images = ko.observableArray([]);
  initialLocations.sort(function(a,b) {return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);} );
  initialLocations.forEach(function(place){
    place.current = false;
    place.showInfo = false;
    var ico = "";
    switch(place.genre) {
    case 'food':
      ico = 'icon-spoon-knife';
      break;
    case 'bar':
      ico = 'icon-glass2';
      break;
    case 'lodging':
      ico = 'icon-bed';
      break;
    case 'nostalgia':
      ico = 'icon-quill';
      break;
    case 'bookstore':
      ico = 'icon-books';
      break;
    }
    place.genreIcon = ico;

    self.locationList.push(new Location(place));

  }, this);
     
  
  self.query = ko.observable('');

  // use self whenever you want to get to the outer "this" in a
  // nested function like below. 
  this.currentLocation = ko.observable(this.locationList()[0]);
  this.typeToShow = ko.observable("all");
  
  this.setCurrentLocation = function(clickedLocation) {
    //make sure other current location is not set to show as well in map
    self.currentLocation().current(false);
    self.currentLocation().showInfo(false);
    //set the new current location
    self.currentLocation(clickedLocation);
    self.currentLocation().current(true);
    self.currentLocation().showInfo(true);
   
    place_markers();
  }
  
  this.getImages = ko.computed(function(clickedLocation) {
   self.images.removeAll();
   var lat = self.currentLocation().latitude();
   var long = self.currentLocation().longitude();   
   var flickr_key = '0ba16f70231cf1f8e6b825dfa87343d2';
   var flickr_url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + flickr_key + '&lat=' + lat + '&lon=' + long + '&radius=1&page=0&per_page=5&format=json&nojsoncallback=1';
   $.ajax({
    type: "GET",
    url: flickr_url,
    success: function(data){
        $(data.photos.photo).each(function(i,item){
        src = "https://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_m.jpg";
        self.images.push(src);
        });
      },
    error: function(){
      $('#photos').append("<em>Temporarily unable to pull from the flickr API</em>");
    }
    });
  }) 

  this.locationsToShow = ko.pureComputed(function() {
    var locations = ko.observableArray();
    locations = this.locationList();
    locations.forEach(function(place){
      var url = 'http://api.geonames.org/neighbourhoodJSON?lat=' + place.latitude() + '&lng=' + place.longitude() + '&username=katebron&style=full';
      $.ajax({
        type: "GET",
        url: url,
        success: function(data){
          place.neighborhood(data.neighbourhood.name + " neighborhood");
        },
        error: function(){
          place.neighborhood("");
        }
      });
    }, this);

    var search = this.query().toLowerCase();
    if (search) {
        locations = ko.utils.arrayFilter(results, function(locale){
          return (locale.title().toLowerCase().indexOf(search) >= 0);
      });
    }
    var desiredType = this.typeToShow();
    if (desiredType && desiredType != 'all'){
      locations =  ko.utils.arrayFilter(locations, function(locale) {
        return locale.genre() === desiredType;
      });
    } 
    
    return locations;
  }, this);  



  this.locationsToShow.subscribe(function(newValue) {
    place_markers();
  }); 
}


var markers = []; 


window.initializeMap = function() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45.5231, lng: -122.6765},
    zoom: 12
  });

  place_markers();
}

setTimeout(function(){
 if(!window.google || !window.google.maps) {
    $('#map').html('<span class="error">Our apologies, Google Maps isn\'t working at the moment for us</span>');
  }
}, 1000);

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
  var desc = "<strong>" + ko.toJSON(location.title) + "</strong><br/> " + ko.toJSON(location.address); 
  var infoWindow = new google.maps.InfoWindow({
    content: desc,
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

