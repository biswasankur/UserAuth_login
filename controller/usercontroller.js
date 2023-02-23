const user = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')


const login = (req, res) => {
        loginData={}
        loginData.email=(req.cookies.email)?req.cookies.email:undefined
        loginData.password=(req.cookies.password)?req.cookies.password:undefined
    res.render('login', {
        title: 'login page',
            data1:loginData,
            data:req.user
    })
}


const register = (req, res) => {
    res.render('register', {
        title: 'register page',
        data:req.user
    })
}

const dashboard = (req, res) => {
    if (req.user) {
        user.find({},function(err,userdetails){
            if (!err) {
                res.render('dashboard', {
                    title: 'dashboard page',
                    data:req.user
                })
            } else {
                console.log(err);
            }
        })
    } 
}


const registercreate = (req, res) => {
    user({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12))

    }).save((err, data) => {
        if (!err) {
            console.log('user register successfully');
            res.redirect('/login')
        } else {
            console.log(err, 'user not added');
            res.redirect('/')
        }
    })
}

const logincreate=(req,res)=>{
    user.findOne({
        email:req.body.email,

    },(err,data)=>{
        if (data) {
            const hashpassord=data.password
            if (bcrypt.compareSync(req.body.password,hashpassord)) {
                const token=jwt.sign({
                    id:data._id,
                    name:data.name,
                },'ankur@123',{expiresIn:'5m'})
                res.cookie('userToken',token)
                if (req.body.rememberme) {
                    res.cookie('email',req.body.email)
                    res.cookie('password',req.body.password)
                    
                }
                console.log(data,'user login successfully');
                res.redirect('/dashboard')
            } else {
                console.log('invalid password');
                res.redirect('/login')
            }
        } else {
            console.log('invalid email');
            res.redirect('/login')
        }
    })

}

const userAuth=(req,res,next)=>{
    if (req.user) {
        console.log(req.user);
        next()
    } else {
        console.log(req.user);
        res.redirect('/login')
    }
}

const logout=(req,res)=>{
     res.clearCookie('userToken')
     res.redirect('/login')
}


module.exports = {
    login,
    register,
    dashboard,
    registercreate,
    logincreate,
    userAuth,
    logout
}