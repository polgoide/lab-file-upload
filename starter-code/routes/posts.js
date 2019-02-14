const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require('../helpers/cloudinary')
const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')

// router.get('/login', ensureLoggedOut(), (req, res) => {
//     res.render('authentication/login', { message: req.flash('error')});
// });

// router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
//   successRedirect : '/',
//   failureRedirect : '/login',
//   failureFlash : true
// }));

// router.get('/signup', ensureLoggedOut(), (req, res) => {
//     res.render('authentication/signup', { message: req.flash('error')});
// });


// router.post('/signup', ensureLoggedOut(), uploadCloud.single('photoURL'), passport.authenticate('local-signup', {
//   successRedirect : '/',
//   failureRedirect : '/signup',
//   failureFlash : true
// }), (req, res) => {
//     req.body.photoURL = req.files.photoURL[0].url
//         User.findByIdAndUpdate(req.user._id, req.body)
//             .then(() => res.redirect('/'))
//             .catch(e=>next(e))
// });

// router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
//     res.render('authentication/profile', {
//         user : req.user
//     });
// });


// Add comment
router.post('/show/:id', uploadCloud.single('photoURL'),(req, res) => {
  if(req.file) req.body.photoURL = req.file.url
  Comment.create({...req.body, postId: req.params.id, creatorId:  req.user._id})
  .then(res.redirect('/show/' + req.params.id))
  .catch(e=>next(e))
});

// Show
router.get('/show/:id', (req, res,next) => {
  const { id } = req.params
  Promise.all([
    Post.findById(id).populate('creatorId'),
    Comment.find({ postId: id }).populate('creatorId')
  ])
    .then(results => {
      console.log(results[0])
      res.render('posts/show', {post: results[0], comments: results[1]})
    })
  .catch(e=>next(e))
});

// New
router.post('/new', ensureLoggedIn('/login'), uploadCloud.single('photoURL'), (req, res) => {
  req.body.photoURL = req.file.url
  Post.create({...req.body, creatorId: req.user._id})
  .then(() => res.redirect('/'))
  .catch(e=>next(e))
});

router.get('/new', ensureLoggedIn('/login'), (req, res) => {
  res.render('posts/new')
});

//Post list
router.get('/', (req, res) => {
  Post.find()
    .then(posts => {
    res.render('posts/', {posts})
  })
});

module.exports = router;
