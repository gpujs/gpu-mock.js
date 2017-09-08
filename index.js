'use strict';

function mock1D() {
  const row = [];
  for (let x = 0; x < this.output.x; x++) {
    this.thread.x = x;
    this.thread.y = 0;
    this.thread.z = 0;
    row.push(this._fn.apply(this, arguments));
  }
  return row;
}

function mock2D() {
  const matrix = [];
  for (let y = 0; y < this.output.y; y++) {
    const row = [];
    for (let x = 0; x < this.output.x; x++) {
      this.thread.x = x;
      this.thread.y = y;
      this.thread.z = 0;
      row.push(this._fn.apply(this, arguments));
    }
    matrix.push(row);
  }
  return matrix;
}

function mock3D() {
  const cube = [];
  for (let z = 0; z < this.output.z; z++) {
    const matrix = [];
    for (let y = 0; y < this.output.y; y++) {
      const row = [];
      for (let x = 0; x < this.output.x; x++) {
        this.thread.x = x;
        this.thread.y = y;
        this.thread.z = z;
        row.push(this._fn.apply(this, arguments));
      }
      matrix.push(row);
    }
    cube.push(matrix);
  }
  return cube;
}

module.exports = function gpuMock(fn, options) {
  let contextOutput = null;
  if (options.output.length) {
    if (options.output.length === 3) {
      contextOutput = { x: options.output[0], y: options.output[1], z: options.output[2] };
    } else if (options.output.length === 2) {
      contextOutput = { x: options.output[0], y: options.output[1] };
    } else {
      contextOutput = { x: options.output[0] };
    }
  } else {
    contextOutput = options.output;
  }

  const context = {
    _fn: fn,
    constants: options.constants,
    output: contextOutput,
    thread: {
      x: 0,
      y: 0,
      z: 0
    }
  };

  if (contextOutput.z) {
    return mock3D.bind(context);
  } else if (contextOutput.y) {
    return mock2D.bind(context);
  } else {
    return mock1D.bind(context);
  }
};
