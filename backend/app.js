const express = require('express')
const app = express()
let bodyParser = require('body-parser')
let cors = require('cors')

const stripe = require('./stripeConf')

var User = require('./user')
var Item = require('./item')
// add
let uuid = require('node-uuid')
const bcrypt = require('bcrypt')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.text())
app.use(bodyParser.json({type: 'application/json'}))
app.use(cors())

// in NodeJS/Express (server)
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Access-Control-Allow-Headers')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT')
  next()
})

app.get('/users', (req, res) => {
	User.all()
		.then(function (users) {
		  res.status(200)
			.json(users)
		})
		.catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {error: err,
        message: err.message}});
		  })
})

app.get('/userByName', (req, res) => {
  //console.log(req.query.name)
  User.byName(req.query.name)
		.then(function (users) {
		  res.status(200)
			.json(users)
		})
		.catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {error: err,
        message: err.message}});
		  })
})// update getByUserId

app.get('/userById', (req, res) => {
	console.log(req.query.id);
  let userId = req.query.id
  User.byId(userId).then(function (users) {
    if (!users) {
      return res.status(404).json({ error: true, message: 'user not found' })
    } else {
      console.log(users)
      res.status(200).json(users)
    }
  }).catch((err) => {
    console.log(err)
    res.status(500).json({error: true, data: {error: err, message: err.message}})
  })
})
app.post('/user/create', (req, res) => {
  console.log(req.body);
  bcrypt.hash(req.body.user.password, 10, function(err, hash) {
    let user = {
      'name': req.body.user.name,
      'email': req.body.user.email,
      'password': hash,
      'token': uuid.v1()
      }
    User.forge(user)
            .save()
            .then((user) => {
              console.log(user)
              res.status(200)
                .json(user)
            })
            .catch((err) => {
              console.log(err)
              res.status(500).json({error: true, data: {error: err, message: err.message}})
            })
  })
})
app.get('/user/login', (req, res) => {
  let username = req.query.email
  let password = req.query.password

  User.forge({email: username}).fetch().then(function (users) {
    if (!users) {
      return res.status(200).json({ logged: false, error: 'Wrong email entered.' })
    } else {
      bcrypt.compare(password, users.attributes.password, function(err, match) {
      let response = { logged: false, email: users.attributes.email, name: users.attributes.name, id: users.attributes.id, token: users.attributes.token, error: ''}
      if(match) {
        response.logged = true
        return res.status(200).json(response)
      } else {
        response.logged = false
        response.error = 'Wrong password entered'
        return res.status(200).json(response)
      }
    })
    }
  }).catch((err) => {
    console.log(err)
    res.status(500).json({error: true, data: {error: err, message: err.message}})
  })
})
app.post('/user/update', (req, res) => {
  console.log(req.body);
  bcrypt.hash(req.body.user.password, 10, function(err, hash) {
    let user = {
    'id': req.body.user.id,
    'name': req.body.user.name,
    'email': req.body.user.email,
    'password': hash,
    'token': uuid.v1()
    }
    User.forge(user)
          .save()
          .then((user) => {
            console.log(user)
            res.status(200)
              .json(user)
          })
          .catch((err) => {
            console.log(err)
            res.status(500).json({error: true, data: {error: err, message: err.message}})
          })
        })
})
app.get('/user/delete', (req, res) => {
	console.log(req.query.id);
  let userId = req.query.id
  User.forge({id: userId}).fetch().then(function (users) {
    if (!users) {
      return res.status(404).json({ error: true, message: 'user not found' })
    } else {
      users.destroy()
      res.status(200).json({ error: false, data: { message: 'user removed' } })
    }
  }).catch((err) => {
    console.log(err)
    res.status(500).json({error: true, data: {error: err, message: err.message}})
  })
})//addd create item and modify update


// items routes
// http://localhost:3000/items
app.get('/items', (req, res) => {
	Item.all()
		.then(function (items) {
		  res.status(200)
			.json(items)
		})
		.catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {error: err,
        message: err.message}});
		  })
})
// http://localhost:3000/item/name
app.get('/item/name', (req, res) => {
  //console.log(req.query.name)
  Item.byName(req.query.name)
		.then(function (items) {
		  res.status(200)
			.json(items)
		})
		.catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {error: err,
        message: err.message}});
		  })
})
// http://localhost:3000/item/id
app.get('/item/id', (req, res) => {
	// console.log(req.query.id);
  let itemId = req.query.id
  Item.forge({id: itemId}).fetch().then(function (items) {
    if (!items) {
      return res.status(404).json({ error: true, message: 'item not found' })
    } else {
      res.status(200).json(items)
    }
  }).catch((err) => {
    console.log(err)
    res.status(500).json({error: true, data: {error: err, message: err.message}})
  })
})

// http://localhost:3000/user/items
app.get('/user/items', (req, res) => {
	// console.log(req.query.id);
  let userId = req.query.userId
  Item.byUserId(userId)
		.then(function (items) {
		  res.status(200)
			.json(items)
		})
		.catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {error: err,
        message: err.message}});
		  })
})
app.post('/item/update', (req, res) => {
	console.log(req.body);
  let item = {
  'id': req.body.item.id,
  'name': req.body.item.name,
  'userId': req.body.userId,
  'description': req.body.item.description,
  'price': req.body.item.price,
  'category': req.body.item.category

  }
Item.forge(item)
        .save()
        .then((item) => {
          console.log(item)
          res.status(200)
            .json(item)
        })
        .catch((err) => {
          console.log(err)
          res.status(500).json({error: true, data: {error: err, message: err.message}})
        })
})
app.post('/item/create', (req, res) => {
  console.log(req.body);
    let item = {
      'id': req.body.id,
      'name': req.body.name,
		  'userId': req.body.userId,
      'description': req.body.description,
      'price': req.body.item.price,
      'category': req.body.item.category
      }
    Item.forge(item)
            .save()
            .then((item) => {
              console.log(item)
              res.status(200)
                .json(item)
            })
            .catch((err) => {
              console.log(err)
              res.status(500).json({error: true, data: {error: err, message: err.message}})
            })
})

app.get('/item/delete', (req, res) => {
	console.log(req.query.id);
  let itemId = req.query.id
  Item.forge({id: itemId}).fetch().then(function (items) {
    if (!items) {
      return res.status(404).json({ error: true, message: 'item not found' })
    } else {
      items.destroy()
      res.status(200).json({ error: false, data: { message: 'item removed' } })
    }
  }).catch((err) => {
    console.log(err)
    res.status(500).json({error: true, data: {error: err, message: err.message}})
  })
})


const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    console.log(stripeErr)
    res.status(500).send({ error: stripeErr })
  } else {
    res.status(200).send({ success: stripeRes })
  }
}
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
