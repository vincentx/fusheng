# Fusheng UI 

## Building and running on localhost

First install dependencies:

```sh
yarn
```

Start the mockserver if you want:

```sh
yarn mockserver
```

Create your .env file based on .env.example, add your configurations. Then run:

```sh
cp .env.example .env
```

```sh
yarn start
```

## Build

To create a production build:

```sh
yarn build
```

## Running

Open the file `dist/index.html` in your browser

## Testing

To run unit tests:

```sh
yarn test
```
