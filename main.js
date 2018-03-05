const fs = require('fs');
const acorn = require('acorn');

const Walker = require('./Walker/Walker');

main();

function main(){
  let fileStr = fs.readFileSync(__dirname+'/test/hello.js').toString();
  let ast = acorn.parse(fileStr);
  let walker = new Walker(ast);

  let curr;
  
  while((curr = walker.next()) !== null){
    console.log(walker.stateValues.join(', '));
  }
}

