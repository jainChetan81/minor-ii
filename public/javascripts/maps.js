$(document).ready(function() {
  initMap();
  function initMap() {
    //MAPS
    //map options
    var options = {
      zoom: 14,
      center: { lat: 28.6323384, lng: 77.37262659999999 }
    };

    //map
    var map = new google.maps.Map(document.getElementById("map"), options);
    //

    //Geolocation
    var x = document.getElementById("demo");
    let location = $("#location");
    location.click(() => {
      console.log("button clicked");
      getLocation();
    });

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
    }

    function showPosition(position) {
      x.innerHTML =
        "Latitude: " +
        position.coords.latitude +
        "<br>Longitude: " +
        position.coords.longitude;
    }
    ///

    //direction and route
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setMap(map);

    var onChangeHandler = function() {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    x.addEventListener("change", onChangeHandler);

    //search box
    var input = document.getElementById("pac-input");
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", function() {
      searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener("places_changed", function() {
      var places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  } //
});
