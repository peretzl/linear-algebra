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
    describe('row', () => {
      it('should return a matrix', () => {
        const m = new Matrix([1,3,4],[1,3,9]);
        assert(m.row(1) instanceof Matrix);
        
      });
    });
  });
});


