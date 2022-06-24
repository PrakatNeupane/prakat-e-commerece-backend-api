import express from 'express'
import { dbConnect } from './src/dbconfig/dbconfig.js'
const app = express()
import "dotenv/config"


const PORT = process.env.PORT || 8000

// use middlewares
app.use(express.json())

// mongodb connect
dbConnect()

// routers
import adminRouter from './src/routers/adminRouter.js'
app.use('/api/v1/admin', adminRouter)

// error handling
app.use((err, req, res, next) => {
    console.log(err)
    res.json({
        status: 'error',
        message: "❌" + err.message,
    })
})

// to serve on the internet
app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`server is running on http://localhost:${PORT}`)
})