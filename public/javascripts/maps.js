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
    var locations = [
      {
        lat: 28.65209,
        lng: 77.341734
      },
      {
        lat: 28.610131,
        lng: 77.37308
      },
      {
        lat: 28.624859,
        lng: 77.391539
      },
      {
        lat: 28.638056,
        lng: 77.388582
      },
      {
        lat: 28.641296,
        lng: 77.367811
      },
      {
        lat: 28.624063,
        lng: 77.355118
      }
    ];

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
      CalculateRoute(user);
      x.innerHTML =
        "Latitude: " +
        position.coords.latitude +
        "<br>Longitude: " +
        position.coords.longitude;
    }
    ///Geolocation

    //calculate distance
    var rad = function(x) {
      return (x * Math.PI) / 180;
    };
    function CalculateRoute(user) {
      var R = 6378137;
      var shortest = 1000000000;
      var short = {};
      locations.forEach((route, index) => {
        console.log(index, "  file   :  ", route.lat);
        var dLat = rad(route.lat - user.lat);
        var dLong = rad(route.lng - user.lng);
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(rad(user.lat)) *
            Math.cos(rad(route.lat)) *
            Math.sin(dLong / 2) *
            Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        if (d < shortest) {
          shortest = d;
          short = route;
          console.log("this is the shortest : ", d, " index : ", index);
        }
      });
      if (shortest > 2000) {
        alert("there is no parking space in your area");
        console.log("there is no parking space in your area");
      } else {
        console.log("else");
        findroute(user, short);
      }
    } //end of distance

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
    function findroute(user, dest) {
      console.log("destination : ", dest);
      var options = {
        zoom: 124,
        center: user //{ lat: 28.6323384, lng: 77.37262659999999 }
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
          position: dest,
          title: "D",
          label: "D",
          map: map
        });

      // get route from A to B
      calculateAndDisplayRoute(
        directionsService,
        directionsDisplay,
        user,
        dest
      );

      function calculateAndDisplayRoute(
        directionsService,
        directionsDisplay,
        user,
        dest
      ) {
        directionsService.route(
          {
            origin: user,
            destination: dest,
            travelMode: google.maps.TravelMode.DRIVING
          },
          function(response, status) {
            console.log(user.lng);
            if (status == google.maps.DirectionsStatus.OK) {
              console.log(user.lng);
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
