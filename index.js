'use strict';

export function mock1D() {
  const row = [];
  for (let x = 0; x < this.output.x; x++) {
    this.thread.x = x;
    this.thread.y = 0;
    this.thread.z = 0;
    row.push(this._fn.apply(this, arguments));
  }
  return row;
}

export function mock2D() {
  const rows = [];
  for (let y = 0; y < this.output.y; y++) {
    const row = [];
    for (let x = 0; x < this.output.x; x++) {
      this.thread.x = x;
      this.thread.y = y;
      this.thread.z = 0;
      row.push(this._fn.apply(this, arguments));
    }
    rows.push(row);
  }
  return rows;
}

export function mock3D() {
  const grid = [];
  for (let z = 0; z < outputZ; z++) {
    const rows = [];
    for (let y = 0; y < outputY; y++) {
      const row = [];
      for (let x = 0; x < outputX; x++) {
        this.thread.x = x;
        this.thread.y = y;
        this.thread.z = z;
        row.push(this._fn.apply(this, arguments));
      }
      rows.push(row);
    }
  }
  return grid;
}

export default function gpuMock(fn, options) {
  let contextOutput = null;
  if (options.output.length) {
    if (options.length === 3) {
      contextOutput = { x: options[0], y: options[1], z: options[2] };
    } else if (options.length === 2) {
      contextOutput = { x: options[0], y: options[1] };
    } else {
      contextOutput = { x: options[0] };
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
}
