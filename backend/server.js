const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
require('dotenv').config()
const blogRoutes = require('./routes/blogs')
const authRoutes = require('./routes/auth')

const app = express()

connectDB();

app.use(morgan('dev'))
app.use(express.json({ extended: false })) //to access req.body
app.use(cookieParser())

//Routes
app.use('/api', blogRoutes);
app.use('/api', authRoutes);

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})