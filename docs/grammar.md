# Grammar

## Differences from ECMAScript

### Previously invalid syntax

All error messages are taken from Microsoft Edge (V8 engine).

Numbers can now be member expression objects:

```javascript
123.toString();
// ❌ Uncaught SyntaxError: Invalid or unexpected token
// ✅ "123"
```

The exponentiation expression now respects the mathematical order of operations:

```javascript
-1**2
// ❌ Uncaught SyntaxError: Unary operator used immediately before exponentiation expression. Parenthesis must be used to disambiguate operator precedence
// ✅ -1
```

If statements now allow variable declarations:

```javascript
if (const v = randomBoolean()) return v;
// ❌ VM368:1 Uncaught SyntaxError: Unexpected identifier 'value'
// ✅ Returns `true`
```

The while statement now does not need a test:

```javascript
while {}
// ❌ Uncaught SyntaxError: Unexpected token '{'
// ✅ Loops until `break;` or `return;` is encountered
```
