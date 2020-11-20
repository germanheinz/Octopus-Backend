const {response} = require('express');
const stripe = require('stripe')('sk_test_51HpFb4EMPE3A40nBzlQv0k0V5FhwpxOK46sugfWNRSs7bgQ4LVAxvmhUFiWl7tEfZrhxX02DhxsOKKomBjjLVpJx00sBPcJsKI');

const createPaymentIntent = async(req, res = response) => {

    const { id, email, amount } = req.body;

    console.log( id );
    
    const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'eur',
    payment_method_types: ['card'],
    receipt_email: email,
    customer: id
    });

    console.log(paymentIntent);
    res.json({
        ok: true,
        paymentIntent
    });
}

const confirmPaymentIntent = async(req, res = response) => {

    const { paymentId } = req.body;
    console.log(paymentId);

    const paymentIntent = await stripe.paymentIntents.confirm(
        paymentId,
    {payment_method: 'pm_card_visa'}
    );

    console.log(paymentIntent);

    res.json({
        ok: true,
        paymentIntent
    });
}

const cancelPaymentIntent = async(req, res = response) => {
    
    const { paymentId } = req.body;
    console.log(paymentId);

    const paymentIntent = await stripe.paymentIntents.cancel(
        paymentId
    );

    res.json({
        ok: true,
        paymentIntent
    });
}

const paymenteToConfirm = async(req, res = response) => {
    
    const { customerId } = req.body;
    console.log(customerId);

    const paymentIntents = await stripe.paymentIntents.list({customer: customerId,
        limit: 5, 
      });
      

    res.json({
        ok: true,
        paymentIntents
    });
}


module.exports = { createPaymentIntent, confirmPaymentIntent, cancelPaymentIntent, paymenteToConfirm };