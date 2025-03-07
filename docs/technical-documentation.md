# COS30049 Frontend Documentation

A modern, responsive frontend for the COS30049 blockchain-based application.

## Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

## Environment Setup

The application requires a `.env` file with backend connection details:

```
# Example .env file
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

Note: The submission includes a pre-configured `.env` file.

## Core Features

### Wallet Management

```typescript
// Fetch user wallets
const wallets = await fetchWallets();

// Create new wallet
await createWallet({
  name: "My Wallet",
  description: "Personal wallet",
});
```

### Transaction Handling

```typescript
// Send transaction
await sendTransaction({
  fromWalletId: "wallet_123",
  toAddress: "0x123...",
  amount: "0.05",
  assetId: "eth_mainnet",
});

// View transaction history
const transactions = await getTransactionHistory(walletId);
```

### Asset Visualization

```typescript
// Import the chart component
import { AssetChart } from "@/components/charts/AssetChart";

// Use in your component
<AssetChart data={assetData} timeframe="1w" />;
```

## Project Structure

```
/src
  /app         # Next.js app router pages
  /components  # Reusable UI components
  /lib         # Utility functions and types
  /actions     # Server actions for data fetching
```

## Common Errors

- **Backend Connection Timeout**: The backend may take up to 1 minute to boot up from sleep (Free tier hosting). Wait and retry your request.
- **Wallet Loading Error**: If wallets fail to load, check your network connection and refresh the page.
- **Transaction Failure**: Ensure you have sufficient balance and the recipient address is valid.

## Performance Considerations

- The application uses React Server Components where possible to reduce client-side JavaScript
- Images are optimized using Next.js Image component
- Data fetching is optimized with caching strategies

## Troubleshooting

- **Blank Screen**: Clear browser cache and reload
- **Slow Loading**: The backend may be waking up from sleep mode (wait ~1 minute)
- **UI Glitches**: Try a hard refresh (Ctrl+F5 or Cmd+Shift+R)
