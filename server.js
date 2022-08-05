import express from 'express'
import { dbConnect } from './src/dbconfig/dbconfig.js'
const app = express()
import "dotenv/config"
import cors from 'cors'
import morgan from 'morgan'
import helmet from "helmet";


const PORT = process.env.PORT || 8000

// use middlewares
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

// mongodb connect
dbConnect()

// routers
import adminRouter from './src/routers/adminRouter.js'
import categoryRouter from './src/routers/categoryRouter.js'
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/category', categoryRouter)

app.get("/", (req, res) => {
    res.json({
        message: "you have reached the admin api"
    })
})

// error handling
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 400)
    res.json({
        status: 'error',
        message: "❌ ❌" + err.message,
    })
})

// to serve on the internet
app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`server is running on http://localhost:${PORT}`)
})