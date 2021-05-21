const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
  res.sendFile('index.html', {
    root: './'
  });
});
router.get('/index.html', function (req, res) {
  res.sendFile('index.html', {
    root: './'
  });
});

router.get('/product', function (req, res) {
  res.sendFile('/pages/product.html', {
    root: './'
  });
});
router.get('/basket', function (req, res) {
  res.sendFile('/pages/basket.html', {
    root: './'
  });
});
router.get('/validate', function (req, res) {
  res.sendFile('/pages/validate.html', {
    root: './'
  });
});
router.get('/success', function (req, res) {
  res.sendFile('/pages/success.html', {
    root: './'
  });
});

router.post('/success');

module.exports = router;
