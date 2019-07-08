# tree-view

A Vue.js project that renders tree data structure in a markdown file into html.

## How to use as a library 

You can load tree-view as a library in your project through [jsdelivr.com](https://jsdelivr.com).

* UMD
  * https://cdn.jsdelivr.net/gh/unhurried/tree-view/dist/treeView.umd.js
  * https://cdn.jsdelivr.net/gh/unhurried/tree-view/dist/treeView.umd.min.js
* CommonJS
  * https://cdn.jsdelivr.net/gh/unhurried/tree-view/dist/treeView.common.js
* CSS
  * https://cdn.jsdelivr.net/gh/unhurried/tree-view/dist/treeView.css
* web Components
  * https://cdn.jsdelivr.net/gh/unhurried/tree-view/dist/tree-view.js
  * https://cdn.jsdelivr.net/gh/unhurried/tree-view/dist/tree-view.min.js

Check usage in a demo application: https://unhurried.github.io/tree-view/demo/

## How to start development

```shell
# install dependencies
npm install

# run unit tests
npm run test:unit

# run E2E tests
npm run test:e2e

# run app for development
npm run serve

# build app for production
npm run build:app

# build lib for production
npm run build:lib

# build Web Components for production
npm run build:wc
```

## Library dependencies

- [Vue.js](https://vuejs.org) + [Vue CLI 3](https://cli.vuejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://github.com/axios/axios) (HTTP Client)
- [Jest](https://jestjs.io/) (Unit Test)
  - [v0.1](https://github.com/unhurried/tree-view/releases/tag/v0.1): [Jasmine](https://jasmine.github.io/) + [Chai](https://www.chaijs.com/)
- [Cypress](https://www.cypress.io/) (E2E Test)