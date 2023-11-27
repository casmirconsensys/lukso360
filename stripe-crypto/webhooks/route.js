// const { NextResponse } = require("next/server");
// const { headers } = require("next/headers");

// const Stripe = require("stripe");
// const { stripe } = require("@/utils/stripe");

// const {
//   insertProductRecord,
//   insertPriceRecord,
//   handleProductSold,
// } = require("@/utils/supabaseAdmin");

// const relevantEvents = new Set([
//   "product.created",
//   "product.updated",
//   "price.created",
//   "price.updated",
//   "checkout.session.async_payment_succeeded",
//   "checkout.session.completed",
//   "checkout.session.expired",
//   "charge.pending",
//   "charge.succeeded",
//   "charge.failed",
// ]);

// async function POST(request) {
//   const body = await request.text();
//   const sig = headers().get("Stripe-Signature");

//   const webhookSecret =
//     process.env.STRIPE_WEBHOOK_SECRET_LIVE || process.env.STRIPE_WEBHOOK_SECRET;
//   let event;

//   try {
//     if (!sig || !webhookSecret) return;

//     event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
//   } catch (err) {
//     console.log(`❌ Error message: ${err.message}`);
//     return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
//   }

//   if (relevantEvents.has(event.type)) {
//     try {
//       switch (event.type) {
//         case "product.created":
//           await insertProductRecord(event.data.object);
//           break;
//         case "price.created":
//           await insertPriceRecord(event.data.object);
//           break;
//         case "checkout.session.async_payment_succeeded":
//         case "checkout.session.completed":
//           await handleProductSold(event.data.object.metadata);
//           break;
//       }
//     } catch (error) {
//       console.log(error);
//       return new NextResponse(
//         'Webhook error: "Webhook handler failed. View logs."',
//         { status: 400 }
//       );
//     }
//   }
//   return NextResponse.json({ received: true }, { status: 200 });
// }

// module.exports = {
//   POST,
// };
