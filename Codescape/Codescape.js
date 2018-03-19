
const Walker = require('../Walker/Walker');
const City = require('./City');
const Zone = require('./Zone');
const Block = require('./Block');
const Lot = require('./Lot');
const Structure = require('./Structure');
const Section = require('./Section');

module.exports = class Codescape{
  constructor(ast){
    this.ast = ast;
    this.walker = new Walker(this.ast);
    this.root = null;
    this.stack = [];
    let curr;
    this.walker.onPush(this.descend.bind(this));
    this.walker.onPop(this.ascend.bind(this));
    while((curr = this.walker.next()) !== null){
      console.log(this.walker.current.type);
      console.log(this.walker.stateValues.join(', '));
    }
  }

  descend(node){
    // console.log(`->: ${node.type}: [${node.range.join(', ')}]`);
    let newStruct = null;
    if(this.current.type === 'Lot'){
      // if the parent struct is a Lot, we need to build a new Structure
      newStruct = new Structure(node);
    }else if(this.current.type === 'Structure' || this.current.type === 'Section'){
      // if the parent type is a structure, it will handle its own construction
      newStruct = new Section(node);
    }else{
      switch(node.type){
        case 'Program':
          newStruct = new City(node);
          this.root = newStruct;
          break;
        case 'FunctionDeclaration':
          if(this.current instanceof Zone){
            newStruct = new Block(node);
          }else{
            newStruct = new Zone(node);
          }
          break;
        case 'VariableDeclaration':
        case 'ExpressionStatement':
        case 'ReturnStatement':
        case 'BinaryExpression':
        case 'UpdateExpression':
          newStruct = new Lot(node);
          break;
        case 'ForStatement':
        case 'BlockStatement':
          newStruct = new Zone(node);
          break;
      }
    }
    if(newStruct !== null){
      if(this.stack.length){
        this.current.add(newStruct);
      }
      this.stack.push(newStruct);
    }
  }

  ascend(node){
    // console.log(`<-: ${node.type}`);
    if(node === this.current.node){
      // If we're pulling a Structure off of the stack, its overall height 
      //  will be amplified by the relative depth in the program (it's ancestors)
      if(this.current.type === 'Structure'){
        this.current.setRelativeHeight(this.stack.slice(0,-1));
      }

      this.stack.pop();
    }
    if(node.type === 'Program' && this.stack.length){
      throw new Error('Program node popped without empty stack');
    }
  }

  get current(){
    if(!this.stack.length) return {};
    return this.stack[this.stack.length-1];
  }
}