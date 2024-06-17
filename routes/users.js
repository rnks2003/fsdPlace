const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../server");

router.get("/login", (req, res) => {
    res.render("ejs/login");
});
router.get("/register", (req, res) => {
    res.render("ejs/register");
});
router.get("/read", (req, res) => {
    if (!exports.LoggedInUser) {
        return res.status(400).send('No user logged in');
    }
    const user = exports.LoggedInUser;
    if (!user.isAdmin) {
        console.log("NOT ADMIN");
        User.User.find({"email":user.email, "password":user.password}).then(users => {
            res.render('ejs/readDB', { users: users, isAdmin : false});
        });
    }else{
        console.log("ADMIN");
        User.User.find({}).then(users => {
            res.render('ejs/readDB', { users: users, isAdmin : true});
        });
    }
});
router.get("/update/:email", (req, res) => {
    const email = req.params.email;
    User.User.findOne({"email": email}).then(user => {
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }
        exports.userUpdated = user
        res.render('ejs/update', { user: user });
    }).catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
});
router.get("/delete",(req,res)=>{
    const user = exports.LoggedInUser;
    User.User.deleteMany({ email: { $ne: user.email } }).then(() => {
        // Send toast message notifying success
        res.render('ejs/home', { user: exports.LoggedInUser });
    }).catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
});
router.get("/delete/:email", (req, res) => {
    const email = req.params.email;
    if (exports.LoggedInUser && exports.LoggedInUser.email === email) {
        User.User.find({}).then(users => {
            res.render('ejs/readDB', { users: users, isAdmin : true,warning: 'Cannot delete yourself'});
        });    
    }else{
    User.User.deleteOne({ email: email }).then(() => {
        // Send toast message notifying success
        res.render('ejs/home', { user: exports.LoggedInUser });
    }).catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}
});

router.get("/logout",(req, res) => {
    exports.LoggedInUser = null;
    res.render('ejs/login');
});

router.post("/login", (req, res) => {
    if (!req.body) {
        return res.status(400).send('No request body');
    }
    const email = req.body.email;
    const password = req.body.password;
    User.User.findOne({"email": email}).then(user => {
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }
        if (user.password !== password) {
            return res.render('ejs/login', { user:email,warning: 'Invalid password' });
        }
        exports.LoggedInUser = user;
        res.render('ejs/home', { user: user });
    }).catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
});

router.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const description = req.body.description;
    var isActive = false;
    var isAdmin = false;
    if (req.body.isActive == 'on'){
        isActive=true;
    }
    newUser = {"userName": username, "password": password, "email": email, "description": description, "isAdmin": isAdmin, "isActive": isActive};
    User.User.create(newUser).then(user => {
        if(exports.LoggedInUser){
            res.render('ejs/home', { user: exports.LoggedInUser });
        }else{
            res.render('ejs/login', { user: email, warning: 'Please login' });
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
});

router.post("/update", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const description = req.body.description;
    var isActive = false;
    var isAdmin = false;
    if (req.body.isActive == 'on'){
        isActive=true;
    }
    if (req.body.isAdmin == 'on'){
        isActive=true;
    }
    User.User.updateOne({ email: exports.userUpdated.email }, { userName: username, password: password, email: email, description: description, isAdmin: isAdmin, isActive: isActive }).then(() => {
        User.User.find({}).then(users => {
            res.render('ejs/readDB', { users: users, isAdmin : true});
        });
    }).catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
});


module.exports = router;