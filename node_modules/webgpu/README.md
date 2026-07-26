# webgpu - dawn.node

Provides webgpu to node

[Dawn](https://dawn.googlesource.com/dawn) is an implementation of 
[WebGPU](https://gpuweb.github.io/gpuweb/). It includes a node plugin
and this repo builds that plugin and publishes it on npm.

## Usage

```
npm install --save webgpu
```

Then in your code

```js
import { create, globals } from 'webgpu';

Object.assign(globalThis, globals);
const navigator = { gpu: create([]) };

...

// do some webgpu
const device = await(await navigator.gpu.requestAdapter()).requestDevice();
...
```

see [example](https://github.com/dawn-gpu/node-webgpu/tree/main/example)

You can pass dawn options in `create`

```js
const navigator = {
  gpu: create([
    "enable-dawn-features=allow_unsafe_apis,dump_shaders,disable_symbol_renaming",
  ]),
};
```

There is both `enable-dawn-features=comma,separated,toggles` and `disable-dawn-features=comma,separated,toggles`.

The available options are listed [here](https://dawn.googlesource.com/dawn/+/refs/heads/main/src/dawn/native/Toggles.cpp)

## Notes

### Lifetime

The `dawn.node` implementation exists as long as the `navigator` variable
in the examples is in scope, or rather, as long as there is a reference to
the object returned by `create`. As such, if you assign it to a global
variable like this

```js
globalThis.navigator = { gpu: create([]) };
```

node will not exit because it's still running GPU code in the background.
You can fix that by removing the reference.

```js
delete globalThis.navigator
```

See: https://issues.chromium.org/issues/387965810

### Software GPU

Some options for running with a software based Vulkan implementation such has lavapipe are mentioned
in [the dawn.node readme](https://dawn.googlesource.com/dawn/+/refs/heads/main/src/dawn/node/)

### What to use this for

This package provides a WebGPU implementation it node. That said, if you are making a webpage
and are considering using this for testing, you'd probably be better off using [puppeteer](https://pptr.dev/). You can
find an example of using puppeteer for testing WebGPU in [this repo](https://github.com/dawn-gpu/webgpu-debug-helper).

This package is for WebGPU in node. It provides WebGPU in node. But, it does not not provide integration
with the web platform. For example, importing video via `HTMLVideoElement` or `VideoFrame`. It doesn't
provide a way to copy an `HTMLImageElement` to a texture. It also doesn't provide a way to render to an
`HTMLCanvasElement`. All of those only exist in the browser, not in node.

I suspect you could provide many of those with polyfills without changing this repo but I have not
looked into it.

What you can do is render to textures and then read them back. You can also run compute shaders
and read their results. See the example linked above.

## Bugs / Issues

This repo just publishes `dawn.node` from the dawn project [here](https://dawn.googlesource.com/dawn/+/refs/heads/main/src/dawn/node/).
Bugs related to dawn, WebGPU should be filed in the in the
[chromium issue tracker](https://crbug.com/dawn)

## Running the CTS

```
npm run build
cd third_party/dawn/third_party/webgpu-cts
npm ci
cd ../..
cp third_party/webgpu-cts/package.json ..
./tools/run run-cts --bin=out/cmake-release 'webgpu:*'
```

Note: this is no different than running the CTS in dawn itself.

## Updating

This updates to the latest dawn and depot_tools

```sh
npm ci
npm run update
```

## Building on all supported platforms

Push a new version. Check the github actions. You should see build artifacts
added to the bottom of the latest action run. 

## Building

This builds for the local OS (win64,macOS-intel,macOS-arm,linux)

```sh
npm ci
npm run build
```

### Prerequisites

#### Windows

Before running the build script above you must have
Visual Studio C++ installed and have run the `vcvars64.bat` file.
I've tested with Visual Studio Community Edition 2022

Further you must have [cmake installed](https://cmake.org/download/)
and either in your path or at it's standard place of `C:\Program Files\CMake`

You must have `go` installed. Get it at https://go.dev/

And you must have `node.js` installed, at least version 18. 
I recommend using [nvm-windows](https://github.com/coreybutler/nvm-windows) to install it
as it makes it easy to switch version

#### MacOS

Before running the build script above you must have
XCode installed and its command line tools

Further you must have [cmake installed](https://cmake.org/download/)
and either in your path or at it's standard place of `/Applications/CMake.app`

You must have `go` installed. Get it at https://go.dev/

And you must have `node.js` installed, at least version 18. 
I recommend using [nvm](https://github.com/nvm-sh/nvm) to install it
as it makes it easy to switch versions.

#### Linux (Ubuntu)

Before running the build script above you need to install
the following dependencies

```sh
sudo apt-get install cmake libxrandr-dev libxinerama-dev libxcursor-dev mesa-common-dev libx11-xcb-dev pkg-config nodejs npm
```

You must have `go` installed. Get it at https://go.dev/

And you must have `node.js` installed, at least version 18. 
I recommend using [nvm](https://github.com/nvm-sh/nvm) to install it
as it makes it easy to switch versions.

## License

MIT: https://dawn.googlesource.com/dawn/+/HEAD/LICENSE

## Thanks!

Special thanks to Felix Maier who originally published a dawn plugin for node
[here](https://github.com/maierfelix/webgpu/) and who graciously let me
publish this repo under the same npm package.