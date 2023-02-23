const express=require('express')
const route=express.Router()
const controller=require('../controller/usercontroller')
const verify=require('../middlewere/verify')


route.get('/login',controller.login)
route.post('/logincreate',controller.logincreate)
route.get('/',controller.register)
route.post('/registercreate',[verify.Checkduplicate],controller.registercreate)
route.get('/dashboard',controller.userAuth,controller.dashboard)
route.get('/logout',controller.logout)


module.exports=route
