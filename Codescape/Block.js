
const Struct = require('./Struct');

module.exports = class Block extends Struct{
  constructor(node){
    super(node, 'Block');
  }
}