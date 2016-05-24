'use strict';
class Matrix extends Array {
  

  column(n) {
    return new Matrix(...(this.map(row => [row[n-1]])));
  }

  row(n) {
    // bug, might be useful for transpose
    // return new Matrix(...(this[n].map(num => [num])));
    return new Matrix(this[n-1]);
  }

  forEachColumn(fn) {
    for(var i = 1; i <= this.dimensions[1]; i++) {
      fn(this.column(i));
    }
  }
  forEachRow(fn) {
    for(var i = 1; i <= this.dimensions[0]; i++) {
      fn(this.row(i));
    }
  }

  // flipping it on its side
  transpose() {
    const newMatrix = new Matrix();
    this.forEachColumn(col => {
      newMatrix.push(col.map(row => row[0]));
    });

    return newMatrix;
  }

  equals(otherMatrix) {
    return this.matchDimensions(otherMatrix)
      && this.every((row, i) => {
          return row.every((val, j) => {
            return otherMatrix[i][j] === val;
          });
    });
  }

  scale(n) {
    return new Matrix(...this.map(row => {
      return row.map(value => value * n);
    }));
  }

  matchDimensions(otherMatrix) {
    return this.dimensions[0] === otherMatrix.dimensions[0]
      && this.dimensions[1] === otherMatrix.dimensions[1];
  }

  add(otherMatrix) {
    if(!this.matchDimensions(otherMatrix)) {
      throw new Error('matrix dimensions must match to add');
    }
    return new Matrix(...this.map((row, i) => {
      return row.map((value, j) => {
        return value + otherMatrix[i][j];
      });
    }));
  }

  subtract(otherMatrix) {
    return this.add(otherMatrix.scale(-1));
  }

  multiply(otherMatrix) {

  }

  static innerProduct(row, col) {

  }


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