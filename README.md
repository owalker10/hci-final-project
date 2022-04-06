# hci-final-project

## Getting Started
- to install dependencies: ```npm install```
- make sure you have a .env file with the right content
- to run the development server: ```npm run dev```

## Structure
### /public
where JS scripts, CSS stylesheets, and assets (images, etc.) live

### /routes
- web.js: the URL routes for the frontend webpages
- api.js: the REST API consumed by the frontend
### /views
Where the HTML webpages and components live. This is using ejs which is a templating language that looks very similar to HTML but with the ability to dynamically add data into the HTML.

### app.js
The root file for the Express server. Changes shouldn't be made here, but rather to web.js or api.js.