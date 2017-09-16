# equal
![logo](https://avatars1.githubusercontent.com/u/31987273?v=4&s=100)

compare two iterator sequences for equality 

[![NPM version][npm-image]][npm-url]
[![Travis Status][travis-image]][travis-url]
[![Travis Status][codecov-image]][codecov-url]

## Usage

_package requires a system that supports async-iteration, either natively or via down-compiling_

### Install
```
npm install @async-generators/equal --save
yarn add @async-generators/equal
```

this package's `main` entry points to a `commonjs` module dist. a `module` entry also points to a `es2015` module dist to be used by supported build-systems like webpack. 

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

Execute with the latest node.js: 

```
node --harmony-async-iteration example.js
```

[npm-url]: https://npmjs.org/package/@async-generators/equal
[npm-image]: https://img.shields.io/npm/v/@async-generators/equal.svg
[npm-downloads]: https://img.shields.io/npm/dm/@async-generators/equal.svg
[travis-url]: https://travis-ci.org/async-generators/equal
[travis-image]: https://img.shields.io/travis/async-generators/equal/master.svg
[codecov-url]: https://codecov.io/gh/async-generators/equal
[codecov-image]: https://codecov.io/gh/async-generators/equal/branch/master/graph/badge.svg

## Typescript

This library is fully typed and can be imported using: 

```ts
import equal from '@async-generators/equal');
```

If is also posible to directly execute your [properly configured](https://stackoverflow.com/a/43694282/1657476) typescript with [ts-node](https://www.npmjs.com/package/ts-node):

```
ts-node --harmony_async_iteration foo.ts
```
