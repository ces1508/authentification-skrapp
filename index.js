const {JwtStrategy, ExtactJwt} = require('passport-jwt')
const jwtOptions = {}
const SECRET = process.env.SECRET_TOKEN
jwtOptions.jwtFromRequest = ExtactJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = SECRET
const request = require('request')

const Strategy = new JwtStrategy(jwtOptions, (payload, done) => {
  let options = {
    meethod: 'GET',
    uri: `http://users/${payload.id}`,
    json: true
  }
  request(options, (err, data) => {
    if (err) {
      return done(true, null)
    }
    let { user } = data.body
    return done(null, user)
  })
})

module.exports = Strategy
