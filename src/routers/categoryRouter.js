import express from "express"
const router = express.Router()

router.post("/", (req, res, next) => {
    try {
        console.log(req.body)
    } catch (error) {
        console.log(error)
        error.status = 500
        next(error)
    }
})

export default router;