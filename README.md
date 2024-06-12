# Translator App built with Transformers.js + Tamagui + Next.js

## 🔦 About

This Translator app built with [🤗 Transformers.js](https://github.com/xenova/transformers.js) + [Tamagui](https://tamagui.dev) + [Next.js](https://nextjs.org)

Please check out the demo site 
<a href="https://huggingface.co/spaces/huuquyet/translator-tamagui">
  <picture>
    <source srcset="https://huggingface.co/datasets/huggingface/badges/resolve/main/open-in-hf-spaces-sm.svg" media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)">
    <source srcset="https://huggingface.co/datasets/huggingface/badges/resolve/main/open-in-hf-spaces-sm-dark.svg" media="(prefers-color-scheme: dark)">
    <img src="https://huggingface.co/datasets/huggingface/badges/resolve/main/open-in-hf-spaces-sm.svg" alt="Open in Spaces">
  </picture>
</a>
 or [Vercel app](https://translator-tamagui.vercel.app/).

## Included models

- [NLLB200 distilled 600M](https://hf.co/facebook/nllb-200-distilled-600M) converted to [ONNX model](https://hf.co/Xenova/nllb-200-distilled-600M)
- [VinAI translate En2Vi v2](https://hf.co/vinai/vinai-translate-en2vi-v2) converted to [ONNX model](https://hf.co/huuquyet/vinai-translate-en2vi-v2)
- [VinAI translate Vi2En v2](https://hf.co/vinai/vinai-translate-vi2en-v2) converted to [ONNX model](https://hf.co/huuquyet/vinai-translate-vi2en-v2)
- [VietAI EnVi t5-translation](https://hf.co/VietAI/envit5-translation) converted to [ONNX model](https://hf.co/huuquyet/envit5-translation)

## 📦 Included packages

- [🤗 Transformers.js](https://github.com/xenova/transformers.js)
- [Tamagui 🪄](https://tamagui.dev)
- [Next.js](https://nextjs.org)

## 🗂 Folder layout

The main apps are:

- `src` all the components and screens

## 🏁 Start the app

1. Clone the repo and install dependencies with [bun](https://bun.sh):

  ```bash
  git clone https://github.com/huuquyet/translator-tamagui.git
  cd translator-tamagui
  bun install
  ```

2. Run the development server:

  ```bash
  bun dev
  ```
  > Firefox users need to change the `dom.workers.modules.enabled` setting in `about:config` to `true` to enable Web Workers.
  > Check out [this issue](https://github.com/xenova/whisper-web/issues/8) for more details.

3. Open the link (e.g., [http://localhost:3000/](http://localhost:3000/)) in your browser.

## 🆕 Add new dependencies

### Pure JS dependencies

If you're installing a JavaScript-only dependency that will be used across platforms, install it :

```sh
bun add zustand
```

## Update new dependencies

### Pure JS dependencies

```sh
bun update --latest
```

You may potentially want to have the native module transpiled for the next app. If you get error messages with `Cannot use import statement outside a module`, you may need to use `transpilePackages` in your `next.config.js` and add the module to the array there.

## Deploying to Vercel

- Install vercel cli (optional): `npm i -g vercel`
- Login to vercel: `bunx vercel login`
- Build command to be `bunx vercel build` (add `--prod` if wanna build production version)
- Build command: leave default setting
- Output dir: leave default setting
- Deploy to vercel: `bunx vercel --prebuilt` (add `--prod` if wanna deploy to production)
