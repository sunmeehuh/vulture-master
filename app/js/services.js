'use strict';

var vultureServices = angular.module('vultureServices', ['ngResource']);

// not sure what this does because ":city.json" is not a file
// I probably just need to look up that syntax
vultureServices.factory('Destination', ['$resource', '$rootScope',
  function($resource, $rootScope) {
    return $resource('cities/:city.json', {}, {
      query: {method: 'GET', params:{city: 'all'}, isArray:true}
    });
  }]);

// returns an object represented by the file "city-codes.json"
vultureServices.factory('CityCode', ['$resource',
  function($resource) {
    return $resource('cities/city-codes.json', {}, {
      get: {method: 'GET'}
    });
  }]);

// same
vultureServices.factory('CityAndAirportCode', ['$resource',
  function($resource) {
    return $resource('cities/city-airport-codes.json', {}, {
      get: {method: 'GET'}
    });
  }]);

//same
vultureServices.factory('apiKey', ['$resource',
  function($resource){
    return $resource('api-key.json',{
      get: {method: 'GET'}
    });
  }]);

// this is a weird function, not sure what it does
vultureServices.factory('test', [
  function(){
    var testArr = [];
    function populateArr (){
      testArr = [];
      for(var i = 0; i < 11; i++){
        testArr.push(i);
      }
    }
    return {
      popArr: populateArr,
      getArr: function(){
        return testArr;
      }
    }
  }]);

vultureServices.factory('Flights', [ '$http', '$rootScope',
  function($http, $rootScope){

    var responsePackage = [];

    // for each item in "flightRequests", make a call to getFlightData (which makes a POST request)
    // and store the result in "responsePackage"
    function fetchFlights(flightRequests){

      responsePackage = [];

      // flightRequests.splice(4, flightRequests.length - 4);


      // UNCOMMENT THIS TO MAKE API CALLS --------------vvvvvvvvv

      for (var request = 0; request < flightRequests.length; request++){
        responsePackage[request] = getFlightData('https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyDLQxMkWe1rg9w1a1sqXxxObRvYrujjj4w', request, flightRequests);
      }

      console.log(responsePackage)
      return responsePackage;

      // END UNCOMMENTING HERE -----------------------------
    }

    // return the end result
    function get (){
      return responsePackage;
    }

    // called by fetchFlights as a utility
    // makes a post request to the url passed as a parameter and promises the result
    // this is a weird way to do this. why not just use $http?
    function getFlightData(url, index, requestArray) {
      return new Promise(function(resolve, reject){
        var req = new XMLHttpRequest();
        req.open('POST', url, true);
        var params = JSON.stringify(requestArray[index]);
        req.setRequestHeader("Content-type", "application/json; charset=utf-8");

        req.onload = function() {
          if(req.status == 200) {
            resolve(req.response);
          } else {
            reject(Error(req.statusText));
          }
        };

        req.onerror = function(){
          reject(Error("Network Error"));
        };
        req.send(params);
      });
    }

    return {
      fetch: fetchFlights,
      get: get
    }

  }]);

/* this looks like it's being used as a reference for the programmer */

// 'POST', 'https://www.googleapis.com/qpxExpress/v1/trips/search&key={API_KEY}'

// data.request.passengers = {
//   "infantInLapCount": 0,
//   "infantInSeatCount": 0,
//   "childCount": 0,
//   "seniorCount": 0
// };
// data.request.solutions = 1;
// data.request.refundable = false;
// var sliceInfo = {};
// sliceInfo.destination = city;
// data.request.slice = [sliceInfo];
// for(var input = 0; input < searchForm.elements.length; input++){
//   var inputName = searchForm.elements[input].name;
//   var inputVal = searchForm.elements[input].value;

//   switch(inputName){
//     case "origin":
//       sliceInfo[inputName] = getKeyByValue(cities, inputVal);
//       break;
//     case "date":
//       sliceInfo[inputName] = inputVal;
//       break;
//     case "passengers":
//       data.request.passengers.adultCount = parseInt(inputVal);
//       break;
//   }
// }

