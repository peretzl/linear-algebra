'use strict';
const assert = require('assert');
const Matrix = require('../matrix');
describe('Matrix', () => {
  describe('validity', () => {
    describe('type checking', () => {
      it('should be false if children are not arrays', () => {
        const m = new Matrix(1,2,3);
        assert(m.valid === false);
      });
      xit('should be true if all children are arrays', () => {
        const m = new Matrix([1],[1]);
        assert(m.valid === true);
      })
    });

    describe('row length consistency', () => {
      it('should be true if rows have same lengths', () => {
        const m = new Matrix([1,3],[1,8]);
        assert(m.valid === true);
      });

      it('should be false if rows have different lengths', () => {
        const m = new Matrix([1,3],[1,8,0]);
        assert(m.valid === false);
      });
    });

    describe('type checking', () => {
      it('should be false if rows do not all have numbers', () => {
        const m = new Matrix([1,3],[1,'foo']);
        assert(m.valid === false);
      });

      it('should be true if rows do all have numbers', () => {
        const m = new Matrix([1,3],[1,3]);
        assert(m.valid === true);
      });
    });
  });

  describe('dimensions', () => {
    it('should return the correct dimensions', () => {
      const m = new Matrix([1,3,4],[1,3,9]);
      assert(m.dimensions[0] === 2);
      assert(m.dimensions[1] === 3);

      const m2 = new Matrix([1,3,4,5],[1,3,9,5],[1,1,1,1]);
      assert(m2.dimensions[0] === 3);
      assert(m2.dimensions[1] === 4);
    })
  });

  describe('methods', () => {
    let m;
    beforeEach(() => {
      m = new Matrix([1,3,4],[1,3,9]);
    })
    describe('row', () => {


      it('should return a matrix', () => {
        assert(m.row(1) instanceof Matrix);
      });

      it('is valid', () => {
        assert(m.row(1).valid);
      });

      it('has the correct dimensions', () => {
        assert(m.row(1).dimensions[0] === 1);
        assert(m.row(1).dimensions[1] === 3);
      })

      it('should have correct data', () => {
        assert(m.row(1)[0][0] === 1);
        assert(m.row(1)[0][2] === 4);
      });
    });

    describe('cols', () => {
      
      it('should return a matrix', () => {
        assert(m.column(1) instanceof Matrix);
      });

      it('is valid', () => {
        assert(m.column(1).valid);
      });

      it('has the correct dimensions', () => {
        assert(m.column(1).dimensions[0] === 2);
        assert(m.column(1).dimensions[1] === 1);
      });

      it('has the correct values', () => {
        assert(m.column(2)[0][0] === 3);
        assert(m.column(2)[1][0] === 3);
      });

    })

    // describe('forEachColumn');
    // describe('forEachRow');
    describe('equals', () => {
      it('should return false if the two have different row lengths', () => {
        const m1 = new Matrix([1,2,3],[4,5,6]);
        const m2 = new Matrix([1,2,3],[4,5,6],[4,5,6]);
        assert(!m1.equals(m2));
      });

      it('should return false if the two have different row column lengths', () => {
        const m1 = new Matrix([1,3],[4,6]);
        const m2 = new Matrix([1,3,9],[4,6,8]);
        assert(!m1.equals(m2));
      });

      it('should return false if the two have the same dimensions but different values', () => {
        const m1 = new Matrix([1,3],[4,6]);
        const m2 = new Matrix([2,3],[4,7]);
        assert(!m1.equals(m2));
      });

      it('should return true if the two have the same dimensions and the same values', () => {
        const m1 = new Matrix([1,3],[4,6]);
        const m2 = new Matrix([1,3],[4,6]);
        assert(m1.equals(m2));
      });
    });
    
    describe('transpose', () => {
      let transposed;
      beforeEach(() => {
        transposed = m.transpose();
      })
      it('has correct dimensions', () => {
        assert(transposed.dimensions[0] === 3);
        assert(transposed.dimensions[1] === 2);
      });

      it('is valid', () => {
        assert(m.transpose().valid);
      });

      it('transposed twice is the same as itself', () => {
        assert(m.transpose().transpose().equals(m))
      })
    });

    describe('scale', () => {
      let scalled;
      beforeEach(() => {
        scalled = m.scale(2);
      });

      it('should be a matrix', () => {
        assert(scalled instanceof Matrix)
      });

      it('should be valid', () => {
        assert(scalled.valid);
      });

      it('should have the correct values', () => {
        scalled.equals(new Matrix([2,6,8],[2,6,18]));
      })
    });

    describe('add', () => {
      let m1, m2, result;
      beforeEach(() => {
        m1 = new Matrix([1,3,4],[1,3,9]);
        m2 = new Matrix([2,1,6],[7,3,9]);
        result = m1.add(m2);
      });

      it('should be a matrix', () => {
        assert(result instanceof Matrix);
      });

      it('should be valid', () => {
        assert(result.valid);
      });

      it('should have the correct dimensions', () => {
        assert(result.matchDimensions(m1));
        assert(result.matchDimensions(m2));
      });

      it('should have the correct values', () => {
        assert(result.equals(new Matrix([3,4,10],[8,6,18])));
      });
    });

    describe('subtract', () => {
      let m1, m2, result;
      beforeEach(() => {
        m1 = new Matrix([1,3,4],[1,3,9]);
        m2 = new Matrix([2,1,6],[7,3,9]);
        result = m1.subtract(m2);
      });

      it('should have the correct values', () => {
        assert(result.equals(new Matrix([-1,2,-2],[-6,0,0])));
      })
    })
  });
});

// A has dimensions m x n
// B has dims n x p
// only then does AB exist, 
// and it will have dims m x p
// 
// only if m = p, would BA exist
// 
// question
// n x m
// p x n
// illigal
// 
// columns of the first must equal the rows of the second
// 
// a b c      x      value1 = ax + by + cz
// d e f      y   =  value2 = dx + ey + fz
//            z
// 2 3   3 1
// result 2 1
// 
// 
// 
// 
// a b      w x       [aw + by, ax + bz]
// c d      y z   =   [cw + dy, cx + dz]

// c d , w y
// 
// c d , x z



      // m = new Matrix([1,3,4],[1,3,9]);
      // otherM = new Matrix([2,1,6],[7,3,9]);
      // m + other M = new Matrix([3,4,10],[8,6,18])

