/*
This web service would calculate the distance between two locations in KM when provide with latitude and longitude. 

Input URL:
https://clu42.sse.codesandbox.io/?latA=40.78647&lonA=-111.97631&latB=44.40954&lonB=-110.50269
Location names: Salt Lack City and The Yellow stone National Park
Output distance: 420.51575588098206 km
Google Map distance: 420.52 km
*/
var http = require("http");
http
  .createServer(function (request, response) {
    // Read the URL used to contact the web service and extract the latitude and longitude values, saving them each to a variable
    var requestUrl = new URL("http://" + request.headers.host + request.url);
    var latA = requestUrl.searchParams.get("latA");
    var lonA = requestUrl.searchParams.get("lonA");
    var latB = requestUrl.searchParams.get("latB");
    var lonB = requestUrl.searchParams.get("lonB");

    // Use the spherical law of cosines formula to calculate distance along the surface of a sphere. It is not the most accurate method for Earth, but it is good enough. Source: https://www.movable-type.co.uk/scripts/latlong.html
    const φ1 = (latA * Math.PI) / 180;
    const φ2 = (latB * Math.PI) / 180;
    const Δλ = ((lonB - lonA) * Math.PI) / 180;
    const R = 6371; // Earth's radius in km
    const d =
      Math.acos(
        Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)
      ) * R;

    // Output the calculated distance value to the client and complete the execution of the program.
    response.write("{distance: " + d + "}");
    response.end();
  })
  .listen(8080);
