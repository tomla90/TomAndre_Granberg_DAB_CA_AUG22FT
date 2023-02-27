var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require("../models");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Express', user: req.user });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/signup', function (req, res, next) {
  res.render('signup', { title: 'Express', user: req.user });
});

router.post('/signup', function(req, res, next) {
  const { firstname, lastname, username, password } = req.body;
  const fullName = `${firstname} ${lastname}`;
  const role = 'user';
  db.User.max('id').then(maxId => {
    const newId = (maxId || 0) + 1;
    return db.User.create({
      id: newId,
      FullName: fullName,
      Username: username,
      Password: password,
      Role: role
    });
  }).then(user => {
    res.redirect('/login');
  }).catch(error => {
    console.log(error);
    res.redirect('/signup');
  });
});

router.get('/logout', function (req, res, next) {
  req.logout(function(err){
    if(err) return next(err);
    res.redirect('/');
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.User.findOne({ where: { Username: username } }).then(user => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.Password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    }).catch(error => {
      console.log(error);
      return done(error);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.findOne({ where: { id: id } }).then(user => {
    done(null, user);
  }).catch(error => {
    console.log(error);
    done(error);
  });
});

module.exports = router;