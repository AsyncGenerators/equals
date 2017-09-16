# equal
![logo](https://avatars1.githubusercontent.com/u/31987273?v=4&s=100)

compare two async-iterator sequences for equality

[![NPM version][npm-image]][npm-url]
[![Travis Status][travis-image]][travis-url]
[![Travis Status][codecov-image]][codecov-url]

## Install

```
npm install @async-generators/equal --save
yarn add @async-generators/equal
```

## Usage

requires a system that supports async-iteration, either natively or via down-compiling.  

## Example

**example.js**
```js
const equal = require('@async-generators/equal').default;

async function* first() {
  yield 1; yield 2; yield 3;
}
async function* second() {
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
