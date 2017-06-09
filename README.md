# Swanager UI

## Development

Update your Swanager api url in `./config/development.js`.

```bash
$ npm install
$ npm start
```

## Build

Update your Swanager api url in `./config/production.js`.

```bash
$ ./build
```

## Run

```bash
$ docker run --name swanager-ui -p <host_port>:80 -d swanager-ui:latest
```
## Env
export SWANAGER_API_URL=API_URL
export SWANAGER_WS_URL=WS_URL
