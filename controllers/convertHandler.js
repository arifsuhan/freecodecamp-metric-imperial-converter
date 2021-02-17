/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  //
  arr1 = ["gal","L"];
  arr11 = ["gallons","liters"];

  //
  arr2 = ["lbs","kg"];
  arr21 = ["pounds","kilograms"];

  //
  arr3 = ["mi","km"];
  arr31 = ["miles","kilometers"];

  this.getNum = function(input) {
    let unit       = input.match(/[a-zA-Z]+/)[0];
    let num        = input.split(unit)[0];
    let matchSlash = Boolean(num.match(/[/]/));
    
    // handle no numeric input
    if(input === unit){
      return 1;
    }
    
    // handle fraction
    if(matchSlash){
      let firstNumber  = num.split("/")[0];
      let secondNumber = num.split("/")[1];
      
      // handle multiple fraction
      if(num.split("/")[2]){
        return 'invalid number'
      }
      
      // handle slash at the end or beginning 
      if ( firstNumber.length === 0 || secondNumber.length === 0 ){
        return 'invalid number'
      } else {
        return (Number(firstNumber)/Number(secondNumber));
      }
    } 
    
    return Number(num);
  };
  
  this.getUnit = function(input) {
    let listedUnits = ['gal','l','mi','km','lbs','kg'];
    let temp = input.match(/[a-zA-Z]+/)[0].toLowerCase();

    let isValidUnit = listedUnits.some((elm) => {
      return temp === elm;
    });

    if(!isValidUnit){
      return "invalid unit";
    }

    if(temp == "l"){
      temp = temp.toUpperCase();
    }
    return temp;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    initUnit = initUnit.toLowerCase();
    // console.log("convert " + initUnit);

    switch(initUnit){
      case 'gal':
      case 'l':
        if (initUnit === "l"){
          initUnit = initUnit.toUpperCase();
        }
        result = arr1 [ arr1.indexOf(initUnit) ^ 1 ];
        break;
      case 'lbs':
      case 'kg':
        result = arr2 [ arr2.indexOf(initUnit) ^ 1 ];
        break;
      case 'mi':
      case 'km':
        result = arr3 [ arr3.indexOf(initUnit) ^ 1 ];
        break;
      default:
        result = 'invalid unit';
    }

    return result;
  };

  this.calculate = function(formula,flag) {
    return (flag)? (1/formula) : formula;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    let precision = 5;
    initUnit = initUnit.toLowerCase();

    switch(initUnit){
      case 'gal':
      case 'l':
        result = this.calculate(galToL,arr1.indexOf(initUnit)) * initNum;
        // console.log(result);
        break;
      case 'lbs':
      case 'kg':
        result = this.calculate(lbsToKg,arr2.indexOf(initUnit)) * initNum;
        break;
      case 'mi':
      case 'km':
        result = this.calculate(miToKm,arr3.indexOf(initUnit)) * initNum;
        break;
      default:
        result = 'invalid unit';
    }

    if(initNum == ""){
      result = 'invalid unit';
    }

    try{
      result = result.toFixed(precision);
      // console.log(result);
    }catch(err){
      result = result;
    }
    
    return parseFloat(result);
  };

  this.spellOutUnit = function(arrA,arrB,unit) {
    i = arrA.indexOf(unit);
    j = i ^ 1;
    return [arrB[i], arrB[j]];
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    initUnit = initUnit.toLowerCase();

    switch(initUnit){
      case 'gal':
      case 'l':
        if (initUnit === "l"){
          initUnit = initUnit.toUpperCase();
        }
        temp = this.spellOutUnit(arr1,arr11,initUnit);
        initUnit = temp[0];
        returnUnit = temp[1];
        break;
      case 'lbs':
      case 'kg':
        temp = this.spellOutUnit(arr2,arr21,initUnit);
        initUnit = temp[0];
        returnUnit = temp[1];
        break;
      case 'mi':
      case 'km':
        temp = this.spellOutUnit(arr3,arr31,initUnit);
        initUnit = temp[0];
        returnUnit = temp[1];
        break;
      default:
        returnUnit = 'invalid unit';
    }

    result = initNum +" "+
            initUnit +" converts to "+
            returnNum.toFixed(5) +" "+
            returnUnit;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
