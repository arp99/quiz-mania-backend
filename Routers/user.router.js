const express = require('express')
const router = express.Router()
const { verifyAuth } = require('../Middlewares/authentication')
const { getUserData, getAllUserNames, saveQuizResults } = require('../Controllers/user.controller')

router.get( "/" , verifyAuth , getUserData )
router.get("/all", getAllUserNames )
router.post("/results" , verifyAuth, saveQuizResults )
module.exports = router
