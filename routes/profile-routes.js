const router = require('express').Router();

// to check if a visitor is logged in
const authCheck = (req, res, next) => {
  if (!req.user) {
    // user is not logged in
    res.redirect('/auth/login');
  } else {
    // user is logged in
    next();
  }
}

router.get('/', authCheck, (req, res) => {
  res.render('profile', {
    user: req.user,
  });
});

module.exports = router;