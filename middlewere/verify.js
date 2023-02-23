const usermodel = require('../model/user')

exports.Checkduplicate = (req, res, next) => {
    usermodel.findOne({
        email: req.body.email
    }).exec((err, email) => {
        if (err) {
            console.log(err);
            return
        }
        if (email) {
            console.log('email alrdy exist');
            return res.redirect('/')
        }

        const password = req.body.password
        const confirmpassword = req.body.confirmpassword
        if (password !== confirmpassword) {
            return res.redirect('/')
        }
        next()
    })
}