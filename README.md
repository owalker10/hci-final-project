# hci-final-project

## Getting Started
- to install dependencies: ```npm install```
- make sure you have a .env file with the right content
- to run the development server: ```npm run dev```

## Deploy to Heroku
### First time set-up
- [install the Heroku CLI tool](https://devcenter.heroku.com/articles/heroku-cli)
- ```heroku login```
### Deploy a change
- make sure your code works when you run ```npm start```
- commit your changes
- ```git push heroku main```

## Structure
### /public
where JS scripts, CSS stylesheets, and assets (images, etc.) live

### /routes
- web.js: the URL routes for the frontend webpages
- api.js: the REST API consumed by the frontend
    - routes in here are accessed through requests to https://<public_url>/api/...
### /views
Where the HTML webpages and components live. This is using ejs which is a templating language that looks very similar to HTML but with the ability to dynamically add data into the HTML straight from the server.

### /mock_data
JavaScript files that export data that can be used by the `npm run database` script (see below)

### app.js
The root file for the Express server. Most changes shouldn't be made here, but rather to web.js or api.js.

### Changing users
When using the client, you can assume the identity of any valid user (any user in the database) by adding ?username=[username] to the URL. The server will remember this username for the during of the session (aka the current browser tab).

## Database operation script
You can use the command `npm run database` to perform operations on either the production or the development database.

Usage: `npm run database [command] [flags]`

Commands:

`put`: replaces the collections in the file with the data in the file

`add`: inserts data from the file into the collections

Flags:

`-f, --file`: specifies the file to pull data from (should probably be `/data/[file].js`)

`-d, --db`: specifies the database to modify ("production" or "development", default value is "development")

Examples:

`npm run database -- put --file mock_data/[file].js`: replaces development collections with data in [file].js

`npm run database -- add --file mock_data/[file].js --db production`: inserts data from [file].js into the production database

`npm run database -- put -f mock_data/empty.js`: clears the development database