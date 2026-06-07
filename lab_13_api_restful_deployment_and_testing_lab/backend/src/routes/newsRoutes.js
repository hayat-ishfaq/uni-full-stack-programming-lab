const express = require('express')

const { getNewsByCountry } = require('../controllers/newsController')

const router = express.Router()

router.get('/:country', getNewsByCountry)

module.exports = router
