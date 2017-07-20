# taco

A `create-react-app` + `redux` + `express` boilerplate, based on [create-react-app-redux](https://github.com/notrab/create-react-app-redux). taco demonstrates how to integrate `create-react-app` and `redux` with an express.js server to retrieve BTC and ETH prices from the [gemini api](https://docs.gemini.com/rest-api/).

### Getting started

Clone the repo (and nuke `.git` and run `git init` yourself to use this as a starting point) and run `yarn` to install dependencies. The application has been "ejected".

### run it locally

You'll need two separate shells to start the app as is:

* `yarn start:proxy` to start the proxy server (API) on port 3009 (we're leverage webpack's [proxy](https://webpack.github.io/docs/webpack-dev-server.html#proxy) so we don't need to pay too much attention to this until you're ready to deploy).
* `yarn start` starts the app on port 3000 with the standard `create-react-app` hot reloading, etc.

### testing

`create-react-app` sets up facebook's `jest`, simply running `yarn test` will run any tests in `*.spec.js` files or create your own `__tests__` directory and run with it from there.
