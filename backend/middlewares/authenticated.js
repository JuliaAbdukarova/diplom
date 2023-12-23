const User = require('../models/User');
const { verify } = require('../helpers/token')

module.exports = async function (req, res, next) {
    
    if (!req.cookies.token) {
        res.send({error: 'Token missing'});
        return;
    }

    const tokenData = verify(req.cookies.token)
    //console.log(req.cookies.token);
    //console.log(tokenData.id);
    
    const user = await User.findOne({_id: tokenData.id})
    
    if (!user) {
       res.send({error: 'Authenicated user not be found'})
       return;
    }
    
    req.user = user;

    next()
}