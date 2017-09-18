describe('Geocoding API test', function() {

  var request = require("superagent");
  var helper = require('../../helper/helper.js');

  beforeEach(function() {
    browser.ignoreSynchronization = true;
    browser.driver.sleep(3000);
  });

  ////////// SMOKE TEST //////////

  it('[TEST-1] Make an API call with valid parameters (address, API key), verify geographic coordinates (latitude and longitude) and status (Status: OK)', function() {
    // Test API call
    browser.logger.info("[TEST-1] Make an API call with valid parameters (address, API key), verify geographic coordinates (latitude and longitude) and status (Status: OK)");
    request
      .post("https://maps.googleapis.com/maps/api/geocode/json?address=Nerkeza&key=AIzaSyAZ2u2qWs8tVmLK6QL-6cx8NPY98N7LUJk")
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err || !res.ok) {
          browser.logger.info("Unexpected error!");
        } else {
          //Verifying the status
          if (helper.checkString(res.body.status, browser.params.Geocoding.results[0].status) === true)
            browser.logger.info("API succesfully called, status present and displayed properly");
          //Verifying the address
          if (helper.checkString(res.body.results[0].address_components[0].long_name, browser.params.Geocoding.dataInfo[0].address) === true)
            browser.logger.info("API succesfully called, address present and displayed properly");
          //Verifying the lat
          if (helper.checkInt(res.body.results[0].geometry.location.lat, browser.params.Geocoding.dataInfo[0].lat) === true)
            browser.logger.info("API succesfully called, latitude present and displayed properly");
          //Verifying the lng
          if (helper.checkInt(res.body.results[0].geometry.location.lng, browser.params.Geocoding.dataInfo[0].lng) === true)
            browser.logger.info("API succesfully called, longitude present and displayed properly");

          //JSON body
          browser.logger.info("JSON file:" + "\n" + JSON.stringify(res.body, null, '\t'));
        }

      });

    // Check through browser
    browser.get('https://maps.googleapis.com/maps/api/geocode/json?address=Nerkeza&key=AIzaSyAZ2u2qWs8tVmLK6QL-6cx8NPY98N7LUJk');
    var el = element(by.xpath('/html/body/pre'));
    el.getText().then(function(text) {
      var jsonData = JSON.parse(text);
      if (helper.checkString(jsonData.status, browser.params.Geocoding.results[0].status) === true)
        browser.logger.info("Testing API through browser passed");
    });
  });

  it('[TEST-2] Make an API call with valid parameters (longitude, latitude), verify street address and status (Status: OK)', function() {
    // Test API call
    browser.logger.info("[TEST-2] Make an API call with valid parameters (longitude, latitude), verify street address and status (Status: OK)");
    request
      .post("https://maps.googleapis.com/maps/api/geocode/json?latlng=63.8417576,48.3455318&key=AIzaSyAZ2u2qWs8tVmLK6QL-6cx8NPY98N7LUJk")
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err || !res.ok) {
          browser.logger.info("Unexpected error!");
        } else {
          //Verifying the status
          if (helper.checkString(res.body.status, browser.params.Geocoding.results[0].status) === true)
            browser.logger.info("API succesfully called, status present and displayed properly");
          //Verifying the address
          if (helper.checkString(res.body.results[0].address_components[1].long_name, browser.params.Geocoding.dataInfo[1].address) === true)
            browser.logger.info("API succesfully called, address present and displayed properly");
          //Verifying the lat
          if (helper.checkInt(res.body.results[0].geometry.location.lat, browser.params.Geocoding.dataInfo[1].lat) === true)
            browser.logger.info("API succesfully called, latitude present and displayed properly");
          //Verifying the lng
          if (helper.checkInt(res.body.results[0].geometry.location.lng, browser.params.Geocoding.dataInfo[1].lng) === true)
            browser.logger.info("API succesfully called, longitude present and displayed properly");

          //JSON body
          browser.logger.info("JSON file:" + "\n" + JSON.stringify(res.body, null, '\t'));
        }

      });

    // Check through browser
    browser.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=63.8417576,48.3455318&key=AIzaSyAZ2u2qWs8tVmLK6QL-6cx8NPY98N7LUJk');
    var el = element(by.xpath('/html/body/pre'));
    el.getText().then(function(text) {
      var jsonData = JSON.parse(text);
      if (helper.checkString(jsonData.status, browser.params.Geocoding.results[0].status) === true)
        browser.logger.info("Testing API through browser passed");
    });
  });

  it('[TEST-3] Make an API call with invalid parameters (address- invalid, API key), verify status (Status: ZERO_RESULTS)', function() {
    // Test API call
    browser.logger.info("[TEST-3] Make an API call with invalid parameters (address- invalid, API key), verify status (Status: ZERO_RESULTS)");
    request
      .post("https://maps.googleapis.com/maps/api/geocode/json?address=retteta&key=AIzaSyAZ2u2qWs8tVmLK6QL-6cx8NPY98N7LUJk")
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err || !res.ok) {
          browser.logger.info("Unexpected error!");
        } else {
          //Verifying the status
          if (helper.checkString(res.body.status, browser.params.Geocoding.results[1].status) === true)
            browser.logger.info("API succesfully called, status present and displayed properly");

          //JSON body
          browser.logger.info("JSON file:" + "\n" + JSON.stringify(res.body, null, '\t'));
        }

      });

    // Check through browser
    browser.get('https://maps.googleapis.com/maps/api/geocode/json?address=retteta&key=AIzaSyAZ2u2qWs8tVmLK6QL-6cx8NPY98N7LUJk');
    var el = element(by.xpath('/html/body/pre'));
    el.getText().then(function(text) {
      var jsonData = JSON.parse(text);
      if (helper.checkString(jsonData.status, browser.params.Geocoding.results[1].status) === true)
        browser.logger.info("Testing API through browser passed");
    });
  });

  it('[TEST-4] Make an API call with missing parameters (address-missing, API key), verify error message and status (Status: INVALID_REQUEST)', function() {
    // Test API call
    browser.logger.info("[TEST-4] Make an API call with missing parameters (address-missing, API key), verify error message and status (Status: INVALID_REQUEST)");
    request
      .post("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAZ2u2qWs8tVmLK6QL-6cx8NPY98N7LUJk")
      .set('Accept', 'application/json')
      .end(function(err, res) {

        //Verifying the status
        if (helper.checkString(res.body.status, browser.params.Geocoding.results[3].status) === true)
          browser.logger.info("API succesfully called, status present and displayed properly");

        //Verifying the error message
        if (helper.checkString(res.body.error_message, browser.params.Geocoding.results[3].error) === true)
          browser.logger.info("API succesfully called, error message present and displayed properly");

        //JSON body
        browser.logger.info("JSON file:" + "\n" + JSON.stringify(res.body, null, '\t'));
      });

    // Check through browser
    browser.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAZ2u2qWs8tVmLK6QL-6cx8NPY98N7LUJk');
    var el = element(by.xpath('/html/body/pre'));
    el.getText().then(function(text) {
      var jsonData = JSON.parse(text);
      if (helper.checkString(jsonData.status, browser.params.Geocoding.results[3].status) === true)
        browser.logger.info("Testing API through browser passed");
    });
  });

  it('[TEST-5] Make an API call with invalid parameters (address, API key- invalid), verify error message and status (Status: REQUEST_DENIED)', function() {
    // Test API call
    browser.logger.info("[TEST-5] Make an API call with invalid parameters (address, API key- invalid), verify error message and status (Status: REQUEST_DENIED)");
    request
      .post("https://maps.googleapis.com/maps/api/geocode/json?address=Nerkeza&key=AIzaSyAZ2u2qWs8tVm")
      .set('Accept', 'application/json')
      .end(function(err, res) {

        //Verifying the status
        if (helper.checkString(res.body.status, browser.params.Geocoding.results[2].status) === true)
          browser.logger.info("API succesfully called, status present and displayed properly");

        //Verifying the error message
        if (helper.checkString(res.body.error_message, browser.params.Geocoding.results[2].error) === true)
          browser.logger.info("API succesfully called, error message present and displayed properly");

        //JSON body
        browser.logger.info("JSON file:" + "\n" + JSON.stringify(res.body, null, '\t'));

      });

    // Check through browser
    browser.get('https://maps.googleapis.com/maps/api/geocode/json?address=Nerkeza&key=AIzaSyAZ2u2qWs8tVm');
    var el = element(by.xpath('/html/body/pre'));
    el.getText().then(function(text) {
      var jsonData = JSON.parse(text);
      if (helper.checkString(jsonData.status, browser.params.Geocoding.results[2].status) === true)
        browser.logger.info("Testing API through browser passed");
    });
  });

  it('[TEST-6] Make an API call with invalid parameters (longitude-invalid, latitude-invalid, API key), verify error message and status (Status: ZERO_RESULTS)', function() {
    // Test API call
    browser.logger.info("[TEST-6] Make an API call with invalid parameters (longitude-invalid, latitude-invalid, API key), verify error message and status (Status: ZERO_RESULTS)");
    request
      .post("https://maps.googleapis.com/maps/api/geocode/json?latlng=00,0000&key=AIzaSyAZ2u2qWs8tVmLK6QL-6cx8NPY98N7LUJk")
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err || !res.ok) {
          browser.logger.info("Unexpected error!");
        } else {
          //Verifying the status
          if (helper.checkString(res.body.status, browser.params.Geocoding.results[1].status) === true)
            browser.logger.info("API succesfully called, status present and displayed properly");

          //JSON body
          browser.logger.info("JSON file:" + "\n" + JSON.stringify(res.body, null, '\t'));
        }

      });

    // Check through browser
    browser.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=00,0000&key=AIzaSyAZ2u2qWs8tVmLK6QL-6cx8NPY98N7LUJk');
    var el = element(by.xpath('/html/body/pre'));
    el.getText().then(function(text) {
      var jsonData = JSON.parse(text);
      if (helper.checkString(jsonData.status, browser.params.Geocoding.results[1].status) === true)
        browser.logger.info("Testing API through browser passed");
    });
  });

  it('[TEST-7] Make an API call with missing parameters (longitude-missing, latitude, API key), verify error message and status (Status: INVALID_REQUESTS)', function() {
    // Test API call
    browser.logger.info("[TEST-7] Make an API call with missing parameters (longitude-missing, latitude, API key), verify error message and status (Status: INVALID_REQUESTS)");
    request
      .post("https://maps.googleapis.com/maps/api/geocode/json?latlng=321&key=AIzaSyAZ2u2qWs8tVmLK6QL-6cx8NPY98N7LUJk")
      .set('Accept', 'application/json')
      .end(function(err, res) {

        //Verifying the status
        if (helper.checkString(res.body.status, browser.params.Geocoding.results[3].status) === true)
          browser.logger.info("API succesfully called, status present and displayed properly");

        //Verifying the error message
        if (helper.checkString(res.body.error_message, browser.params.Geocoding.results[3].error1) === true)
          browser.logger.info("API succesfully called, error message present and displayed properly");

        //JSON body
        browser.logger.info("JSON file:" + "\n" + JSON.stringify(res.body, null, '\t'));

      });

    // Check through browser
    browser.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=321&key=AIzaSyAZ2u2qWs8tVmLK6QL-6cx8NPY98N7LUJk');
    var el = element(by.xpath('/html/body/pre'));
    el.getText().then(function(text) {
      var jsonData = JSON.parse(text);
      if (helper.checkString(jsonData.status, browser.params.Geocoding.results[3].status) === true)
        browser.logger.info("Testing API through browser passed");
    });
  });

  it('[TEST-8] Make an API call with invalid parameters (longitude, latitude, API key - invalid), verify error message and status (Status: REQUEST_DENIED)', function() {
    // Test API call
    browser.logger.info("[TEST-8] Make an API call with invalid parameters (longitude, latitude, API key - invalid), verify error message and status (Status: REQUEST_DENIED)");
    request
      .post("https://maps.googleapis.com/maps/api/geocode/json?latlng=43.8417576,18.3455318&key=AIzaSyAZ2u2qWs8tVmLK6QL-6cx8NPY98")
      .set('Accept', 'application/json')
      .end(function(err, res) {
        //Verifying the status
        if (helper.checkString(res.body.status, browser.params.Geocoding.results[2].status) === true)
          browser.logger.info("API succesfully called, status present and displayed properly");

        //Verifying the error message
        if (helper.checkString(res.body.error_message, browser.params.Geocoding.results[2].error) === true)
          browser.logger.info("API succesfully called, error message present and displayed properly");

        //JSON body
        browser.logger.info("JSON file:" + "\n" + JSON.stringify(res.body, null, '\t'));


      });

    // Check through browser
    browser.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=43.8417576,18.3455318&key=AIzaSyAZ2u2qWs8tVmLK6QL-6cx8NPY98');
    var el = element(by.xpath('/html/body/pre'));
    el.getText().then(function(text) {
      var jsonData = JSON.parse(text);
      if (helper.checkString(jsonData.status, browser.params.Geocoding.results[2].status) === true)
        browser.logger.info("Testing API through browser passed");
    });
  });

  xit('[TEST-9] Make an API call with valid parameters (address, API key), verify error message and status (Status: OVER_QUERY_LIMIT)', function() {
    // Test API call
    browser.logger.info("[TEST-9] Make an API call with valid parameters (address, API key), verify error message and status (Status: OVER_QUERY_LIMIT)");
    request
      .post("https://maps.googleapis.com/maps/api/geocode/json?address=Nerkeza&key=AIzaSyAZ2u2qWs8tVmLK6QL-6cx8NPY98N7LUJk")
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err || !res.ok) {
          browser.logger.info("Unexpected error!");
        } else {
          //Verifying the status
          if (helper.checkString(res.body.status, browser.params.Geocoding.results[4].status) === true)
            browser.logger.info("API succesfully called, status present and displayed properly");

          //JSON body
          browser.logger.info("JSON file:" + "\n" + JSON.stringify(res.body, null, '\t'));
        }

      });

    // Check through browser
    browser.get('https://maps.googleapis.com/maps/api/geocode/json?address=Nerkeza&key=AIzaSyAZ2u2qWs8tVmLK6QL-6cx8NPY98N7LUJk');
    var el = element(by.xpath('/html/body/pre'));
    el.getText().then(function(text) {
      var jsonData = JSON.parse(text);
      if (helper.checkString(jsonData.status, browser.params.Geocoding.results[4].status) === true)
        browser.logger.info("Testing API through browser passed");
    });
  });

  xit('[TEST-10] Make an API call with valid parameters (longitude, latitude, API key), verify error message and status (Status: OVER_QUERY_LIMIT)', function() {
    // Test API call
    browser.logger.info("[TEST-10] Make an API call with valid parameters (longitude, latitude, API key), verify error message and status (Status: OVER_QUERY_LIMIT)");
    request
      .post("https://maps.googleapis.com/maps/api/geocode/json?latlng=43.8417576,18.3455318&key=AIzaSyAZ2u2qWs8tVmLK6QL-6cx8NPY98N7LUJk")
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err || !res.ok) {
          browser.logger.info("Unexpected error!");
        } else {
          //Verifying the status
          if (helper.checkString(res.body.status, browser.params.Geocoding.results[4].status) === true)
            browser.logger.info("API succesfully called, status present and displayed properly");

          //JSON body
          browser.logger.info("JSON file:" + "\n" + JSON.stringify(res.body, null, '\t'));
        }

      });

    // Check through browser
    browser.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=43.8417576,18.3455318&key=AIzaSyAZ2u2qWs8tVmLK6QL-6cx8NPY98N7LUJk');
    var el = element(by.xpath('/html/body/pre'));
    el.getText().then(function(text) {
      var jsonData = JSON.parse(text);
      if (helper.checkString(jsonData.status, browser.params.Geocoding.results[4].status) === true)
        browser.logger.info("Testing API through browser passed");
    });
  });
});
