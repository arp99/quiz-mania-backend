const express = require('express')
const router = express.eouter()
const { loginUser } = require('../Controllers/login.controller')

router.post("/" , loginUser )

module.exports = router