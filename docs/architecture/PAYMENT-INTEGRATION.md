# Payment Integration Architecture
## Phase 2E — Nepal Payment Gateways

> Reference document for implementing payment processing.
> No runtime code is generated from this file.

---

## Gateway Overview

| Gateway | Type | Market Share | Integration | Status |
|---------|------|-------------|-------------|--------|
| **eSewa** | Digital wallet | ~60% digital payments | REST API | Priority 1 |
| **Khalti** | Digital wallet | ~25% digital payments | REST API | Priority 1 |
| **ConnectIPS** | Bank transfer | Growing, bank-linked | REST API | Priority 2 |
| **IME Pay** | Digital wallet | Popular in rural areas | REST API | Priority 3 |
| **Cash on Arrival** | Physical | Still dominant in tourism | No integration | Always available |

## Payment Flow

```
Guest selects payment method
        │
        ├── eSewa/Khalti ──▶ Redirect to gateway ──▶ Gateway UI ──▶ Callback URL
        │                                                              │
        │                                                    Verify signature
        │                                                              │
        │                                              Update Payment record
        │                                                              │
        ├── ConnectIPS ────▶ Server-to-server initiate ──▶ OTP on phone
        │                                                              │
        │                                              Webhook notification
        │                                                              │
        ├── Bank Transfer ──▶ Show bank details ──▶ Guest transfers manually
        │                                                              │
        │                                      Admin verifies & marks paid
        │                                                              │
        └── Cash on Arrival ──▶ Booking confirmed ──▶ Partner collects at check-in
                                                              │
                                                    Partner marks paid in dashboard
```

## Abstract Gateway Interface

```typescript
// src/lib/payment-gateways/gateway.ts (to be implemented in Phase 2E)

interface PaymentGateway {
  name: string;
  
  /** Create a payment intent and get the redirect URL or payment token */
  initiate(params: {
    bookingId: string;
    bookingReference: string;
    amount: number;
    currency: "NPR";
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    successUrl: string;
    failureUrl: string;
  }): Promise<{
    transactionId: string;
    redirectUrl?: string;   // For redirect-based flows (eSewa, Khalti)
    paymentToken?: string;  // For in-app flows
  }>;
  
  /** Verify a payment after gateway callback */
  verify(params: {
    transactionId: string;
    amount: number;
    gatewayResponse: Record<string, string>; // Query params from callback
  }): Promise<{
    verified: boolean;
    providerTxnId: string;
    amount: number;
    status: "COMPLETED" | "FAILED" | "PENDING";
    rawResponse: string; // JSON string for audit
  }>;
  
  /** Process a refund */
  refund(params: {
    providerTxnId: string;
    amount: number;
    reason: string;
  }): Promise<{
    success: boolean;
    refundId: string;
  }>;
}
```

## eSewa Integration Notes

```
API Base: https://esewa.com.np/epay/main (production)
Test API: https://uat.esewa.com.np/epay/main (sandbox)

Flow:
1. POST form data to eSewa with: amount, tax, product_id, success_url, failure_url
2. User logs in to eSewa, confirms payment
3. eSewa redirects to success_url with: oid, amt, refId
4. Verify: GET /epay/transrec with amt, rid, pid, scd

Required env vars:
- ESEWA_MERCHANT_CODE (scd)
- ESEWA_API_URL
```

## Khalti Integration Notes

```
API Base: https://khalti.com/api/v2 (production)
Test API: https://a.khalti.com/api/v2 (sandbox)

Flow:
1. POST /epayment/initiate with: amount, purchase_order_id, purchase_order_name, return_url, website_url
2. User redirected to Khalti payment page
3. After payment, Khalti redirects to return_url with: pidx, transaction_id, amount, status
4. Verify: POST /epayment/lookup with pidx

Required env vars:
- KHALTI_SECRET_KEY
- KHALTI_API_URL
```

## Security Considerations

| Concern | Mitigation |
|---------|-----------|
| Amount tampering | Always verify amount server-side against booking record |
| Replay attacks | One-use transaction IDs, check for duplicate payments |
| CSRF | Verify callback signatures / HMAC provided by gateway |
| Credential exposure | Store gateway keys in env, never in client code |
| Refund fraud | Require admin approval for all refunds |
| Webhook spoofing | Verify webhook source IP, validate signatures |

## Reconciliation

```
Daily reconciliation job (Phase 2E+):
1. Fetch all payments with status=COMPLETED from last 24 hours
2. Cross-reference with gateway transaction logs
3. Flag mismatches for manual review
4. Generate daily settlement report

Monthly payout process:
1. Sum all confirmed bookings per hotel for the month
2. Calculate commission per CommissionRule
3. Generate CommissionPayout record
4. Approve → Transfer net amount to hotel's bank
5. Mark as CONFIRMED when hotel acknowledges receipt
```

## NPR-Specific Considerations

- Nepal Rastra Bank regulations on digital payments
- Maximum transaction limits per gateway (eSewa: NPR 100K/txn, Khalti: varies)
- Tax implications: 13% VAT on service fees
- Commission invoicing must comply with Nepal tax law
- PAN/VAT registration required for the platform entity
