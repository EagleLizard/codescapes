
const Struct = require('./Struct');

/*
  The City should act as the root node of the Codescape. 
*/
module.exports = class City extends Struct{
  constructor(node){
    super(node, 'City');
  }
}