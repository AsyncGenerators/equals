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
      if (typeof na.value === typeof undefined && typeof nb.value === typeof undefined) {
        return true;
      }
      if (typeof na.value !== typeof nb.value) {
        return false;
      }
      return comparer(na.value, nb.value);
    }
    else {
      if (typeof na.value !== typeof nb.value)
        return false;
      if (comparer(na.value, nb.value) === false) {
        return false;
      }
    }
    if (na.done !== nb.done) {
      if (na.done) {
        return na.done === (await itb.next()).done;
      } else if (nb.done) {
        return nb.done === (await ita.next()).done;
      }
    }
  }
}