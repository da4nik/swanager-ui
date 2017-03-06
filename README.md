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
