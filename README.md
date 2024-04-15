# Translator App built with Transformers.js + Next.js

## 🔦 About

This Translator app is a starter for a Transformers.js + Next.js

## 📦 Included packages

- Transformers.js 🪄
- Next.js

## 🗂 Folder layout

The main apps are:

- `app` folder of Next.js
- `src` all the components and screens

## 🏁 Start the app

- Install dependencies: `yarn install`

- Next.js local dev: `yarn dev`

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
- Build command to be `vercel build` (add `--prod` if wanna build production version)
- Build command: leave default setting
- Output dir: leave default setting
- Deploy to vercel: `vercel --prebuilt` (add `--prod` if wanna deploy to production)
