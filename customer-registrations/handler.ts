import { LambdaFunctionURLHandler } from 'aws-lambda';
import { Stripe } from 'stripe';

const generatePaymentLink = async (
  email: string,
  gymnastName: string,
  priceId: string,
  classId: string,
  discount?: boolean
) => {
  const stripeClient = new Stripe(process.env.STRIPED_SECRET_KEY || '');
  return stripeClient.checkout.sessions.create({
    customer_creation: 'if_required',
    mode: 'payment',
    currency: 'GBP',
    custom_fields: [
      {
        key: 'gymnast_name',
        label: {
          custom: 'Gymnast Name',
          type: 'custom',
        },
        type: 'text',
        text: {
          default_value: gymnastName,
        },
        optional: false,
      },
    ],
    customer_email: email,
    payment_method_types: ['card'],
    expires_at: Math.floor(Date.now() / 1000) + 1800,
    metadata: {
      class_id: classId,
    },
    line_items: [
      {
        price: priceId,
        quantity: 2,
      },
      {
        price: 'price_id_1', // Rhythmic Excellence Membership
        quantity: 1,
      },
      {
        price: 'price_id_2', // London Gymnastics Membership
        quantity: 1,
      },
    ],
    ...(discount ? { discounts: [{ coupon: 'discount_02' }] } : {}),
    locale: 'en-GB',
    success_url: 'https://rhythmicexcellence.london/payments/success',
    cancel_url: 'https://rhythmicexcellence.london/payments/cancel',
  });
};

export const webhook: LambdaFunctionURLHandler = async (event) => {
  console.log(event.body);

  const paymentLink = await generatePaymentLink(
    'test@mail.com',
    'Test Gymnast',
    'price_id_test',
    'class_id_test',
    true
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      url: paymentLink.url,
    }),
  };
};
