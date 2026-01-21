# Shopify Developer Technical Assessment

This repository contains the solution for the Shopify Technical Practical Test, focusing on Theme App Extensions and Checkout UI Extensions.

## 🛠 Setup & CLI Commands Used
To initialize and develop this project, the following Shopify CLI commands were used:
- `npm init @shopify/app@latest`: To create the project structure.
- `shopify app generate extension`: To generate both the Theme App Extension and Checkout UI Extension.
- `shopify app dev`: Used for local development and previewing changes in a development store.

---

## 🚀 Scenario 1: Estimated Delivery Date (Theme App Extension)
### Implementation Details:
- **Logic:** I created a JavaScript helper function in `assets/delivery.js` that calculates a 2-day delivery window starting from a vendor-specific lead time.
- **Data Handling:** Lead times are managed via a `vendor-config.json` file. This demonstrates a decoupled approach where data can be updated without touching the core logic.
- **Defensive Coding:** The script includes a fallback to a "Default" lead time if a product's vendor is not explicitly defined in the configuration.

---

## 📦 Scenario 2: Free Shipping Progress (Checkout UI Extension)
### Implementation Details:
- **Logic:** Extracted the calculation into a pure helper function `calculateRemaining`.
- **Rounding:** Implemented `Math.ceil()` to ensure that the "amount remaining" is always rounded up to the nearest whole number, satisfying the requirement for clear customer communication.
- **API Usage:** Utilized the `useSubtotalAmount` and `useCartLines` hooks from Shopify’s UI-extensions library to get real-time cart data.

---

## 📚 Resources Used (Research & Documentation)
To ensure best practices and idiomatic Shopify development, I consulted the following resources:
1. **Shopify Dev Docs:** [Theme App Extensions Overview](https://shopify.dev/docs/apps/online-store/theme-app-extensions) - Used to understand how to link assets and define schemas.
2. **Shopify API Reference:** [Checkout UI Extensions Hooks](https://shopify.dev/docs/api/checkout-ui-extensions/unstable/react-hooks) - Consulted for `useSubtotalAmount` implementation.
3. **MDN Web Docs:** [Math.ceil() Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil) - Used for rounding logic.
4. **Liquid Reference:** [Asset URL Filters](https://shopify.dev/docs/api/liquid/filters/url-filters#asset_url) - To correctly link the JavaScript file in the Liquid block.

---

## 💡 Assumptions & Future Improvements
- **Assumption:** I assumed that lead times provided in the JSON are in calendar days.
- **Limitation:** In a live production app, vendor lead times would ideally be stored in **Metafields** or a custom database for easier merchant management.
- **Improvement:** With more time, I would add unit tests using Jest for the `calculateDeliveryDates` and `calculateRemaining` helper functions.


git add .
git commit -m "docs: add complete README with resources and design decisions"
git push
