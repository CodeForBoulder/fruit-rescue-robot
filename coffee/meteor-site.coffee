# Collections
Humans = new Mongo.Collection('humans')
Trees = new Mongo.Collection('trees')
Harvests = new Mongo.Collection('harvests')

# Routes
Router.route('/');

# Client
if Meteor.isClient
  
  Template.register.events
    'submit form': ->
      event.preventDefault()
      # User (for authorization)
      Accounts.createUser
        email: event.target.email.value
        password: event.target.password.value
      # Human
      Humans.insert
        user_id: Meteor.userId()
        first_name: event.target.first_name.value
        last_name: event.target.last_name.value
      # Router.go('meteor-site')
      return

# Server
if Meteor.isServer
  Meteor.startup ->
    # code to run on server at startup
    return
