# BERIT storefront prototype

A responsive front-end prototype for the BERIT clothing brand. It includes a homepage, first product details, size selection, cart, checkout form, demo order confirmation, and a demo-only admin overview.

## Run it

Open `index.html` in a modern browser, or serve this folder with a local static web server. Google Fonts and the sample Unsplash photography require internet access.

## Important before launch

This is a **front-end prototype only**. It is not production-ready for taking real orders or payments.

- Price ₹8,000 and shipping ₹250 are illustrative placeholders in `script.js`; confirm before launch.
- Product photography is sample remote imagery; replace with approved BERIT product photos and confirm usage rights.
- Demo orders are held only in browser memory and disappear on refresh. No data is transmitted to a server.
- No database, authentication, inventory locking, email notifications, shipment integration, or live Razorpay payment integration is connected.
- The admin preview is not protected and must never be used for real customer data.
- Before launch, add a server-side backend/database, authenticated admin access, server-side price/stock validation, secure Razorpay order creation and signature verification, webhook handling, order notification, privacy/security controls, and accurate policies.

Suggested next architecture: frontend hosted on a static hosting provider; PostgreSQL database with row-level access policies (for example Supabase); server-side functions for order creation and Razorpay verification; Razorpay Checkout; shipping updates initially entered manually by an authenticated admin.
