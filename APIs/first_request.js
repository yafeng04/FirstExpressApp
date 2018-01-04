//making request to API using 'request' library
var request = require('request');
request(
  'https://query.yahooapis.com/v1/public/yql?q=select%20wind%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22chicago%2C%20il%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
  function(error, response, body) {

    if (!error && response.statusCode == 200)
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode);
    // Print the response status code if a response was received
      var parsedData = JSON.parse(body);
    console.log(parsedData["query"]["results"]["channel"]["wind"]["speed"]); // Print the HTML for the Google homepage.

  });
