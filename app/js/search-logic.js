var formLogic = (function(){

  // why is this a function? O.o
  function increment (value) {
    return ++value;
  }

  // if value is positive, decrement it. otherwise return the value.
  // (this way the value stays nonnegative?)
  function subtract (value) {
    if(value > 0) {
      return --value;
    } else {
      return value;
    }
  }

  /* calcDate
   * 
   * a utility that takes a date string and returns an object representing
   * a date that is either "days+1" (for add) or "days" (for subtract) days
   * in the future.
   * e.g. if selectedDate is "2014-1-3" and days is 3,
   * "add" will give you an object representation of 2014-1-7 and
   * "subtract" will give you an objecte representation of 2014-1-6.
   * 
   * it's a pretty weird function. I don't get its purpose.
   * 
   * params:
   *   selectedDate: a string that can be parsed into a date
   *   days: an integer number of days
   *   operation: {'add', 'subtract'}
   *
   * return:
   *   returnDate: object with properties month, day, and year
   */
  function calcDate (selectedDate, days, operation) {
    var departureDate = Date.parse(selectedDate);
    if(operation == 'add'){
      var theFuture = new Date(+(new Date(departureDate)) + (1000 * 60 * 60 * 24 * (days+1)));

    } else if(operation = 'subtract'){
      var backToTheFuture = new Date(+(new Date(departureDate)) + (1000 * 60 * 60 * 24 * (days+1)));

      var theFuture = new Date(+(new Date(backToTheFuture)) - (1000 * 60 * 60 * 24));

    } else {
      return false;
    }
    var returnDate = {};
    returnDate.month = theFuture.getMonth()+1;
    returnDate.day = theFuture.getDate();
    returnDate.year = theFuture.getFullYear();
    return returnDate;
  }

  /* sumStringNums
   * 
   * given an array of strings, parse each string to an int and add them all up.
   * 
   */
  function sumStringNums(array) {
    var total = 0;
    for(var i = 0; i < array.length; i++){

      total = total + parseInt(array[i]);

    }
    return total;
  }

  /* collect
   * 
   * map the function given in "iterator" onto each element in array
   * 
   * params:
   *   array: any array
   *   iterator: a function that can be applied to the elements of "array"
   * 
   * return:
   *   newArr: a new array where newArr[i] = iterator(array[i])
   * 
   */
  function collect(array, iterator){
    var newArr = [];
    for(var i = 0; i < array.length; i++){
      var newVal = iterator(array[i]);
      newArr.push(newVal);
    }
    return newArr;
  }

  /* sumObjProps
   * 
   * add up all properties of the object passed
   */
  function sumObjProps(obj){
    var sum = 0;
    for(var prop in obj){
      sum += obj[prop];
    }
    return sum;
  }

  /* objLength
   * 
   * return the number of properties of the object passed
   */
  function objLength(obj){
    var sum = 0;
    for(var prop in obj){
      sum += 1;
    }
    return sum;
  }

  // return all these functions as methods of single object
  return {
    add: increment,
    subtract: subtract,
    calcDate: calcDate,
    sumStringNums: sumStringNums,
    sumObjProps: sumObjProps,
    objLength: objLength
  }
})();