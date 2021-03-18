# monorepo-example
An example of the architecture of a monorepo with a react route and a custom webpack config path

---

## Build

---

- Run `yarn` at the root of monorepo

## Run

---

Run all projects as one application

```sh
$ yarn start:all
```

Run only app1

```sh
$ yarn start:hydra
```

Run only app2

```sh
$ yarn start:chimera
```

## Configuration

---

```yml
workspaces: "packages"
packages:
  app1:
    dir: "app1"                                      # The name of the directory that lies in packages
    name: "@monorepo/app1"                           # Project name, need to be specified in packages.json (name) and webpack config (name)
    webpack: "packages/app1/webpack/config"          # Path to webpack config
    url_prefix: '^\/app1'                            # The prefix for express 
    html: "packages/app1/dist/index.html"            # Path to index.html
  app2:
    dir: "app2"
    name: "@monorepo/app2"
    webpack: "packages/app2/webpack.config"
    url_prefix: '^\/app2'
    html: "packages/app2/dist/index.html"
    commands:                                       # Commands to run before building the project
      - echo hello server 
```

## Примечание

---

В монорепозитории используется [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) и [lerna](https://github.com/lerna/lerna), как сервер идет [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) с функцией [hot-reload](https://github.com/webpack-contrib/webpack-hot-middleware). Настройки лежат в `utils/server.js`.



