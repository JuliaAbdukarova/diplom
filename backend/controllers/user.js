const bcrypt = require('bcrypt');
const User = require('../models/User');
const {generate} = require('../helpers/token');
const ROLES = require('../constants/roles');
const { verify } = require('../helpers/token')

async function register(login, password) {
    if (!password) {
        throw new Error('Password is empty');
    }

    const passwordHash = await bcrypt.hash(password,10);
    
    const user = await User.create({
        login,
        password:passwordHash
    });

    const token = generate({id: user.id});

    return {user, token};
}

async function login(login, password) {
    if (!login) {
        throw new Error('Login is empty');
    } 

    if (!password) {
        throw new Error('Password is empty');
    }
    
    const user = await User.findOne({login});
    if (!user) {
        throw new Error('User is not found');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error('Wrong password');
    }

    const token = generate({id: user.id});

    //console.log(user)
    return {user, token};
}

async function getUsers() {
    return User.find();
}

function getRoles() {
    return [
        {id: ROLES.ADMIN, name: 'Admin'},
        {id: ROLES.MODERATOR, name: 'Moderator'},
        {id: ROLES.USER, name: 'User'}
    ]
}

async function deleteUser(id) {
    return User.deleteOne({_id: id});
}

async function updateUser(id, userData) {
    return User.findByIdAndUpdate(id, userData, {returnDocument: 'after'});
}

async function getUserFromCookie(req) {
    let  user = null;
    //console.log('req.cookies?.token = ' , req.cookies?.token);

    if (req.cookies?.token) { 
        const token = verify(req.cookies.token)
        //console.log("!! ", req.cookies.token);
        //console.log("!! ", token.id);    
        user  = await User.findOne({_id: token.id})
    }

    return {user};
}


module.exports = {
    register,
    login,
    getUsers,
    getRoles,
    deleteUser,
    updateUser,
    getUserFromCookie
}