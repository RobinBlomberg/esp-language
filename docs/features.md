# Features

## Range iterators

### Prior art

- The [Iterator.range](https://github.com/tc39/proposal-iterator.range) ECMAScript proposal
- Python's [range()](https://docs.python.org/3/library/functions.html#func-range) function

### Syntactic grammar

```ecmarkup
Range :
  start:Expression .. closed:=<opt> end:Expression
  start:Expression .. step:Expression .. closed:=<opt> end:Expression
```

### Examples

```js
for (const n in 0..10) {}

const array = [...0..2..=8];
// [0, 2, 4, 6, 8]

array.slice(0..3);
// [0, 2, 4]

if (n in 0..256) {}
```

## Measurements

The measurement data type represents a value with a unit.

### Prior art

- The [Measurement](https://developer.apple.com/documentation/foundation/measurement) struct in
  SwiftUI.

### Syntactic grammar

```ecmarkup
Measurement :
  value:Expression unit:Identifier
```

### Examples

```js
const animationDuration = 0.4s;
const borderRadius = 32px;
const frequency = 440 Hz;
const size = (borderRadius.value)cm;
```

### Runtime semantics

```ts
abstract class Measurement<Unit extends string> {
  value: number;
  unit: Unit;
}
```
