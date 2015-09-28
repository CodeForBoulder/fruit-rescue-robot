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

### Software Dependencies

- [Meteor](https://www.meteor.com/install) - The JavaScript App Platform
- [Coffee](http://coffeescript.org/): Easy-bake Javascript
- [Jade](http://jade-lang.com/): Easy-bake HTML
- [Less](http://lesscss.org/): Easy-bake CSS

### Getting Started

Once the above software is up and running on your console, run the dependencies script in the top directory:

`./dependencies.sh`

This will install all Meteor packages needed to keep the website running. Meteor uses a built-in Mongo DB to keep track of everything, so it's easy to run:

`meteor run`

in Terminal, and you're good to go! Further Meteor help can be found at http://docs.meteor.com/ or http://meteortips.com/

### Directory layout

  * /api - application api
  * /jade - compiles to html
  * /less - compiles to css
  * /coffee - compiles to javascript
  * /docs - Schema and Structure info
