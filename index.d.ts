import * as GPU from 'gpu.js';

export function gpuMock(kernelFunction: GPU.KernelFunction, settings?: GPU.IKernelSettings): GPU.IKernelRunShortcut;
export function gpuMock<T>(kernelFunction: GPU.KernelFunction<T>, settings?: GPU.IKernelSettings): GPU.IKernelRunShortcut;
