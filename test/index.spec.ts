import { equal } from '../src';
import { expect } from 'chai';

describe("@async-generator/equals", () => {
  it("source should equal itself", async () => {
    let a = async function* () {
      yield 1; yield 2; yield 3;
    }
    let result = await equal(a(), a());

    expect(result).to.be.true;
  })

  it("source should equal other", async () => {
    let a = async function* () {
      yield 1; yield 2; yield 3;
    }
    let b = async function* () {
      yield 1; yield 2; yield 3;
    }
    let result = await equal(a(), b());

    expect(result).to.be.true;
  })

  it("source should not equal other with different values", async () => {
    let a = async function* () {
      yield 1; yield 2; yield 3;
    }
    let b = async function* () {
      yield 1; yield 2; yield 4;
    }
    let result = await equal(a(), b());

    expect(result).to.be.false;
  })

  it("source should not equal other with more values", async () => {
    let a = async function* () {
      yield 1; yield 2; 
    }
    let b = async function* () {
      yield 1; yield 2; yield 4; yield 4;
    }
    let result = await equal(a(), b());

    expect(result).to.be.false;
  })

  it("source should not equal other with less values", async () => {
    let a = async function* () {
      yield 1; yield 2; yield 3; yield 4;
    }
    let b = async function* () {
      yield 1; yield 2; 
    }
    let result = await equal(a(), b());

    expect(result).to.be.false;
  })

  it("source should equal other when return", async () => {
    let a = async function* () {
      yield 1; yield 2; yield 3;
    }
    let b = async function* () {
      yield 1; yield 2; return 3;
    }
    let result = await equal(a(), b());

    expect(result).to.be.true;
  })

  it("source should equal other when both return", async () => {
    let a = async function* () {
      yield 1; yield 2; return 3;
    }
    let b = async function* () {
      yield 1; yield 2; return 3;
    }
    let result = await equal(a(), b());

    expect(result).to.be.true;
  })

  it("source objects should not equal other objects", async () => {
    let a = async function* () {
      yield { a: 1 }; yield { a: 2 }; yield { a: 3 };
    }
    let b = async function* () {
      yield { a: 1 }; yield { a: 2 }; yield { a: 3 };
    }
    let result = await equal(a(), b());

    expect(result).to.be.false;
  })
  it("source objects should equal other objects with custom comparison", async () => {
    let a = async function* () {
      yield { a: 1 }; yield { a: 2 }; yield { a: 3 };
    }
    let b = async function* () {
      yield { a: 1 }; yield { a: 2 }; yield { a: 3 };
    }
    let result = await equal(a(), b(), (x, y) => x.a === y.a);

    expect(result).to.be.true;
  })
})