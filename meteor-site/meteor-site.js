// All of our global variables

// Types of humans...
HumansList = new Mongo.Collection('humans');
HarvestersList = new Mongo.Collection('harvesters');
AdminsList = new Mongo.Collection('admins');
CoordinatorsList = new Mongo.Collection('coordinators');

PropertiesList = new Mongo.Collection('properties');
TreesList = new Mongo.Collection('trees');
HumanPropertiesList = new Mongo.Collection('human_properties');
HarvestsList = new Mongo.Collection('harvests');

if (Meteor.isClient) {
		// counter starts at 0
		Session.setDefault('counter', 0);

		Template.hello.helpers({
				counter: function () {
						return Session.get('counter');
				}
		});

		Template.hello.events({
				'click button': function () {
						// increment the counter when button is clicked
						Session.set('counter', Session.get('counter') + 1);
				}
		});
}

if (Meteor.isServer) {
		Meteor.startup(function () {
				// code to run on server at startup
		});
}
