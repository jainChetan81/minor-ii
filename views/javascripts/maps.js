$(document).ready(function() {
  initMap();
  function initMap() {
    //map options
    let options = {
        zoom: 14,
        center: { lat: 28.6323384, lng: 77.37262659999999 }
      },
      flag = -1,
      map = new google.maps.Map(document.getElementById("map"), options),
      x = document.getElementById("demo"),
      location = $("#location"),
      nearest = $("#nearest"),
      locations = [
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

    //
    location.click(() => {
      console.log("button clicked location");
      flag = 0;
      getLocation();
    });
    nearest.click(() => {
      console.log("button clicked nearest");
      flag = 1;
      getLocation();
    });

    //Geolocation
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
      console.log(flag);
      if (flag == 0) {
        console.log("addMarker");
        addMarker(user);
        flag = -1;
      }
      if (flag == 1) {
        console.log("find route");
        CalculateRoute(user);
        flag = -1;
      }
    }
    ///Geolocation

    //add marker
    function addMarker(user) {
      console.log("[AddMarker]");
      locations.forEach(mark => {
        var marker = new google.maps.Marker({
          position: mark,
          map: map
        });
        marker.addListener("click", function() {
          console.log("clicked");
          findroute(user, mark);
        });
      });
      const markerA = new google.maps.Marker({
        position: user,
        title: "user",
        label: "user",
        map: map
      });
    }
    ///end of add marker

    //calculate distance
    var rad = function(x) {
      return (x * Math.PI) / 180;
    };
    function CalculateRoute(user) {
      var R = 6378137;
      var shortest = 1000000000;
      var shortRoute = {};
      locations.forEach((route, index) => {
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
          shortRoute = route;
          console.log("this is the shortest : ", d, " index : ", index);
        }
      });
      if (shortest > 2000) {
        alert("there is no parking space in your area");
        console.log("there is no parking space in your area");
      } else {
        x.innerHTML =
          "you need to trave :" +
          Math.floor(shortest) +
          "m to react nearest parking space";
        findroute(user, shortRoute);
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
    //end of search

    //direction and route
    function findroute(user, dest) {
      var directionsService = new google.maps.DirectionsService(),
        directionsDisplay = new google.maps.DirectionsRenderer({
          map: map
        });
      // markerA = new google.maps.Marker({
      //   position: user,
      //   title: "user",
      //   label: "user",
      //   map: map
      // }),
      // markerB = new google.maps.Marker({
      //   position: dest,
      //   title: "Dest",
      //   label: "Dest",
      //   map: map
      // });

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
            if (status == google.maps.DirectionsStatus.OK) {
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
