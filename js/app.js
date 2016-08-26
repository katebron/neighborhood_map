initialLocations = [
 {
    title: 'this is a place',
    addy: 'located here',
    description: 'here is a description'
  },
]

var Location = function(data) {
  //this.clickCount = ko.observable(data.clickCount);
  
  this.title = ko.observable(data.title);
  this.addy = ko.observable(data.addy);
  this.description = ko.observable(data.description);
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

 
  //this.incrementCounter = function (clickedCat) {
   // self.currentCat().clickCount(self.currentCat().clickCount() + 1);
   //};
 //when you click it passes in an object
  //this.setCurrentCat = function(clickedCat) {
    //self.currentCat(clickedCat);
  //}


}


ko.applyBindings(new ViewModel());