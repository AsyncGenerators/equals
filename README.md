# equal
![logo](https://avatars1.githubusercontent.com/u/31987273?v=4&s=100)

compare two async-iterator sequences for equality

## Install
```
yarn add @async-generators/equal
```

## Usage

```ts
import equal from '../src';

async function* first() {
  yield 1; yield 2; yield 3;
}
async function* second() {
  yield 1; yield 2; yield 3;
}

let result = await equal(first(), second())
```

