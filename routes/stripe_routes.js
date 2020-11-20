const { Router } = require('express');
const { createPaymentIntent, confirmPaymentIntent, cancelPaymentIntent, paymenteToConfirm } = require('../controllers/stripe.controller');

const router = Router();

// API/PAYMENT
router.get('/create', createPaymentIntent);

router.get('/confirm', confirmPaymentIntent);

router.get('/cancel', cancelPaymentIntent);

router.get('/toConfirm', paymenteToConfirm);


module.exports = router;