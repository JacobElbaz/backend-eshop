const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        client: {
            type: String,
            required: true, 
        },
        orderItems: [
            {
              category: { type: String, required: true },
              countInStock: { type: String, required: true },
              description: { type: String, required: true },
              category: { type: String, required: true },
              qty: { type: String, required: true},
              image: { type: String, required: true},
              name: { type: String, required: true },
              price: { type: Number, required: true },
              _id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'product',
              },
            },
          ],
          shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            street: {type: Number, required: true},
          },
          paymentMethod: {
            creditCard: { type: Number, required: true },
            ID: { type: Number, required: true },
            expiredDate: { type: Date, required: true },
            CVV: {type: Number, required: true},
          },
          totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
          },
          status: {
            type: String,
            required: true,
            default: "Pending...",
          },
          paidAt: {
            type: Date,
          },
          isDelivered: {
            type: Boolean,
            required: true,
            default: false,
          },
          deliveredAt: {
            type: Date,
          },
          payementDate: {
            type: Date,
            required: true,
          },
          
    },
    { timestamps: true }
);

module.exports = mongoose.model('order', orderSchema);