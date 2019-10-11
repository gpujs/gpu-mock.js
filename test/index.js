const assert = require('assert');
const { gpuMock } = require('../');

describe('gpuMock', () => {
  describe('options', () => {
    describe('.constants', () => {
      it('is set directly from options', () => {
        const kernelFunction = function() {};
        const constants = {};
        const kernel = gpuMock(kernelFunction, {
          output: {
            x: 7
          },
          constants
        });
        assert.equal(kernel.constants, constants);
      });
    });
    describe('.context', () => {
      it('is set directly from options', () => {
        const kernelFunction = function() {};
        const context = {};
        const kernel = gpuMock(kernelFunction, {
          output: {
            x: 7
          },
          context
        });
        assert.equal(kernel.context, context);
      });
    });
    it('sets up kernel._imageData if methods are available', () => {
      const kernelFunction = function() {};
      const imageData = { data: [] };
      const context = {
        createImageData: () => imageData
      };
      const kernel = gpuMock(kernelFunction, {
        output: {
          x: 7,
          y: 7,
        },
        context,
        graphical: true
      });
      assert.equal(kernel._imageData, imageData);
    });
    describe('.canvas', () => {
      it('is set directly from options', () => {
        const kernelFunction = function() {};
        const canvas = {};
        const kernel = gpuMock(kernelFunction, {
          output: {
            x: 7
          },
          canvas
        });
        assert.equal(kernel.canvas, canvas);
      });
    });
    describe('.output 1D', () => {
      it('can use array to set output', () => {
        const kernelFunction = function() {};
        const kernel = gpuMock(kernelFunction, {
          output: [7]
        });
        assert.deepEqual(kernel.output, {
          x: 7,
        });
      });
      it('can use object to set output', () => {
        const kernelFunction = function() {};
        const kernel = gpuMock(kernelFunction, {
          output: {
            x: 7
          }
        });
        assert.deepEqual(kernel.output, {
          x: 7
        })
      });
    });
    describe('.output 2D', () => {
      it('can use array to set output', () => {
        const kernelFunction = function() {};
        const kernel = gpuMock(kernelFunction, {
          output: [7,6]
        });
        assert.deepEqual(kernel.output, {
          y: 6,
          x: 7,
        });
      });
      it('can use object to set output', () => {
        const kernelFunction = function() {};
        const kernel = gpuMock(kernelFunction, {
          output: {
            y: 6,
            x: 7
          }
        });
        assert.deepEqual(kernel.output, {
          y: 6,
          x: 7,
        });
      });
    });
    describe('.output 3D', () => {
      it('can use array to set output', () => {
        const kernelFunction = function() {};
        const kernel = gpuMock(kernelFunction, {
          output: [7,6,5]
        });
        assert.deepEqual(kernel.output, {
          z: 5,
          y: 6,
          x: 7,
        })
      });
      it('can use object to set output', () => {
        const kernelFunction = function() {};
        const kernel = gpuMock(kernelFunction, {
          output: {
            z: 5,
            y: 6,
            x: 7
          }
        });
        assert.deepEqual(kernel.output, {
          z: 5,
          y: 6,
          x: 7,
        });
      });
    });
  });
  describe('api methods', () => {
    describe('.setOutput()', () => {
      it('sets kernel.output', () => {
        const kernel = gpuMock(function() {});
        kernel.setOutput([5]);
        assert.equal(kernel.output.x, 5);
      });
      describe('when used with kernel.graphical = true', () => {
        it('sets graphical settings and kernel.output', () => {
          const kernel = gpuMock(function() {}, { graphical: true });
          kernel.setOutput([5,5]);
          assert.equal(kernel.output.x, 5);
          assert.equal(kernel._imageData.data.length, 5 * 5 * 4);
          assert.equal(kernel._colorData.length, 5 * 5 * 4);
        });
      });
    });
    describe('.toJSON()', () => {
      it('throws', () => {
        const kernel = gpuMock(function() {});
        assert.throws(() => {
          kernel.toJSON();
        });
      });
    });
    describe('.setConstants()', () => {
      it('sets value', () => {
        const constants = {};
        const kernel = gpuMock(function() {});
        assert.equal(kernel.setConstants(constants), kernel);
        assert.equal(kernel.constants, constants);
      });
    });
    describe('.setGraphical()', () => {
      it('sets value', () => {
        const graphical = {};
        const kernel = gpuMock(function() {});
        kernel.setGraphical(graphical);
        assert.equal(kernel.graphical, graphical);
      });
    });
    describe('.setCanvas()', () => {
      it('sets value', () => {
        const canvas = {};
        const kernel = gpuMock(function() {});
        kernel.setCanvas(canvas);
        assert.equal(kernel.canvas, canvas);
      });
    });
    describe('.setContext()', () => {
      it('sets value', () => {
        const context = {};
        const kernel = gpuMock(function() {});
        assert.equal(kernel.setContext(context), kernel);
        assert.equal(kernel.context, context);
      });
    });
    describe('.exec()', () => {
      it('resolves async', async () => {
        const kernel = gpuMock(function() {
          return 1;
        }, { output: [1] });
        const result = await kernel.exec();
        assert.deepEqual(result, new Float32Array([1]));
      });
      it('resolves async failure', async () => {
        const kernel = gpuMock(function() {
          throw 'failure';
        }, { output: [1] });
        try {
          await kernel.exec();
        } catch(e) {
          assert.equal(e, 'failure');
        }
      });
    });
    describe('.setWarnVarUsage()', () => {
      it('can be called and return kernel', () => {
        const kernel = gpuMock(function() {});
        assert.equal(kernel.setWarnVarUsage(), kernel);
      });
    });
    describe('.setOptimizeFloatMemory()', () => {
      it('can be called and return kernel', () => {
        const kernel = gpuMock(function() {});
        assert.equal(kernel.setOptimizeFloatMemory(), kernel);
      });
    });
    describe('.setArgumentTypes()', () => {
      it('can be called and return kernel', () => {
        const kernel = gpuMock(function() {});
        assert.equal(kernel.setArgumentTypes(), kernel);
      });
    });
    describe('.setConstantTypes()', () => {
      it('can be called and return kernel', () => {
        const kernel = gpuMock(function() {});
        assert.equal(kernel.setConstantTypes(), kernel);
      });
    });
    describe('.setStrictIntegers()', () => {
      it('can be called and return kernel', () => {
        const kernel = gpuMock(function() {});
        assert.equal(kernel.setStrictIntegers(), kernel);
      });
    });
    describe('.setDynamicOutput()', () => {
      it('can be called and return kernel', () => {
        const kernel = gpuMock(function() {});
        assert.equal(kernel.setDynamicOutput(), kernel);
      });
    });
    describe('.setDynamicArguments()', () => {
      it('can be called and return kernel', () => {
        const kernel = gpuMock(function() {});
        assert.equal(kernel.setDynamicArguments(), kernel);
      });
    });
    describe('.setUseLegacyEncoder()', () => {
      it('can be called and return kernel', () => {
        const kernel = gpuMock(function() {});
        assert.equal(kernel.setUseLegacyEncoder(), kernel);
      });
    });
    describe('.setHardcodeConstants()', () => {
      it('can be called and return kernel', () => {
        const kernel = gpuMock(function() {});
        assert.equal(kernel.setHardcodeConstants(), kernel);
      });
    });
    describe('.setTactic()', () => {
      it('can be called and return kernel', () => {
        const kernel = gpuMock(function() {});
        assert.equal(kernel.setTactic(), kernel);
      });
    });
    describe('.setDebug()', () => {
      it('can be called and return kernel', () => {
        const kernel = gpuMock(function() {});
        assert.equal(kernel.setDebug(), kernel);
      });
    });
    describe('.setLoopMaxIterations()', () => {
      it('can be called and return kernel', () => {
        const kernel = gpuMock(function() {});
        assert.equal(kernel.setLoopMaxIterations(), kernel);
      });
    });
    describe('.setPipeline()', () => {
      it('can be called and return kernel', () => {
        const kernel = gpuMock(function() {});
        assert.equal(kernel.setPipeline(), kernel);
      });
    });
    describe('.setPrecision()', () => {
      it('can be called and return kernel', () => {
        const kernel = gpuMock(function() {});
        assert.equal(kernel.setPrecision(), kernel);
      });
    });
    describe('.setOutputToTexture()', () => {
      it('can be called and return kernel', () => {
        const kernel = gpuMock(function() {});
        assert.equal(kernel.setOutputToTexture(), kernel);
      });
    });
    describe('.setImmutable()', () => {
      it('can be called and return kernel', () => {
        const kernel = gpuMock(function() {});
        assert.equal(kernel.setImmutable(), kernel);
      });
    });
    describe('.setFunctions()', () => {
      it('can be called and return kernel', () => {
        const kernel = gpuMock(function() {});
        assert.equal(kernel.setFunctions(), kernel);
      });
    });
    describe('.setNativeFunctions()', () => {
      it('can be called and return kernel', () => {
        const kernel = gpuMock(function() {});
        assert.equal(kernel.setNativeFunctions(), kernel);
      });
    });
    describe('.setInjectedNative()', () => {
      it('can be called and return kernel', () => {
        const kernel = gpuMock(function() {});
        assert.equal(kernel.setInjectedNative(), kernel);
      });
    });
    describe('.addSubKernel()', () => {
      it('can be called and return kernel', () => {
        const kernel = gpuMock(function() {});
        assert.equal(kernel.addSubKernel(), kernel);
      });
    });
    describe('.destroy()', () => {
      it('can be called and return void', () => {
        const kernel = gpuMock(function() {});
        assert.equal(kernel.destroy(), undefined);
      });
    });
    describe('.validateSettings()', () => {
      it('can be called and return void', () => {
        const kernel = gpuMock(function() {});
        assert.equal(kernel.validateSettings(), undefined);
      });
    });
  });
  describe('1d row iteration', () => {
    it('can generate values', () => {
      const results = gpuMock(function() {
        return this.thread.x;
      }, {
        output: [5]
      })();

      assert.equal(results.constructor, Float32Array);
      assert.deepEqual(results, [0,1,2,3,4]);
    });
    it('can work with array', () => {
      const results = gpuMock(function(value) {
        return value[this.thread.x];
      }, {
        output: [5]
      })([0,1,2,3,4]);

      assert.equal(results.constructor, Float32Array);
      assert.deepEqual(results, [0,1,2,3,4]);
    });
    it('can work with array like constructor that has .toArray() (like texture and input)', () => {
      class MockValue {
        toArray() {
          return [0,1,2,3,4];
        }
      }
      const results = gpuMock(function(value) {
        return value[this.thread.x];
      }, {
        output: [5]
      })(new MockValue());

      assert.equal(results.constructor, Float32Array);
      assert.deepEqual(results, [0,1,2,3,4]);
    });
  });

  describe('2d matrix iteration', () => {
    it('can generate values', () => {
      const results = gpuMock(function() {
        return this.thread.x + this.thread.y;
      }, {
        output: [5, 5]
      })();

      assert.equal(results.constructor, Array);
      assert.equal(results[0].constructor, Float32Array);
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
    it('can work with matrix', () => {
      const results = gpuMock(function(value) {
        return value[this.thread.y][this.thread.x];
      }, {
        output: [5, 5]
      })([
        [1,2,3,4,5],
        [6,7,8,9,10],
        [11,12,13,14,15],
        [16,17,18,19,20],
        [21,22,23,24,25],
      ]);

      assert.equal(results.constructor, Array);
      assert.equal(results[0].constructor, Float32Array);
      assert.deepEqual(results,
        [
          [1,2,3,4,5],
          [6,7,8,9,10],
          [11,12,13,14,15],
          [16,17,18,19,20],
          [21,22,23,24,25],
        ]
      );
    });
    it('can work with matrix like constructor that has .toArray() (like texture and input)', () => {
      class MockValue {
        toArray() {
          return [
            [1,2,3,4,5],
            [6,7,8,9,10],
            [11,12,13,14,15],
            [16,17,18,19,20],
            [21,22,23,24,25],
          ];
        }
      }
      const results = gpuMock(function(value) {
        return value[this.thread.y][this.thread.x];
      }, {
        output: [5, 5]
      })(new MockValue());

      assert.equal(results.constructor, Array);
      assert.equal(results[0].constructor, Float32Array);
      assert.deepEqual(results,
        [
          [1,2,3,4,5],
          [6,7,8,9,10],
          [11,12,13,14,15],
          [16,17,18,19,20],
          [21,22,23,24,25],
        ]
      );
    });
  });

  describe('2d graphical matrix iteration', () => {
    it('can generate values', () => {
      const kernel = gpuMock(function() {
        return this.color(
          this.thread.x / 255,
          this.thread.y / 255,
          this.thread.x / 255,
          this.thread.y / 255
        );
      }, {
        output: [2, 2],
        graphical: true,
      });
      kernel();
      const pixels = kernel.getPixels();

      assert.equal(pixels.constructor, Uint8ClampedArray);
      assert.deepEqual(pixels,
        new Uint8ClampedArray([
          0,1,0,1, 1,1,1,1,
          0,0,0,0, 1,0,1,0,
        ])
      );
    });
    it('can generate values with only 3 arguments', () => {
      const kernel = gpuMock(function() {
        return this.color(
          this.thread.x / 255,
          this.thread.y / 255,
          this.thread.x / 255
        );
      }, {
        output: [2, 2],
        graphical: true,
      });
      kernel();
      const pixels = kernel.getPixels();

      assert.equal(pixels.constructor, Uint8ClampedArray);
      assert.deepEqual(pixels,
        new Uint8ClampedArray([
          0,1,0,255, 1,1,1,255,
          0,0,0,255, 1,0,1,255,
        ])
      );
    });
    it('can work with matrix', () => {
      const kernel = gpuMock(function(value) {
        return this.color(
          value[this.thread.y][this.thread.x] / 255,
          value[this.thread.y][this.thread.x] / 255,
          value[this.thread.y][this.thread.x] / 255,
          value[this.thread.y][this.thread.x] / 255
        );
      }, {
        output: [2, 2],
        graphical: true,
      });
      kernel([
        [1,2],
        [3,4]
      ]);
      const pixels = kernel.getPixels();

      assert.equal(pixels.constructor, Uint8ClampedArray);
      assert.deepEqual(pixels,
        new Uint8ClampedArray([
          3,3,3,3, 4,4,4,4,
          1,1,1,1, 2,2,2,2,
        ])
      );
    });
    it('can work with matrix and flip pixels', () => {
      const kernel = gpuMock(function(value) {
        return this.color(
          value[this.thread.y][this.thread.x] / 255,
          value[this.thread.y][this.thread.x] / 255,
          value[this.thread.y][this.thread.x] / 255,
          value[this.thread.y][this.thread.x] / 255
        );
      }, {
        output: [2, 2],
        graphical: true,
      });
      kernel([
        [1,2],
        [3,4]
      ]);
      const pixels = kernel.getPixels(true);

      assert.equal(pixels.constructor, Uint8ClampedArray);
      assert.deepEqual(pixels,
        new Uint8ClampedArray([
          1,1,1,1, 2,2,2,2,
          3,3,3,3, 4,4,4,4,
        ])
      );
    });
    it('can work with matrix like constructor that has .toArray() (like texture and input)', () => {
      class MockValue {
        toArray() {
          return [
            [1,2],
            [3,4]
          ];
        }
      }
      const kernel = gpuMock(function(value) {
        return this.color(
          value[this.thread.y][this.thread.x] / 255,
          value[this.thread.y][this.thread.x] / 255,
          value[this.thread.y][this.thread.x] / 255,
          value[this.thread.y][this.thread.x] / 255
        );
      }, {
        output: [2, 2],
        graphical: true,
      });
      kernel(new MockValue());
      const pixels = kernel.getPixels();

      assert.equal(pixels.constructor, Uint8ClampedArray);
      assert.deepEqual(pixels,
        new Uint8ClampedArray([
          3,3,3,3, 4,4,4,4,
          1,1,1,1, 2,2,2,2,
        ])
      );
    });
  });

  describe('3d cube iteration', () => {
    it('can generate values', () => {
      const results = gpuMock(function() {
        return this.thread.x + this.thread.y + this.thread.z;
      }, {
        output: [5, 5, 5]
      })();

      assert.equal(results.constructor, Array);
      assert.equal(results[0].constructor, Array);
      assert.equal(results[0][0].constructor, Float32Array);

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

    it('can work with cube', () => {
      const results = gpuMock(function(value) {
        return value[this.thread.z][this.thread.y][this.thread.x];
      }, {
        output: [5, 5, 5]
      })([
        [
          [1,2,3,4,5],
          [6,7,8,9,10],
          [11,12,13,14,15],
          [16,17,18,19,20],
          [21,22,23,24,25]
        ],[
          [26,27,28,29,30],
          [31,32,33,34,35],
          [36,37,38,39,40],
          [41,42,43,44,45],
          [46,47,48,49,50]
        ],[
          [51,52,53,54,55],
          [56,57,58,59,60],
          [61,62,63,64,65],
          [66,67,68,69,70],
          [71,72,73,74,75]
        ],[
          [76,77,78,79,80],
          [81,82,83,84,85],
          [86,87,88,89,90],
          [91,92,93,94,95],
          [96,97,98,99,100]
        ],[
          [101,102,103,104,105],
          [106,107,108,109,110],
          [111,112,113,114,115],
          [116,117,118,119,120],
          [121,122,123,124,125]
        ]
      ]);

      assert.equal(results.constructor, Array);
      assert.equal(results[0].constructor, Array);
      assert.equal(results[0][0].constructor, Float32Array);

      assert.deepEqual(results,
        [
          [
            new Float32Array([1,2,3,4,5]),
            new Float32Array([6,7,8,9,10]),
            new Float32Array([11,12,13,14,15]),
            new Float32Array([16,17,18,19,20]),
            new Float32Array([21,22,23,24,25])
          ],[
            new Float32Array([26,27,28,29,30]),
            new Float32Array([31,32,33,34,35]),
            new Float32Array([36,37,38,39,40]),
            new Float32Array([41,42,43,44,45]),
            new Float32Array([46,47,48,49,50])
          ],[
            new Float32Array([51,52,53,54,55]),
            new Float32Array([56,57,58,59,60]),
            new Float32Array([61,62,63,64,65]),
            new Float32Array([66,67,68,69,70]),
            new Float32Array([71,72,73,74,75])
          ],[
            new Float32Array([76,77,78,79,80]),
            new Float32Array([81,82,83,84,85]),
            new Float32Array([86,87,88,89,90]),
            new Float32Array([91,92,93,94,95]),
            new Float32Array([96,97,98,99,100])
          ],[
            new Float32Array([101,102,103,104,105]),
            new Float32Array([106,107,108,109,110]),
            new Float32Array([111,112,113,114,115]),
            new Float32Array([116,117,118,119,120]),
            new Float32Array([121,122,123,124,125])
          ]
        ]
      );
    });

    it('can work with cube like constructor that has .toArray() (like texture and input)', () => {
      class MockValue {
        toArray() {
          return [
            [
              [1,2,3,4,5],
              [6,7,8,9,10],
              [11,12,13,14,15],
              [16,17,18,19,20],
              [21,22,23,24,25]
            ],[
              [26,27,28,29,30],
              [31,32,33,34,35],
              [36,37,38,39,40],
              [41,42,43,44,45],
              [46,47,48,49,50]
            ],[
              [51,52,53,54,55],
              [56,57,58,59,60],
              [61,62,63,64,65],
              [66,67,68,69,70],
              [71,72,73,74,75]
            ],[
              [76,77,78,79,80],
              [81,82,83,84,85],
              [86,87,88,89,90],
              [91,92,93,94,95],
              [96,97,98,99,100]
            ],[
              [101,102,103,104,105],
              [106,107,108,109,110],
              [111,112,113,114,115],
              [116,117,118,119,120],
              [121,122,123,124,125]
            ]
          ];
        }
      }
      const results = gpuMock(function(value) {
        return value[this.thread.z][this.thread.y][this.thread.x];
      }, {
        output: [5, 5, 5]
      })(new MockValue());

      assert.equal(results.constructor, Array);
      assert.equal(results[0].constructor, Array);
      assert.equal(results[0][0].constructor, Float32Array);

      assert.deepEqual(results,
        [
          [
            new Float32Array([1,2,3,4,5]),
            new Float32Array([6,7,8,9,10]),
            new Float32Array([11,12,13,14,15]),
            new Float32Array([16,17,18,19,20]),
            new Float32Array([21,22,23,24,25])
          ],[
            new Float32Array([26,27,28,29,30]),
            new Float32Array([31,32,33,34,35]),
            new Float32Array([36,37,38,39,40]),
            new Float32Array([41,42,43,44,45]),
            new Float32Array([46,47,48,49,50])
          ], [
            new Float32Array([51,52,53,54,55]),
            new Float32Array([56,57,58,59,60]),
            new Float32Array([61,62,63,64,65]),
            new Float32Array([66,67,68,69,70]),
            new Float32Array([71,72,73,74,75])
          ],[
            new Float32Array([76,77,78,79,80]),
            new Float32Array([81,82,83,84,85]),
            new Float32Array([86,87,88,89,90]),
            new Float32Array([91,92,93,94,95]),
            new Float32Array([96,97,98,99,100])
          ],[
            new Float32Array([101,102,103,104,105]),
            new Float32Array([106,107,108,109,110]),
            new Float32Array([111,112,113,114,115]),
            new Float32Array([116,117,118,119,120]),
            new Float32Array([121,122,123,124,125])
          ]
        ]
      );
    });
  });
});
