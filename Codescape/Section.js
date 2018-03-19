const Struct = require('./Struct');

module.exports = class Section extends Struct{
  constructor(node){
    super(node, 'Section');
  }
}