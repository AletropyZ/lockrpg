const express = require('express');
const router = express.Router();
const User = require('../database/models/User');

//Posts to main pages

router.get('/', (req, res) => { //Index page
    if (!req.session.isAuth) return res.redirect('/login');
    res.render('index');
});

router.get('/inventario', (req,res) => {
    if(!req.session.isAuth) return res.redirect('/login');
    res.render('inventory');
})

router.get('/login', (req, res) => { //Login Page
    if (req.session.isAuth) return res.redirect('/');
    res.render('auth/login');
});

router.get('/register', (req, res) => { //Register Page
    if (req.session.isAuth) return res.redirect('/');
    res.render('auth/register');
});

router.get('/logout', (req,res) => {
    if(req.session.isAuth) {
        req.session.isAuth = false;
        res.clearCookie("userId");
        res.redirect('/login');
    } else return res.redirect('/login');
});

//Posts to auth pages
router.post('/login', (req, res) => { //Login post
    const { email, password } = req.body;

    User.findOne({email: email}, 'login email password', (err,user) => {

        if(user == null) return res.redirect('/login?error=dog');
        if(user.password !== password) return res.redirect('/login?error=cat');

        req.session.isAuth = true;
        res.cookie("userId", user._id);
        res.redirect('/');
    });

});

router.post('/register', (req, res) => { //Register Post
    const { username, email, password, repassword } = req.body;

    //Verifica se a senha e a confimação são iguais
    if (password !== repassword) return res.redirect('/register?error=cat');

    User.findOne({ email: email }, 'login email', (err, user) => {

        if(user != null) return res.redirect('/register?error=dog');

        new User({
            login: username,
            email: email,
            password: password,
            playerInfo: [
                Info = {
                    name: "Nome",
                    age: 0,
                    height: 0,
                    race: "Raça"
                },
                pInfo = {
                    vida: {
                        current: 0,
                        max: 0
                    },
                    chaos: {
                        current: 0,
                        max: 0
                    },
                    strength: 0,
                    agility: 0,
                    intelligence: 0,
                    presence: 0,
                    re_points: 5
                }
            ],
            playerInventory: []
        }).save();

        res.redirect('/login?registered=true');
    });
});

module.exports = router;