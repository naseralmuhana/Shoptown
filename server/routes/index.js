import express from "express"

const router = express.Router()

// Initial Route
router.route("/").get((req, res) => {
  res.send("API is still running....")
})

// Routes

export default router
