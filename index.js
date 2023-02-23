const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const userAuth = require('./middlewere/userAuth')
const flash = require('connect-flash')
const session = require('express-session')
const cookieparser = require('cookie-parser')
const port = 2190;

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(flash())

app.use(cookieparser())

app.use(session({
    cookie: { maxAge: 50000 },
    secret: 'ankur',
    resave: false,
    saveUninitialized: false
}))


app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(userAuth.userAuth)

const userRoute = require('./route/userRoute')
app.use(userRoute)

const DBcon = "mongodb+srv://nodejsclassankur:CpVfVq2FNymc72Cm@cluster0.vgutcj7.mongodb.net/loginAuthentication"
mongoose.connect(DBcon, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(port, () => {
            console.log(`server connected`);
            console.log(`server is running at http://localhost:${port}`);

        })
    }).catch(err => {
        console.log(err);
    })

