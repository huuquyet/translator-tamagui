# Translator App built with Transformers.js + Next.js

## 🔦 About

This Translator app is a starter for a Transformers.js + Next.js

Please check out the demo site [![Open in Spaces](https://huggingface.co/datasets/huggingface/badges/resolve/main/open-in-hf-spaces-sm-dark.svg)](https://huggingface.co/spaces/huuquyet/translator-next) or [Vercel app](https://nextjs-translator.vercel.app/).

## 📦 Included packages

- Transformers.js 🪄
- Next.js

## 🗂 Folder layout

The main apps are:

- `app` folder of Next.js
- `src` all the components and screens

## 🏁 Start the app

1. Clone the repo and install dependencies:

    ```bash
    git clone https://github.com/huuquyet/translator-next.git
    cd translator-next
    yarn install
    ```

2. Run the development server:

    ```bash
    yarn dev
    ```
    > Firefox users need to change the `dom.workers.modules.enabled` setting in `about:config` to `true` to enable Web Workers.
    > Check out [this issue](https://github.com/xenova/whisper-web/issues/8) for more details.

3. Open the link (e.g., [http://localhost:3000/](http://localhost:3000/)) in your browser.

## 🆕 Add new dependencies

### Pure JS dependencies

If you're installing a JavaScript-only dependency that will be used across platforms, install it :

```sh
yarn add zustand
```

## Update new dependencies

### Pure JS dependencies

```sh
yarn upgrade-interactive
```

You may potentially want to have the native module transpiled for the next app. If you get error messages with `Cannot use import statement outside a module`, you may need to use `transpilePackages` in your `next.config.js` and add the module to the array there.

## Deploying to Vercel

- Install vercel cli (if not): `npm i -g vercel`
- Login to vercel: `vercel login`
- Build command to be `vercel build` (add `--prod` if wanna build production version)
- Build command: leave default setting
- Output dir: leave default setting
- Deploy to vercel: `vercel --prebuilt` (add `--prod` if wanna deploy to production)
