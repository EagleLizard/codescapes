const Struct = require('./Struct');

module.exports = class Structure extends Struct {
  constructor(node){
    super(node, 'Structure');
    this.relativeHeight = 0;
  }

  setRelativeHeight(ancestors){
    ancestors.forEach(ancestor=>{
      if(ancestor.type === 'City' || ancestor.type === 'Block'){
        this.relativeHeight += 2;
      }else if(ancestor.type === 'Lot'){
        this.relativeHeight += 1;
      }else if(ancestor.type === 'Zone'){
        this.relativeHeight += 6;
      }else{
        this.relativeHeight += 4;
      }
    })
  }

  get height(){
    let modifier = 0;
    // Each structure's height will be modified by the complexity of it's parts.
    this.preorder(section=>{
      if(section.node.type === 'Literal'){
        modifier += (section.node.value+'').length;
      }else{
        modifier++;
      }
    });
    return super.height+ modifier + this.relativeHeight;
  }
}