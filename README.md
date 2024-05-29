# bdlang

A interpreter based language. currently only runnable in shell commands.

Define a variable using the following structures (currently only numbers are supported. Soon string values will also be supported.)
```
define variableName = value;
```
Currently this language can handle variable definitions and simple mathematics using the variable values also.

Example
```
define a = 50;
define b = 30;
define c = (a - b) / 5;
define result = c * 73; 
```
the interpreter works one line at a time. So the output will be:
```
50
30
4
292
```

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.8. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
