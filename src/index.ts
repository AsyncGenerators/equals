import iterable from '@async-generators/iterable';

export default async function equal<T>(
  first: AsyncIterable<T> | Iterable<T>,
  second: AsyncIterable<T> | Iterable<T>,
  comparer: (a: T, b: T) => boolean | Promise<boolean>
    = function (a, b) { return a === b }
): Promise<boolean> {
  
  const ita = iterable(first, "first parameter is not iterable")[Symbol.asyncIterator]();
  const itb = iterable(second, "second parameter is not iterable")[Symbol.asyncIterator]();

  while (true) {

    let [na, nb] = await Promise.all([ita.next(), itb.next()]);

    if (na.done && nb.done) {
      return true;
    }

    if (na.done !== nb.done) {
      return false;
    }

    if (typeof na.value !== typeof nb.value) {
      return false;
    }

    if (await comparer(na.value, nb.value) === false) {
      return false;
    }
  }
}