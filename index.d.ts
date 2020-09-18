import {KernelFunction, IKernelSettings, IKernelRunShortcut, ThreadKernelVariable, IKernelFunctionThis} from 'gpu.js';

export function gpuMock(this: IKernelFunctionThis, kernelFunction: KernelFunction, settings?: IKernelSettings): IKernelRunShortcut;
export function gpuMock<ArgT extends ThreadKernelVariable[] = ThreadKernelVariable[]>(this: IKernelFunctionThis, kernelFunction: ArgT, settings?: IKernelSettings): IKernelRunShortcut;
