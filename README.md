# Technical Assessment: Shopify Extensions Development

This project was built as part of a technical assessment to demonstrate proficiency with the Shopify CLI, Theme App Extensions, and Checkout UI Extensions.

## 🛠 Setup & Development (CLI Commands)
I followed the standard Shopify CLI workflow to build this project. Here are the steps I took in my terminal:

1. **Project Creation:** `npm init @shopify/app@latest` (Selected the Remix template for the app structure).
2. **Extensions Setup:** `npx shopify app generate extension`
   - First, I created the `delivery-timer` (Theme App Extension).
   - Second, I created the `shipping-progress` (Checkout UI Extension).
3. **Local Testing:** `npx shopify app dev` was used to sync the extensions with my development store for real-time testing.

---

## 📋 Assumptions & Design Decisions

### General Approach:
My main goal was to keep the logic outside of the UI components. This makes the code easier to maintain and follow.

### Scenario 1 (Delivery Dates):
- **Assumption:** I assumed that different brands (vendors) have different shipping speeds.
- **Decision:** Instead of hardcoding dates, I used a JSON file (`vendor-config.json`). This is a more "Shopify-idiomatic" way because it allows the data to be managed separately from the Liquid code.
- **UX:** I added a "Default" lead time. If a product doesn't have a specific vendor setup, the customer still sees a fallback date instead of a broken UI.

### Scenario 2 (Free Shipping):
- **Assumption:** The free shipping limit is a flat $100 across the store.
- **Decision:** I used `Math.ceil()` for the calculation. Why? Because if a customer needs $5.01, telling them they need $6 is safer to ensure they actually cross the free shipping threshold after taxes/fees.

---

## ⚙️ Data Flow & Logic

### How Scenario 1 works:
1. The **Liquid file** grabs the `product.vendor` from Shopify's object.
2. It sends that name to my **JavaScript file** (`delivery.js`).
3. The JS fetches the JSON config, finds the matching vendor, and calculates: `Today + Lead Time` to `Today + Lead Time + 2`.
4. It then updates the HTML text on the product page.

### How Scenario 2 works:
1. I used the `@shopify/ui-extensions-react` library hooks.
2. `useSubtotalAmount` gives us the live money in the cart.
3. My logic function `calculateRemaining` subtracts the subtotal from $100.
4. If the result is positive, it shows the "Add more" banner. If zero or negative, it shows the "Success" banner.

---

## ⚠️ Limitations & Future Improvements
1. **Hardcoded Values:** Right now, the $100 limit is a constant in the code. Ideally, I would use **App Metafields** so a merchant can change this limit from the Shopify Admin without touching code.
2. **Translation:** The text is currently hardcoded in English. I would use Shopify's `i18n` framework to make it multi-language.
3. **Date Logic:** My JS date logic is simple. For a real store, I would add logic to skip weekends (Saturdays/Sundays) for more accurate delivery dates.

---

## 🔗 Resources Used (Google & Research)
I used the following documentation to help with the syntax and Shopify-specific APIs:
- **Shopify Dev Docs:** [Theme App Extension Blocks](https://shopify.dev/docs/apps/online-store/theme-app-extensions/ux/blocks) (Used for schema setup).
- **Shopify API:** [Checkout UI Extension Hooks](https://shopify.dev/docs/api/checkout-ui-extensions/unstable/react-hooks) (To understand how to get the cart subtotal).
- **MDN Web Docs:** [JavaScript Date Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) and [Math.ceil](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil).
- **StackOverflow:** Researching how to fetch local JSON assets within a Shopify extension environment.
