const { allowededOrignins } = require('./alloweder_origins')

const corsOptions = {
  origin: (origin, callback) => {
    if (allowededOrignins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not alloweded by cors.'))
    }
  },
  Credential: true,
  optionsSuccessStatus: 200
}

module.exports.corsOptions = corsOptions