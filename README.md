## Map of Portland, OR with Google Maps, Flickr, & Wikipedia

Built for Udacity's Neighborhood Map Project

*[Neighborhood Map](https://katebron.github.io/neighborhood_map/)*

### Technology Used

* Knockout JS:  interactivity with user. Presents information 
  based on the current location to the map (via Google Maps API) and surrounding web page.
* Google Maps API: provides the map and enables location info to be present
  in infowindows.
* Flickr API: query by latitude and longitude of the current location, returns photo info, 
  build img src for the photos on the UI with this info.
* Wikipedia API: query by latitude and longitude for each location shown in the list of locations
  on the UI; build links to articles for entries that are tagged in the radius of each location.
  Provide this info for infoscreens on the Google Maps API.
* Workflow tools: Used Gulp and JSHint for local development

### Running the project locally

To run this locally, open index.html with a web browser

### Further documentation

See [Global documentation](out/global.html)