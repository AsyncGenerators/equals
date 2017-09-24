import equal from '../src';
import { expect } from 'chai';

async function delay(duration){
  return new Promise(r=>setTimeout(r, duration));
}

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

  it("source should not equal other when one returns", async () => {
    let a = async function* () {
      yield 1; yield 2; yield 3;
    }
    let b = async function* () {
      yield 1; yield 2; return 3;
    }
    let result = await equal(a(), b());

    expect(result).to.be.false;
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

  it("source should not equal other if different type", async () => {
    let a = async function* () {
      yield { a: 1 };
    }
    let b = async function* () {
      yield 1;
    }
    let result = await equal(a(), <any>b());

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

  it("source pass all items to comparer", async () => {
    let a = async function* () {
      yield { a: 1 }; yield { a: 2 }; yield { a: 3 };
    }
    let comp = []
    let result = await equal(a(), a(),
      (x, y) => {
        comp.push(x);
        return x.a === y.a
      });

    expect(result).to.be.true;
    expect(comp).to.deep.eq([{ a: 1 }, { a: 2 }, { a: 3 }]);
  })

  it("should support sync iterators", async () => {
    let a = function* () {
      yield 1; yield 2;
    }
    let b = function* () {
      yield 1; yield 2;
    }
    let result = await equal(a(), b());

    expect(result).to.be.true;
  })

  it("should support async comparer", async () => {
    let a = function* () {
      yield 1; yield 2;
    }
    let b = function* () {
      yield 1; yield 2;
    }
    let result = await equal(a(), b(), async(a,b)=>{
      await delay(10);return a == b;
    });

    expect(result).to.be.true;
  })

  it("should throw error if first is not iterable", async () => {
    let error: Error
    try {
      await equal(<any>{}, [])
    } catch (err) {
      error = err.message
    }
    expect(error).to.be.eq("first parameter is not iterable");
  })

  it("should throw error if second is not iterable", async () => {
    let error: Error;
    try {
      await equal([], <any>{})
    } catch (err) {
      error = err.message;
    }
    expect(error).to.be.eq("second parameter is not iterable");
  })

  it("should support executing and awaiting both iterators at the same time. ", async () => {

    let resolve;
    let promise = new Promise<number>(r => resolve = r);

    let first = async function* () {
      yield await promise;
    }

    let second = async function* () {
      resolve(1); yield 1;
    }

    let result = await equal(first(), second());

    expect(result).to.be.true;
  })
})