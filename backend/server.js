const express = require('express')
const morgan = require('morgan')
var cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
require('dotenv').config()
const blogRoutes = require('./routes/blogs')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')

const app = express()

connectDB();

app.use(cors())  //ADDED TO TAKE CARE OF CORS ERROR - MAY WANT TO REMOVE ON DEPLOY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.use(morgan('dev'))
app.use(express.json({ extended: false })) //to access req.body
app.use(cookieParser())

//Routes
app.use('/api', blogRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes)

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})