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

1. Create a file env.json
2. Add an object with the necessary environment variables to a single object "myenv"

Example: 

{
  "myenv": {
    "SWANAGER_API_URL": "API_URL",
    "SWANAGER_WS_URL": "WS_URL"
  }
}
