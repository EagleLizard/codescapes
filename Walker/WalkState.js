module.exports = class WalkState{
  constructor(node){
    this.node = node;
    this.children = getChildren(node);
    this.idx = 0;
  }

  next(){
    if(!this.children){
      console.log(this.node);
      throw new Error(`Missing children for ${this.node.type}`);
    }
    if(!this.children.length || (this.idx > this.children.length-1)){
      return null; // null return indicates a 'done' state
    }
    return this.children[this.idx++];
  }
}

function getChildren(node){
  switch(node.type){
    case 'Program':
      return node.body.slice();
    case 'ExpressionStatement':
      return [node.expression];
    case 'LogicalExpression':
      return [node.left, node.right];
    case 'CallExpression':
      return [node.callee, ...node.arguments];
    case 'Identifier':
    case 'Literal':
      return [];
    case 'MemberExpression':
      return [node.object, node.property];
    case 'FunctionDeclaration':
      return [node.id, ...node.params, node.body];
    case 'BlockStatement':
      return node.body.slice();
    case 'VariableDeclaration':
      return node.declarations.slice();
    case 'VariableDeclarator':
      return [node.id, node.init];
    case 'BinaryExpression':
      return [node.left, node.right];
    case 'ReturnStatement':
      return [node.argument];
    case 'ArrayExpression':
      return node.elements;
    case 'AssignmentExpression':
      return [node.left, node.right];
    case 'ForStatement':
      return [node.init, node.test, node.update, node.body];
    case 'UpdateExpression':
      return [node.argument];
  }
}