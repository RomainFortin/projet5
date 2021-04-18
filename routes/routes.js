const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', function (req, res) {
  res.sendFile('index.html', {
    root: './'
  });
});

router.get('/teddies/:id', function (req, res) {
  res.sendFile('/pages/produit.html', {
    root: './'
  });
});
router.get('/cameras/:id', function (req, res) {
  res.sendFile('/pages/produit.html', {
    root: './'
  });
});
router.get('/furniture/:id', function (req, res) {
  res.sendFile('/pages/produit.html', {
    root: './'
  });
});
router.get('/compte', function (req, res) {
  res.sendFile('/pages/compte.html', {
    root: './'
  });
});
router.get('/panier', function (req, res) {
  res.sendFile('/pages/panier.html', {
    root: './'
  });
});

module.exports = router;
