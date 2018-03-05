
module.exports = {
  getFirstLetter: getFirstLetter,
  boolToYesNo: boolToYesNo,
  boolToYesNoTernary: boolToYesNoTernary,
  getAvg: getAvg
};

function getFirstLetter(str){
  return str[0];
}

function boolToYesNo(bool){
  if(bool){
    return 'yes';
  }else{
    return 'no';
  }
}

function boolToYesNoTernary(bool){
  let result;
  result = bool ? 'yes' : 'no';
  return result;
}

function getAvg(arr){
  let sum = 0;
  for(var i=0; i<arr.length; ++i){
    sum += arr[i];
  }
  return sum/arr.length;
}