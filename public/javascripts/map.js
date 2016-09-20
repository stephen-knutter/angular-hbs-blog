angular.module('map', [])
  .factory('map', [function() {
    return {
      generateMap: function(lat, lng) {
        var elem = document.getElementById('map');

        L.mapbox.accessToken = 'pk.eyJ1Ijoic21rcXA4IiwiYSI6ImNpdGJuZnBiajA3N2EybmxxZWMyZWZqaGQifQ.PNSnlUFr8kUczvGEv7EkfA';

        var newMap = L.mapbox
          .map(elem, 'mapbox.streets')
          .setView([lat, lng], 9);
        newMap.dragging.disable();
        newMap.scrollWheelZoom.disable();
      }
    }
  }]);
