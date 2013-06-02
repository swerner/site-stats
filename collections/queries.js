Queries = new Meteor.Collection('queries');

Meteor.methods({
  query: function(queryAttributes){
    var queryWithSameQuery = Queries.findOne({query: queryAttributes.query});

    if(!queryAttributes.title)
      throw new Meteor.Error(422, 'Please fill in the title');

    if(!queryAttributes.query)
      throw new Meteor.Error(422, 'Please fill in the query');

    var queryId = Queries.insert(queryAttributes);

    Meteor.call('getQueryValue', Queries.findOne(queryId), function(error, result){
      if(error) { console.log(error.reason); }
    });
  },

  getQueryValue: function(attributes){
    if (! this.isSimulation){
      var Future = Npm.require('fibers/future');
      var future = new Future();

      var queryResults = 10;

      query = pgClient.query(attributes["query"], function(err, result) {
        queryResults = result["rows"][0]["count"];
        future.ret();
      });

      future.wait();
      Queries.update(attributes._id, {
        $set: {
          result: queryResults,
          updatedAt: new Date().getTime()
        }
      });
    }
  }
});
