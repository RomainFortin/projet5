const express = require('express');
const router = express.Router();

const teddyCtrl = require('../controllers/teddy');
const furnitureCtrl = require('../controllers/furniture');
const cameraCtrl = require('../controllers/camera');

router.get('/', function (req, res) {
  res.sendFile('index.html', {
    root: './'
  });
});

router.get('/product', function (req, res) {
  res.sendFile('/pages/produit.html', {
    root: './'
  });
});
router.get('/panier', function (req, res) {
  res.sendFile('/pages/panier.html', {
    root: './'
  });
});
router.get('/validate', function (req, res) {
  res.sendFile('/pages/validate.html', {
    root: './'
  });
});
router.post('/order', cameraCtrl.getAllCameras);
router.get('/404', function (req, res) {
  res.sendFile('/pages/404.html', {
    root: './'
  });
});

module.exports = router;
