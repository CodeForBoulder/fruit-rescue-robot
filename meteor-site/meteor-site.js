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

		Template.register.events({
				'submit form': function () {
						event.preventDefault();
						var firstname = $('[name=first_name]').val();
						var lastname = $('[name=last_name]').val();
						var email = $('[name=email]').val();
						var password = $('[name=password]').val();
						// Make the account first...
						Accounts.createUser({
								username: email, 
								email: email,
								password: password
						});
						// ...and then the Human object
						HumansList.insert({
								first_name: firstname,
								last_name: lastname,
								email: email,
								owner: Meteor.userId(),
								username: email
						});
						Router.go('meteor-site');
				}
		});
		
}

if (Meteor.isServer) {
		Meteor.startup(function () {
				// code to run on server at startup
		});
}
