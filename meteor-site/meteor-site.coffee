# All of our global variables
Humans = new (Mongo.Collection)('humans')
Harvesters = new (Mongo.Collection)('harvesters')
Admins = new (Mongo.Collection)('admins')
Coordinators = new (Mongo.Collection)('coordinators')
Properties = new (Mongo.Collection)('properties')
Trees = new (Mongo.Collection)('trees')
HumanProperties = new (Mongo.Collection)('human_properties')
Harvests = new (Mongo.Collection)('harvests')

# All of our routes
Router.route('/');

if Meteor.isClient
  # User accounts
  Accounts.ui.config =
    passwordSignupFields: 'USERNAME_ONLY'
  
  Template.addTreeForm.events 
    'submit form': ()->
      event.preventDefault()
      Trees.insert
        name: event.target.tree.value
        owner: Meteor.userId()
        username: Meteor.user().username
  
  Template.treeList.helpers
    'trees': ()->
      Trees.find()

  Template.register.events
    'submit form': ->
      event.preventDefault()
      firstname = $('[name=first_name]').val()
      lastname = $('[name=last_name]').val()
      email = $('[name=email]').val()
      password = $('[name=password]').val()
      # Make the account first...
      Accounts.createUser
        username: email
        email: email
        password: password
      # ...and then the Human object
      HumansList.insert
        first_name: firstname
        last_name: lastname
        email: email
        owner: Meteor.userId()
        username: email
      # Router.go 'meteor-site'
      return

if Meteor.isServer
  Meteor.startup ->
    # code to run on server at startup
    return
