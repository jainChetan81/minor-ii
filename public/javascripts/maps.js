$(document).ready(function() {
  initMap();
  function initMap() {
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
      let user = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      findroute(user);
      x.innerHTML =
        "Latitude: " +
        position.coords.latitude +
        "<br>Longitude: " +
        position.coords.longitude;
    }
    ///Geolocation

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
    }); //end of search place

    //direction and route
    function findroute(user) {
      var pointA = { lat: 51.7519, lng: -1.2578 }, // new google.maps.LatLng(51.7519, -1.2578),
        pointB = { lat: 50.8429, lng: -0.1313 },
        options = {
          zoom: 124,
          center: pointA //{ lat: 28.6323384, lng: 77.37262659999999 }
        };
      let map = new google.maps.Map(document.getElementById("map"), options);
      var directionsService = new google.maps.DirectionsService(),
        directionsDisplay = new google.maps.DirectionsRenderer({
          map: map
        }),
        markerA = new google.maps.Marker({
          position: user,
          title: "user",
          label: "user",
          map: map
        }),
        markerB = new google.maps.Marker({
          position: pointB,
          title: "point B",
          label: "B",
          map: map
        });

      // get route from A to B
      calculateAndDisplayRoute(
        directionsService,
        directionsDisplay,
        user,
        pointB
      );

      function calculateAndDisplayRoute(
        directionsService,
        directionsDisplay,
        user,
        pointB
      ) {
        directionsService.route(
          {
            origin: user,
            destination: pointB,
            travelMode: google.maps.TravelMode.DRIVING
          },
          function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              console.log(pointA.lng);
              directionsDisplay.setDirections(response);
            } else {
              window.alert("Directions request failed due to " + status);
            }
          }
        );
      } //end direction and route
    }
  }
});
