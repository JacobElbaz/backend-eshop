const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const clientController = require('../controllers/client.controller');

//auth
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);
router.put('/forgotpassword', authController.forgot_password);
router.put('/username', authController.updateUsername);
router.put('/updateprofile', authController.updateUser);
//client DB
router.get('/', clientController.getAllUsers);
router.get("/:id", clientController.userInfo);
router.put('/wishlist/:id', clientController.updateWishlist);
router.put('/addwishlist/:id', clientController.addWishlist);
router.put('/removewishlist/:id', clientController.removeWishlist);
router.put("/:id", clientController.updateUser);

router.put("/password", clientController.updatePassword);
router.delete("/:id", clientController.deleteUser);



module.exports = router;