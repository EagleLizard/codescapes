const EventEmitter = require('events');

const WalkState = require('./WalkState');

module.exports = class Walker{
  constructor(ast){
    this.ast = ast;
    this.states = null; //keeps track of the current state objects
    this.stateValues = null;
    this.emitter = new EventEmitter();
  }

  next(){
    let node, lastNode;
    if(this.states === null){
      // null state reference indicates object was just initialized
      this.states = [];
      this.stateValues = [];
      this.pushState(this.ast);
      return this.current;
    }
    if(this.currentState === null){
      return null;
    }
    lastNode = this.currentState.node;
    node = this.currentState.next();
    if(node !== null){
      this.pushState(node);
      return this.current;
    }else{
      this.popState(lastNode);
      return this.next();
    }
    // switch(this.current.type){
    //   case 'Program':
    //     let node;
    //     while((node = this.currentState.next()) !== null){
    //       console.log(node);
    //     }
    //     break;
    // }
  }

  get currentState(){
    if(!this.states.length){
      return null;
    }
    return this.states[this.states.length-1];
  }

  get current(){
    if(this.currentState === null){
      return null;
    }
    return this.currentState.node;
  }

  get currentValue(){
    let node = this.current;
    switch(node.type){
      case 'Program':
        return 'Program';
      case 'ExpressionStatement':
        return 'Expression';
      case 'LogicalExpression':
        return 'Logical: '+node.operator;
      case 'CallExpression':
        return 'Call: (';
      case 'Identifier':
        return 'Identifier: '+node.name;
      case 'Literal':
        return 'Literal: '+node.value;
      case 'MemberExpression':
        return 'MemberExpression: ';
      case 'FunctionDeclaration':
        return 'FunctionDeclaration: (';
      case 'BlockStatement':
        return 'Block: {';
      case 'VariableDeclaration':
        return ''+node.kind;
      case 'VariableDeclarator':
        return '='
      case 'BinaryExpression':
        return 'Binary: '+node.operator;
      case 'ReturnStatement':
        return 'return: ';
      case 'AssignmentExpression':
        return '=';
      case 'ForStatement':
        return 'for(;;)';
      default:
        return 'not defined for type: '+node.type;
    }
  }

  pushState(node){
    this.states.push(new WalkState(node));
    this.stateValues.push(this.currentValue);
    this.emitter.emit('push', this.current);
  }

  popState(lastNode){
    this.states.pop();
    let popped = this.stateValues.pop();
    this.emitter.emit('pop', lastNode);
  }
  
  onPush(cb){
    this.emitter.on('push', cb);
  }

  onPop(cb){
    this.emitter.on('pop', cb);
  }
}