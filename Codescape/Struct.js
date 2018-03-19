/*
  A Struct is the basis of each organizational level of the city. THe purpose
    is to provide a common interface for dealing with each structural level of a
    Cityscape (like nodes in a tree) and provide utility functions for connecting,
    combining, and traversing the Cityscape.
*/

let idCounter = 1;

module.exports = class Struct{
  constructor(node, type){
    this.node = node;
    this.type = type;
    this.children = [];
    this.id = idCounter++;
  }

  add(struct){
    this.children.push(struct);
  }

  preorder(visit, ancestors){
    if(ancestors === undefined) ancestors = [];
    ancestors.push(this);
    visit(this, ancestors);
    if(this.children.length){
      this.children.forEach(child=>{
        child.preorder(visit, ancestors);
      })
    }
    ancestors.pop();
  }

  get width(){
    return (this.node.loc.end.line - this.node.loc.start.line)+1;
  }

  get height(){
    let min = Number.MAX_SAFE_INTEGER, max = -1;
    this.preorder(struct=>{
      if(struct.node.loc.start.column < min){
        min = struct.node.loc.start.column;
      }
      if(struct.node.loc.end.column > max){
        max = struct.node.loc.end.column;
      }
    });
    return max-min;
  }
}