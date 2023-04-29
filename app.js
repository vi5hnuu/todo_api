const express = require('express')
const cors = require('cors')
const { route: userRoute } = require('./Routes/UserRoute')
const { route: taskRoute } = require('./Routes/TaskRoute')
const { error: errorMW } = require('./middlewares/error')
const { corsOptions } = require('./config/cors_options')
const cookieParser = require('cookie-parser')

const app = express()


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use(cors(corsOptions))
// app.use(cors())

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1', userRoute)
app.use('/api/v1', taskRoute)

app.use(errorMW)

module.exports.app = app;