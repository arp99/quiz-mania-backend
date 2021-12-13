const express = require('express')
const router = express.Router()
const { verifyAuth } = require('../Middlewares/authentication')
const { getUserData, getAllUserNames, saveQuizResults, getLeaderBoardForQuiz } = require('../Controllers/user.controller')

router.get( "/" , verifyAuth , getUserData )
router.get("/all", getAllUserNames )
router.post("/results" , verifyAuth, saveQuizResults )
router.get("/leaderboard", verifyAuth, getLeaderBoardForQuiz )
module.exports = router
