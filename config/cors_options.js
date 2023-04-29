const { allowededOrignins } = require('./alloweder_origins')

const corsOptions = {
  origin: (origin, callback) => {
    if (true || allowededOrignins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not alloweded by cors.'))
    }
  },
  optionsSuccessStatus: 200,
  Credential: true,
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}

module.exports.corsOptions = corsOptions