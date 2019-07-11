export interface IKernelXYZ {
  x: number;
  y?: number;
  z?: number;
}

export type ThreadKernelVariable =
  boolean
  | number
  | number[]
  | number[][]
  | number[][][];

export interface IConstantsThis {
  [constantName: string]: ThreadKernelVariable;
}

export interface IKernelFunctionThis {
  output: IKernelXYZ;
  thread: IKernelXYZ;
  constants: IConstantsThis;
  color(r: number): void;
  color(r: number, g: number): void;
  color(r: number, g: number, b: number): void;
  color(r: number, g: number, b: number, a: number): void;
}

export interface IToArray {
  toArray(): number[] | number[][] | number[][][]
}

export type KernelVariable =
  boolean
  | number
  | number[]
  | number[][]
  | number[][][]
  | IToArray
  | HTMLImageElement
  | HTMLImageElement[];

export type KernelOutput = void | KernelVariable;

export type KernelFunction = ((
  this: IKernelFunctionThis,
  arg1?: ThreadKernelVariable,
  arg2?: ThreadKernelVariable,
  arg3?: ThreadKernelVariable,
  arg4?: ThreadKernelVariable,
  arg5?: ThreadKernelVariable,
  arg6?: ThreadKernelVariable,
  arg7?: ThreadKernelVariable,
  arg8?: ThreadKernelVariable,
  arg9?: ThreadKernelVariable,
  arg10?: ThreadKernelVariable,
  arg11?: ThreadKernelVariable,
  arg12?: ThreadKernelVariable,
  arg13?: ThreadKernelVariable,
  arg14?: ThreadKernelVariable,
  arg15?: ThreadKernelVariable,
  arg16?: ThreadKernelVariable,
  arg17?: ThreadKernelVariable,
  arg18?: ThreadKernelVariable,
  arg19?: ThreadKernelVariable,
  arg20?: ThreadKernelVariable,
) => KernelOutput) | object | string;

export interface IKernelSettings {
  output?: number[] | IKernelXYZ;
  constants?: object;
  graphical?: boolean;
}

export function gpuMock(kernelFunction: KernelFunction, settings: IKernelSettings): (
  arg1?: KernelVariable,
  arg2?: KernelVariable,
  arg3?: KernelVariable,
  arg4?: KernelVariable,
  arg5?: KernelVariable,
  arg6?: KernelVariable,
  arg7?: KernelVariable,
  arg8?: KernelVariable,
  arg9?: KernelVariable,
  arg10?: KernelVariable,
  arg11?: KernelVariable,
  arg12?: KernelVariable,
  arg13?: KernelVariable,
  arg14?: KernelVariable,
  arg15?: KernelVariable,
  arg16?: KernelVariable,
  arg17?: KernelVariable,
  arg18?: KernelVariable,
  arg19?: KernelVariable,
  arg20?: KernelVariable
) => number[] | number[][] | number[][][] | void;
