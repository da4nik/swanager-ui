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

SWANAGER_API_URL='http://cluster-1.westeurope.cloud.swanager.com:4945/api/v1' SWANAGER_WS_URL='ws://cluster-1.westeurope.cloud.swanager.com:4945/ws' npm start

export SWANAGER_API_URL='http://cluster-1.westeurope.cloud.swanager.com:4945/api/v1'
export SWANAGER_WS_URL='ws://cluster-1.westeurope.cloud.swanager.com:4945/ws'
npm start