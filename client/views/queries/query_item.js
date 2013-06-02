Template.queryItem.helpers({
  lastUpdate: function(){
    date = new Date(this.updatedAt);
    return date.toDateString();
  }
});
