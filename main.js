const fs = require('fs');
const acorn = require('acorn');
const express = require('express');

const Codescape = require('./Codescape/Codescape');
const routes = require('./routes');


main();

function main(){
  let app = express();
  routes(app);
  // app.listen(3000);
  fs.readFile(__dirname+'/test/simpleFunctions.js', (err, data)=>{
    if(err) throw err;
    let fileStr = data.toString();
    let ast = acorn.parse(fileStr, {
      locations: true
    });
    
    let codescape = new Codescape(ast);
    let stack = [];
    console.log(codescape.root);
    codescape.preorder((struct, ancestors)=>{
      if(struct.type === 'Structure'){
        // console.log(struct.node);
        console.log(struct.height);
        // console.log(struct.node.loc);
        console.log(ancestors.map(ancestor=>ancestor.type+ancestor.id).join(', '))
      }
    });
  })
}

