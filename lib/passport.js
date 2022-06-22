const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

const admin = {
  id: Math.floor(Math.random() * 100),
  username: 'admin',
  password: bcrypt.hashSync('123456', 10)
}

// Nanti diganti jadi model
function User({ id, username, password }) {
  this.id = id
  this.username = username
  this.password = password
  return this
}

User.findOne = function({ username }) {
  if (username !== 'admin') return Promise.resolve(null)
  const user = new User(admin)
  return Promise.resolve(user)
}

User.findByPk = function(id) {
  if (admin.id === id) {
    const user = new User(admin)
    return Promise.resolve(user)
  }
  return Promise.resolve(null)
}

User.prototype.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password) 
}

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username })
      .then(user => {
        if (!user) return done(null, false)
        if (!user.verifyPassword(password)) return done(null, false) 
        return done(null, user)
      })
  })
)

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => done(null, await User.findByPk(id)))

module.exports = passport
