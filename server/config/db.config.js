import mongoose from "mongoose"
import slug from "mongoose-slug-generator"
import uniqueValidator from "mongoose-unique-validator"
import mongooseAutoPopulate from "mongoose-autopopulate"
import constants from "../constants/index.js"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {})
    console.log(
      `MongoDB Connected to host`.cyan.bold,
      `${conn.connection.host}`.cyan.bold.underline
    )
  } catch (error) {
    console.error(`Error:`.red.bold, `${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

mongoose.set("strictQuery", false)

// a plugin for creating slugs based on mongoose schema fields
mongoose.plugin(slug, { separator: "-", lang: "en" })
// a plugin which adds pre-save validation for unique fields within a Mongoose schema
mongoose.plugin(uniqueValidator, { message: constants.uniqueValidatorMessage })
// a plugin which supports an autopopulate option in schemas
mongoose.plugin(mongooseAutoPopulate)

export default connectDB
