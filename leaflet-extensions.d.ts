// leaflet-extensions.d.ts
import * as L from 'leaflet';

declare module 'leaflet' {
  namespace Control {
    function Geocoder(): any;
    namespace Geocoder {
      function nominatim(): any;
    }
  }

  namespace Routing {
    function control(options: any): any;
  }
}
