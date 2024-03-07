const router = require('express').Router();
const productController = require('../controllers/product.controllers');


router.get('/', productController.getProducts);
router.get('/all', productController.allProduct);
router.get('/latest', productController.getLatestProduct);
router.get('/best-seller', productController.getBestSeller);
router.get('/best-seller-manager', productController.getBestSellerManager);
router.get('/trend', productController.getTrend);
router.get('/deals', productController.getDeals);
router.get('/getRandom/:id', productController.getRandomGame);
router.get('/:id', productController.getProduct);
router.post('/', productController.createProduct);
router.put('/rate', productController.updateRateProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;