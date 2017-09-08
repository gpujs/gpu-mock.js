const mockGpu = require('../');
const assert = require('assert');

describe('mockGpu', () => {
  describe('1d row iteration', () => {
    it('works', () => {
      const results = mockGpu(function() {
        return this.thread.x;
      }, {
        output: [5]
      })();

      assert.deepEqual(results, [0,1,2,3,4]);
    });
  });

  describe('2d matrix iteration', () => {
    it('works', () => {
      const results = mockGpu(function() {
        return this.thread.x + this.thread.y;
      }, {
        output: [5, 5]
      })();

      assert.deepEqual(results,
        [
          [0,1,2,3,4],
          [1,2,3,4,5],
          [2,3,4,5,6],
          [3,4,5,6,7],
          [4,5,6,7,8]
        ]
      );
    });
  });

  describe('3d cube iteration', () => {
    it('works', () => {
      const results = mockGpu(function() {
        return this.thread.x + this.thread.y + this.thread.z;
      }, {
        output: [5, 5, 5]
      })();

      assert.deepEqual(results,
        [
          [
            [0,1,2,3,4],
            [1,2,3,4,5],
            [2,3,4,5,6],
            [3,4,5,6,7],
            [4,5,6,7,8]
          ],
          [
            [1,2,3,4,5],
            [2,3,4,5,6],
            [3,4,5,6,7],
            [4,5,6,7,8],
            [5,6,7,8,9]
          ],
          [
            [2,3,4,5,6],
            [3,4,5,6,7],
            [4,5,6,7,8],
            [5,6,7,8,9],
            [6,7,8,9,10]
          ],
          [
            [3,4,5,6,7],
            [4,5,6,7,8],
            [5,6,7,8,9],
            [6,7,8,9,10],
            [7,8,9,10,11]
          ],
          [
            [4,5,6,7,8],
            [5,6,7,8,9],
            [6,7,8,9,10],
            [7,8,9,10,11],
            [8,9,10,11,12]
          ]
        ]
      );
    });
  });
});
