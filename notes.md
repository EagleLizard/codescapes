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

