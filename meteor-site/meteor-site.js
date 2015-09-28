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
		// User accounts
		Accounts.ui.config({
				passwordSignupFields: "USERNAME_ONLY"
		});
		
		Template.addfruitform.events({
				'submit form': function () {
						event.preventDefault();
						var fruitVar = event.target.fruit;
						TreesList.insert({
								name: fruitVar,
								owner: Meteor.userId(),
								username: Meteor.user().username
						});
				}
		});
		
}

if (Meteor.isServer) {
		Meteor.startup(function () {
				// code to run on server at startup
		});
}
