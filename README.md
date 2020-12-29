# craft-pokemon

Craft Demo Designs - Pokemon San Diego

![Project screen shot](https://www.donsuhr.com/projects/pokemon-info/screen1.png)

## Development 

In one terminal `npm run start`. In another `npm run watch`. In a third `npm run test -- --watch`.

`npm run deploy` to build and sync to s3.

## Config

Update `src/config.ts` with 

1. your Google Maps API key
2. your Craft Demo API key

This project uses an `.env` file to set some environmental variables for development.

`SYSTEM_WEBPACK=webpack.xxx.js`: Use a local webpack file for development machine settings. For instance, 
the path to SSL certificates. This config will be merged with the main configs.

`DEV_USE_SW_FOR_RUNTIME=true`: Toggle using a service worker in development. Always true in production.

`DEV_USE_SW_FOR_API=true`: Toggle using the SW cache for api calls. Always true in production.

`DEV_USE_FIXTURE_FOR_API=false`: Toggle using a fixture file instead of callout out to the API. Always false in production.

`DEV_LIMIT_DETAIL_LOAD=1|false`: Only load [1..n] number of details. Always false in production.

![Project screen shot](https://www.donsuhr.com/projects/pokemon-info/screen2.png)
