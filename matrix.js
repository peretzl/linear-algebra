'use strict';
class Matrix extends Array {
  

  column(n) {

  }

  row(n) {
    // bug, might be useful for transpose
    // return new Matrix(...(this[n].map(num => [num])));
    return new Matrix(this[n]);
  }

  // flipping it on its side
  transpose() {}

  get valid() {
    return this.every(child => child instanceof Array)
      && this.every(row => row.length === this[0].length)
      && this.every(row => row.every(n => typeof n === 'number' ))
      // @todo
      // && this.length && this[0].length
  }

  get dimensions() {
    // rows x cols
    return [this.length, this[0].length];
  }
}

module.exports = Matrix;