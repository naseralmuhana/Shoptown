import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import morgan from "morgan"

import connectDB from "./config/db.config.js"
import routes from "./routes/index.js"
import constants from "./constants/index.js"
import { errorHandler, notFound } from "./middleware/error.middleware.js"

//loads environment variables from a .env
dotenv.config()

// Connect to Database
connectDB()

// Initializing the express app
const app = express()
const PORT = process.env.PORT || constants.port
const MODE = process.env.NODE_ENV || constants.developmentMode

// middleware that parses both json and urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (MODE === constants.developmentMode) {
  // HTTP request logger middleware
  app.use(morgan("dev"))
}

// registering routes
app.use(routes)

// Error Middleware (page not found - handle errors)
app.use(notFound)
app.use(errorHandler)

// App listening on the below port
app.listen(
  PORT,
  console.log(
    `Server running in`.yellow.bold,
    `${MODE}`.yellow.bold.underline,
    `mode on`.yellow.bold,
    `http://localhost:${PORT}`.yellow.bold.underline
  )
)
