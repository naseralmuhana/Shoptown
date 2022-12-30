import { format } from "date-fns"
import { v4 as uuidv4 } from "uuid"
import fs from "fs"
import fsPromises from "fs/promises"
import path from "path"

const __dirname = path.resolve()

export const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss")
  const logItem = `${dateTime}\t${uuidv4()}\t${message}}\n`

  try {
    const dir = path.join(__dirname, "./server", "logs")
    if (!fs.existsSync(dir)) {
      await fsPromises.mkdir(dir)
    }
    await fsPromises.appendFile(
      path.join(__dirname, "./server", "logs", logFileName),
      logItem
    )
  } catch (error) {
    console.log(error)
  }
}

export const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log")
  next()
}

// PUT this in index.js
// app.use(logger)
