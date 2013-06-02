pgConString = process.env.STATS_DASHBOARD_DB;

Meteor.startup(function(){
  pg = Npm.require('pg');

  pgClient = new pg.Client(pgConString);
  pgClient.connect();

  _.each(Queries.find().fetch(), function(element){
    Meteor.call('getQueryValue', element, function(error, result){
      if (error) { console.log(error.reason); }
    });
  })
});
