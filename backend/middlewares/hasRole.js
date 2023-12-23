//const mapUser = require('../helpers/mapUser');
//const User = require('../models/User');
//const { verify } = require('../helpers/token')

module.exports =  function (roles) {
    return (req, res, next) => {
        //console.log('hasRole req.user ', req.user);
        /*
        if (!req.user) {
            const tokenData = verify(req.cookies.token)
            const user = User.findOne({_id: tokenData.id})
            req.user = user
        }
        
        console.log('hasRole req.user: ', mapUser(req.user));
        console.log('hasRole req.cookies.token: ', req.cookies.token);
        */
        if (!roles.includes(req.user.roleId)) {
            res.send({error: 'Access denied'})
            return;
        }   
        next();     
    } 
}