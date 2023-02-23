const jwt=require('jsonwebtoken')

exports.userAuth=(req,res,next)=>{
    if (req.cookies && req.cookies.userToken) {
        jwt.verify(req.cookies.userToken,'ankur@123',(err,data)=>{
            req.user=data,next()
        })
    } else {
        next()
    }
}