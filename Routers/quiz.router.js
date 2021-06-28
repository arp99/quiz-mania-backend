const express = require('express')
const router = express.Router()
const { verifyAuth } = require('../Middlewares/authentication')
const { getQuizes, getQuizById } = require('../Controllers/quiz.controller')

router.get("/" , getQuizes )

router.get("/:quizId" , verifyAuth , getQuizById )

module.exports = router
