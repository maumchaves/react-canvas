# React Canvas

React Canvas is a playground project aimed to get started with ReactJS.

[Live application here](http://react-canvas-demo.s3-website-eu-west-1.amazonaws.com), hosted on [AWS S3](https://aws.amazon.com/es/s3).

This project was generated with [Create React App](https://github.com/facebookincubator/create-react-app) version 1.4.3.

### Features

- Http request to get a dataset containing an array of normalized coordinates ([0, 1]) of a plane.
- Each element in the array represents a "Zone" limited by the corresponding coordinates.
- Zones are drawn in the "Main Area" using canvas.
- Canvas are 100% responsive.
- Select one zone from the side menu to highlight a specific Zone.

## Setup

Run `npm install`.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `build/` directory.