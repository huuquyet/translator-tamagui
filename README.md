# Translator App built with Transformers.js + Tamagui + Next.js

```sh
npm create tamagui
```

## 🔦 About

This Translator app is a starter for a Transformers.js + Next.js + Tamagui + Solito app.

## 📦 Included packages

- [Tamagui](https://tamagui.dev) 🪄
- Transformers.js
- Next.js

## 🗂 Folder layout

The main apps are:

- `app` folder of Next.js
- `src`
    - `features` (don't use a `screens` folder. organize by feature.)
    - `provider` (all the providers that wrap the app, and some no-ops for Web.)

## 🏁 Start the app

- Install dependencies: `yarn`

- Next.js local dev: `yarn dev`

To see debug output to verify the compiler, add `// debug` as a comment to the top of any file.

## UI Kit

Note we're following the [design systems guide](https://tamagui.dev/docs/guides/design-systems) and creating our own package for components.

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

### Troubleshooting Vercel Deployment

If after pushing to GitHub you're seeing that your automatic vercel deployment failed because of an error that looks like this:

```
➤ YN0028: │ The lockfile would have been modified by this install, which is explicitly forbidden.
➤ YN0000: └ Completed
➤ YN0000: Failed with errors in 0s 700ms
Error: Command "yarn set version berry && yarn install" exited with 1
```

Run `yarn install` locally and then commit and push the changes to GitHub.
