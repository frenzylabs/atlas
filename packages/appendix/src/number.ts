export {};

declare global {
  interface Number {
    toArray(): Array<number> | null;
  }
}

Number.prototype.toArray = function() {
  return Array.from({length: this}, (v, k) => k);
}