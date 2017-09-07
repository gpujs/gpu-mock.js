
export function gpuMock1D(outputX, fn, args) {
  const row = [];
  for (let x = 0; x < outputX; x++) {
    context.thread.x = x;
    context.thread.y = 0;
    context.thread.z = 0;
    row.push(fn.apply(context, args));
  }
  return row;
}

export function gpuMock2D(outputY, outputX, fn, args) {
  const rows = [];
  for (let y = 0; y < outputY; y++) {
    const row = [];
    for (let x = 0; x < outputX; x++) {
      context.thread.x = x;
      context.thread.y = y;
      context.thread.z = 0;
      row.push(fn.apply(context, args));
    }
    rows.push(row);
  }
  return rows;
}

export function gpuMock3D(outputZ, outputY, outputX, fn, args) {
  const grid = [];
  for (let z = 0; z < outputZ; z++) {
    const rows = [];
    for (let y = 0; y < outputY; y++) {
      const row = [];
      for (let x = 0; x < outputX; x++) {
        context.thread.x = x;
        context.thread.y = y;
        context.thread.z = z;
        row.push(fn.apply(context, args));
      }
      rows.push(row);
    }
  }
  return grid;
}
