# weather-app-implement

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Serverless API key proxy (optional)

To avoid exposing your OpenWeather API key in the client bundle you can
deploy small serverless functions that perform the requests on behalf of the
browser. Three example handlers are provided under
`src/api/serverless` (`geoProxy`, `weatherProxy` and `weatherByCity`), plus a
simple `getApiKey` function.

During development the app continues to call the real OpenWeather endpoints
(using `VITE_OPENWEATHER_API_KEY` from your `.env.*` files). When you want
to switch to the serverless versions set the following environment variable
at build time:

```
VITE_USE_SERVERLESS=true
```

The frontend will then hit `/api/…` routes instead of the public API and the
key is only ever used on the server.

Make sure your deployment platform copies the `OPENWEATHER_API_KEY` (without
`VITE_` prefix) into the server environment so the handlers can read it.

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
