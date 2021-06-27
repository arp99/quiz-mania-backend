const express = require('express')
const router = express.Router()
const { createUser } = require('../Controllers/signup.controller')

router.post("/" , createUser )

module.exports = router 