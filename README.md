Fruit Rescue (Robot)
===================

A web app for managing the logistics of urban fruit harvesting. 
It is being built for [Community Fruit Rescue](http://fruitrescue.org) in Boulder, Colorado, 
by [Code for Boulder](http://www.codeforboulder.org/) and [Falling Fruit](http://fallingfruit.org).

The overall purpose of the app is to:

- Collect homeowner, harvester, and fruit tree registrations.
- Facilitate communication with homeowners and harvesters.
- Plan, coordinate, and track harvests and donations.
- Be generalized for easy adoption by similar organizations [across the globe](http://fallingfruit.org/sharing).

### How can I help?
If you live in Boulder, join us at a Code for Boulder [Project Night](http://www.meetup.com/CodeForBoulder/)!
If not, fork away!

## Setup

### Dependencies

- [Postgres](http://www.postgresql.org/) (9.4+): Database
- [Node.js](https://nodejs.org/) (0.12+): Server interaction
- [Backbone](https://github.com/jashkenas/backbone): RESTful model interaction
- [Grunt](http://gruntjs.com/): Front-end compilation
- [Coffee](http://coffeescript.org/): Javascript
- [Jade](http://jade-lang.com/): HTML
- [Less](http://lesscss.org/): CSS

### Directory layout

  * /api - application api
  * /build - grunt and npm configuration
  * /db - database configuration
  * /docs - additional documentation
  * /src - app source code
    * /jade - compiles to html
    * /less - compiles to css
    * /coffee - compiles to javascript
  * /www - compiled app source code and static files
    * Source code compiled by grunt
      * /css - compiled from /src/less
      * /js - compiled from /src/coffee
      * /html - compiled from /src/jade
    * Static files
      * /lib - 3rd party libraries
      * /img - images and other graphics
      * /font - fonts

### Database (Postgres 9.4+)

Fire up the `postgres` server, start `psql`, and create a new database and user:

```
CREATE DATABASE fruit_rescue_db;
CREATE ROLE fruit_rescue_user WITH LOGIN PASSWORD 'password';
GRANT ALL ON DATABASE fruit_rescue_db TO fruit_rescue_user;
```

Then, populate the schema:

```
cd db
make setup
```

### Build (Grunt)

You'll want to install NVM (the node version manager) and Node 0.12 or newer. Then:

```
cd build
npm install
```

To use grunt during development:

```
npm install -g grunt-cli
grunt devserver
grunt watch
```

Then browse to http://localhost:9001.

The first command runs a dev server on localhost:9001 and the second one will watch all your less, jade, and coffee files and compile them into /www as needed. To compile manually, run:

```
grunt jade coffee less
```

### API (Node 0.12+)

```
cd api
npm install
node api.js
```