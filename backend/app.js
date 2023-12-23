
require('dotenv').config()
//DB_CONNECTION_STRING = "mongodb+srv://atimkam:pBJy176617WzGBhA@cluster0.h8jvexi.mongodb.net/blog?retryWrites=true&w=majority"

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const {register, login, getUsers, getRoles, updateUser, deleteUser, getUserFromCookie} 
                    = require('./controllers/user');
const {addPost, editPost, deletePost, getPosts, getPost} = require('./controllers/post');
const {addComment, deleteComment } = require('./controllers/comment');

const mapUser = require('./helpers/mapUser');
const mapPost = require('./helpers/mapPost');
const mapComment = require('./helpers/mapComment');

const authenicated = require('./middlewares/authenticated')
const hasRole = require('./middlewares/hasRole')
const ROLES = require('./constants/roles');

// accounting -->
const categoryController = require('./controllers/category-controller')
const accountController = require('./controllers/account-controller')
const accountTypeController = require('./controllers/account-type-controller')
const transactionController = require('./controllers/transaction-controller');
const mapCategory = require('./helpers/mapCategory');
const reportController = require('./controllers/report-controller');

// accounting <--

const app = express();

app.use(express.static('../frontend/build'))
app.use(cookieParser());
app.use(express.json())


//accounting -->
app.post('/api/category/create', categoryController.create)
app.delete('/api/category/:id', categoryController.delete)
app.patch('/api/category/:id',categoryController.update)
app.get('/api/category/:id', async (req, res, next) => { categoryController.getOne(req, res, next) })
app.get('/api/category', async (req, res, next) => {
    const category = await categoryController.getAllByUser(req, res, next);
    
    //res.send({ data: { category }});
})

app.post('/api/accounttype/create', accountTypeController.create)
app.delete('/api/accounttype/:id', accountTypeController.delete)
app.patch('/api/accounttype/:id',accountTypeController.update)
app.get('/api/accounttype/:id', async (req, res, next) => { accountTypeController.getOne(req, res, next) })
app.get('/api/accounttype',async (req, res, next) => { accountTypeController.getAllByUser(req, res, next) })

app.post('/api/account/create', accountController.create)
app.delete('/api/account/:id', accountController.delete)
app.patch('/api/account/:id',accountController.update)
app.get('/api/account/:id', async (req, res, next) => { accountController.getOne(req, res, next) })
app.get('/api/account',async (req, res, next) => { accountController.getAllByUser(req, res, next) })

app.post('/api/transaction/create', transactionController.create)
app.delete('/api/transaction/:id', transactionController.delete)
app.patch('/api/transaction/:id',transactionController.update)
app.get('/api/transaction/:id', async (req, res, next) => { transactionController.getOne(req, res, next) })
app.get('/api/transaction',async (req, res, next) => { transactionController.getAllByUser(req, res, next) })

app.get('/api/report/AmountByMonth/:direction',async (req, res, next) => { reportController.reportAmountByMonth(req, res, next) })
app.get('/api/report/AmountByCategory/:direction',async (req, res, next) => { reportController.reportAmountByCategory(req, res, next) })
app.get('/api/report/AmountByAccount/:direction',async (req, res, next) => { reportController.reportAmountByAccount(req, res, next) })

//accounting <--

app.post('/register', async (req, res) => {
    try {
        const {user, token} = await register(req.body.login, req.body.password);
        res.cookie('token', token, {httpOnly: true})
        .send({error:null,  user: mapUser(user) });
    } catch (e) {
        res.send({error: e.message || "Unknown error"});
    }
});

app.post('/login', async (req, res) => {
    try {
        const {user, token} = await login(req.body.login, req.body.password);

        res.cookie('token', token, {httpOnly: true})
            .send({error:null,  user: mapUser(user) });

    } catch (e) {
        res.send({error: e.message || "Unknown error"});
    }
});

app.post('/logout',  (req, res) => {
    res.cookie('token', '', {httpOnly: true})
            .send({});
});

app.get('/posts', async (req, res) => {
    const {posts, lastPage} = await getPosts(
        req.query?.search,
        req.query?.limit,
        req.query?.page
    );

    res.send( { data: { lastPage, posts: posts.map(mapPost) }} );
})

app.get('/posts/:id', async (req, res) => {
    const post = await getPost(req.params.id);
    res.send( { data: mapPost(post) } );
})

app.use(authenicated)

app.delete('/posts/:postId/:comments/:commentId', hasRole([ROLES.ADMIN, ROLES.MODERATOR ]), async (req, res) => {
    await deleteComment(
        req.params.postId,
        req.params.commentId,
    )
    res.send( { error: null});
})

app.post('/posts/:id/:comments', async (req, res) => {
    const newComment = await addComment(req.params.id, {
        content: req.body.content,
        author: req.user.id
    })
    res.send( { data: mapComment(newComment)});
})

app.post('/posts', hasRole([ROLES.ADMIN]), async (req, res) => {
    const newPost = await addPost(req.body.newPostData);
    res.send({ data: mapPost(newPost)});
})

app.patch('/posts/:id', hasRole([ROLES.ADMIN]), async  (req, res) => {
    const updatedPost = await editPost(
        req.params.id, req.body.newPostData
    );

    res.send({ data: mapPost(updatedPost)});
});

app.delete('/posts/:id', hasRole([ROLES.ADMIN]), async  (req, res) => {
    await deletePost(req.params.id);
    
    res.send({error: null})
});

app.get('/users', hasRole([ROLES.ADMIN]), async (req, res) => {
    const users = await getUsers();
    res.send({data: users.map(mapUser)})
})

app.get('/users/roles', hasRole([ROLES.ADMIN]), async (req, res) => {
    const roles =  getRoles();
    res.send({data: roles})
})

app.patch('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
    const newUser = await updateUser(req.params.id, {
        roleId: req.body.roleId
    });
    res.send({data: mapUser(newUser)})
})

app.delete('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
    await deleteUser(req.params.id);
    res.send({errror:null})
})

app.get('/api/user/getUserFromCookie', async (req, res) => {
    const {user} = await getUserFromCookie(req);
    res.send({user})
})

const PORT = process.env.PORT || 5000

try {
     mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
   app.listen(PORT, ()=> console.log(`[backend] My server started on PORT = ${PORT}`))
} catch(e) {
    console.log(e)
}
