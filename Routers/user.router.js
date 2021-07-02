const express = require('express')
const router = express.Router()
const { verifyAuth } = require('../Middlewares/authentication')
const { getUserData, getAllUserNames } = require('../Controllers/user.controller')

router.get( "/" , verifyAuth , getUserData )
router.get("/all", getAllUserNames )
module.exports = router
