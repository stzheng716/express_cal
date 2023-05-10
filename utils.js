"use strict";

const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */
function convertStrNums(strNums) {
  const convertedNums = strNums.split(",").map(function(num){
    if(isNaN(Number(num))) { // handle invalid int input
      throw new BadRequestError(`${num} is not a number`);//error valid
    }
    return Number(num);
 });

 return convertedNums;
}


module.exports = { convertStrNums };