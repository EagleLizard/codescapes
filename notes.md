# Node Type Handling

This doc is for notes determining how to construct the codescape based on types.

## ClassDeclaration

We know some things about the class syntax that can be used to generate certain structures.

A class is a city or city block.

Classes cannot be nested and must be defined as bottom level constructs.

  * A class can be treated as a non-recursive structure 
    * Meaning: A class will not appear inside of another class
  * MethodDefinition nodes exist as bottom-level, non-recursive constructs within a class

## MethodDefinition

MethodDefinion nodes exist as bottom-level non-recursive structures inside of a class.

  * If a class is a single city section, a MethodDefinition can be treated like a city block
    * The structures inside of each MethodDefinition block would be based on the expressions inside of the method's codeblock

# City Structures

These are the rough definitions of the different zones, blocks, and structures that make up the city (AKA Codescape).

The city is organized into a distinct hierarchy. The hierarchy roughly maps to a hierarchy in Urban planning or city development.

* __City__ 
  * This is the outermost level of the Codescape. For JavaScript, this maps to the `Program` node of the AST.
* __Zone__
  * This is the most generic broad classification of a code region. In a simple program, a `Zone` may represent a program-level function.
  * Because of its generic nature, a `Zone` does not explicitly disallow nesting. This is to accommodate for deeply nested function declarations, or anonymous function declarations.
* __Block__ 
  * Ideally a block encapsulates a collection of lower-level `Struct` objects that would be directly rendered as opposed to being used for organization.
* __Lot__
  * The lot is a container for either a building or non-building `Struct`. When traversing the AST, once a `Lot` is constructed all nested expressions/statements are used to construct a renderable structure (EG skyscraper).
* __Structure__
  * Building or non-building. Can encapsulate any number of inner nodes, however for display purposes this is the "leaf" node. The internal structure is determined by the number and type of nodes contained.
* __Section__
  * Once a `Structure` is being constructed from its child nodes, each child node is defined as a `Section`, representing one piece of the overall `Structure`.

# Sources

List of external resources used in building ideas:
* https://en.wikipedia.org/wiki/List_of_building_types
  * Different types of buildings

# Abstract Scoping Mapping

Organizing any Codescape based on any given scope and it's containing scopes is difficult.

This is primarily because any given scope can have a potentially infinite number of inner scopes.

Any given group of expressions inside of a contained scope are potentially difficult to visualize as well, because those expressions may be siblings to scopes that have more nested scopes inside. How should this expression be organized relatively to a very similar expression in a more deeply nested scope?

For example:
```javascript
var a = 1;
var b = 2;
var c = a + b;
console.log(a+'+'+b+'='+c);
```

One could imagine that variables a, b, and c are considered solitary structures of similar size in the same city block. For the sake of simplicity, let's say they are houses. The right-hand side of the declaration of variable c is a bit more complicated, so let's say that it will be a house with multiple stories.

The console.log expression contains many statements, but besides a MemberExpression it isn't much more complicated. It could be a park, a similar house but perhaps wider, a gas station, or even a billboard.

Here we have a simple view of a Codescape: 2 houses of similar size, 1 two-story house, and a gas station. These are all contained within the logical scope of the program, so they should appear next to eachother in one block.

## Introducing complexity
The following example also presents a relatively simple approach:
```javascript
function min(a,b){
  if(a < b){
    return a;
  }else{
    return b;
  }
}
function max(a,b){
  if(a > b){
    return a;
  }else{
    return b;
  }
}
```

Again we are presented with the program as a scope, but inside we can see there are two discrete scope containing expressions: the function blocks `min` and `max`.

Again the approach is straightforward. Two clear scopes, with expressions inside of them. This may be interpreted as two blocks, each with 2-3 structures each representing the `if` statements and `return` expressions.

If we have more complex nesting the solution doesn't come out as straightforward:
```javascript

```
