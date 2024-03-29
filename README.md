# Translator using Transformer.js + Tamagui + Expo

```sh
npm create tamagui
```

## 🔦 About

This repo is a starter for a Transformers.js + Expo + Tamagui app.

## 📦 Included packages

- [Tamagui](https://tamagui.dev) 🪄
- Transformers.js
- Expo SDK
- Expo Router

## 🗂 Folder layout

The main apps are:

- `app` you'll be importing most files from `app/`

## 🏁 Start the app

- Install dependencies: `yarn` or `yarn install`

- Web local dev: `yarn web`

- Android local dev: `yarn android`

- Ios local dev: `yarn ios`

## UI Kit

Note we're following the [design systems guide](https://tamagui.dev/docs/guides/design-systems) and creating our own package for components.

## 🆕 Add new dependencies

### Pure JS dependencies

If you're installing a JavaScript-only dependency that will be used across platforms, install it as example:

```sh
yarn add zustand
```

## Update new dependencies

### Pure JS dependencies

```sh
yarn upgrade-interactive
```

## Deploying to Vercel

- Config in `vercel.json` file
- Build command: leave default setting
- Output dir: leave default setting
- Build preview version with `vercel build` or production with `vercel build --prod`
- Then deploy the preview with `vercel --prebuilt` or production with `vercel --prod --prebuilt`
