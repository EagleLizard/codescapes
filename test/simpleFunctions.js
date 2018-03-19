
let a = sum([1,2,3,4,5]);
let b = sum([2,2,2,2,2,2,2]);
let c = sum(['a', 'b', 'c', 'd', 'e']);

console.log(a);//15
console.log(b);//14
console.log(c);//"0abcde"

function sum(arr){
  arr = arr.slice();
  let soFar = 0;
  for(let i=0; i<arr.length; ++i){
    soFar += arr[i];
  }
  return soFar;
}
