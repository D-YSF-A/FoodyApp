let bookshelf = require('./db')
let Item = require('./item')

const User = bookshelf.model.Model.extend({
  tableName: 'User',
  items: function(){
    return this.hasMany(Item, ['userId']);
},
}, {
  byId: function (id) {
    return this.forge().query({where:{ 'id': id }}).fetch({withRelated: [ 'items']})
  },
  all:  function() {
    return this.forge().fetchAll({withRelated: [ 'items']})
  },
  byName: function (name) {
    return this.forge().query({where:{ 'User.name': name }}).fetchAll({withRelated: [ 'items']})
  }
}
)

module.exports = User
