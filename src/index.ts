export default async function equal<T>(
  first: AsyncIterable<T>,
  second: AsyncIterable<T>,
  comparer: (a: T, b: T) => boolean
    = function (a, b) { return a === b }
): Promise<boolean> {

  const ita = first[Symbol.asyncIterator]();
  const itb = second[Symbol.asyncIterator]();

  while (true) {
    let na = await ita.next();
    let nb = await itb.next();

    if (na.done && nb.done) {
      return true;
    }

    if (na.done !== nb.done) {
      return false;
    }

    if (typeof na.value !== typeof nb.value) {
      return false;
    }

    if (comparer(na.value, nb.value) === false) {
      return false;
    }
  }
}