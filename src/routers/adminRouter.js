import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "GET got hit to the admin router"
    })
})

router.post('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'POST got hit to the admin router'
    })
})
router.patch('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'PATCH got hit to the admin router'
    })
})

export default router