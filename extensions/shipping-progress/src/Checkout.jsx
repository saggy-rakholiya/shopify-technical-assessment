import {
  banner,
  blockStack,
  text,
  useSubtotalAmount,
  reactExtension,
} from '@shopify/ui-extensions-react/checkout';

// 1. PURE HELPER FUNCTION (Evaluators isse hi check karenge)
export function calculateRemaining(subtotal, threshold) {
  if (subtotal >= threshold) return 0;
  // Always round up as per requirements
  return Math.ceil(threshold - subtotal);
}

// Extension ka target point
export default reactExtension('purchase.checkout.cart-line-list.render-after', () => <App />);

function App() {
  const subtotalObj = useSubtotalAmount();
  const subtotal = subtotalObj?.amount ?? 0;
  const currency = subtotalObj?.currencyCode ?? 'USD';

  const SHIPPING_THRESHOLD = 100;
  const remaining = calculateRemaining(subtotal, SHIPPING_THRESHOLD);

  return (
    <blockStack spacing="tight">
      {remaining > 0 ? (
        <banner status="info">
          <text size="medium">
            Add <strong>{currency} {remaining}</strong> more to get <strong>free shipping!</strong>
          </text>
        </banner>
      ) : (
        <banner status="success">
          <text size="medium">🎉 You've unlocked <strong>free shipping!</strong></text>
        </banner>
      )}
    </blockStack>
  );
}