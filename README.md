# equal
![logo](https://avatars1.githubusercontent.com/u/31987273?v=4&s=110)

compare two iterator sequences for equality 

[![NPM version][npm-image]][npm-url]
[![Travis Status][travis-image]][travis-url]
[![Travis Status][codecov-image]][codecov-url]

### Install
```
npm install @async-generators/equal --save
yarn add @async-generators/equal
```

This package's `main` entry points to a `commonjs` dist. 
The `module` entry points to a `es2015` module dist. Both require require native async-generator support, or be down-compiled with a webpack loader. 

## Api

### equal(first, second [, comparer])

<code>equal()</code> compares two [sync/async] iterable sequences and returns true if: 

* both yield objects of the same <code>typeof</code>
* both yield equal items, where <code>comparer(a, b) == true</code>
* both yield equal items in the same order. 
* both sequence yield the same number of items

Both <code>first</code> and <code>second</code> must have either a `[Symbol.asyncIterator]` or `[Symbol.iterator]` property. If they have both then `[Symbol.asyncIterator]` is used. 

## Example

example.js
```js
const equal = require('@async-generators/equal').default;

async function* first() {
  yield 1; yield 2; yield 3;
}
function* second() {
  yield 1; yield 2; yield 3;
}

async function main(){
  let result = await equal(first(), second());
  
  console.log("equal:", result);
}

main();
```

Execute with node.js 9 and above:  

```
node --harmony example.js
```

## Typescript

This library is fully typed and can be imported using: 

```ts
import equal from '@async-generators/equal');
```

It is also possible to directly execute your [properly configured](https://stackoverflow.com/a/43694282/1657476) typescript with [ts-node](https://www.npmjs.com/package/ts-node):

```
ts-node --harmony foo.ts
```

[npm-url]: https://npmjs.org/package/@async-generators/equal
[npm-image]: https://img.shields.io/npm/v/@async-generators/equal.svg
[npm-downloads]: https://img.shields.io/npm/dm/@async-generators/equal.svg
[travis-url]: https://travis-ci.org/async-generators/equal
[travis-image]: https://img.shields.io/travis/async-generators/equal/master.svg
[codecov-url]: https://codecov.io/gh/async-generators/equal
[codecov-image]: https://codecov.io/gh/async-generators/equal/branch/master/graph/badge.svg
