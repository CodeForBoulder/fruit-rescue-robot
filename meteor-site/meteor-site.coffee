# All of our global variables
Humans = new (Mongo.Collection)('humans')
Harvesters = new (Mongo.Collection)('harvesters')
Admins = new (Mongo.Collection)('admins')
Coordinators = new (Mongo.Collection)('coordinators')
Properties = new (Mongo.Collection)('properties')
Trees = new (Mongo.Collection)('trees')
HumanProperties = new (Mongo.Collection)('human_properties')
Harvests = new (Mongo.Collection)('harvests')

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

if Meteor.isServer
  Meteor.startup ->
    # code to run on server at startup
    return