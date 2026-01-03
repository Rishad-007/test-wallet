# Ethereum Wallet Portfolio Viewer

A full-stack application to view Ethereum wallet token balances and transaction history. Enter any Ethereum address to see their ERC-20 tokens and recent transactions.

## Features

- 🪙 **Token Portfolio**: View all ERC-20 tokens with non-zero balances
- 📊 **Token Metadata**: Display token names, symbols, logos, and balances
- 📜 **Transaction History**: View sent and received transactions
- 🔍 **Etherscan Integration**: Direct links to transaction details
- 🎨 **Clean UI**: Responsive grid layout with styled components

## Project Structure

```
wallet-test/
├── backend/              # Node.js Express server
│   ├── server.js        # API endpoints for Alchemy blockchain data
│   └── package.json
├── frontend/            # React + Vite application
│   ├── src/
│   │   ├── App.jsx                    # Main application component
│   │   ├── components/
│   │   │   ├── WalletInput.jsx       # Address input form
│   │   │   ├── TokenGrid.jsx         # Token display grid
│   │   │   ├── TokenCard.jsx         # Individual token card
│   │   │   └── TransactionList.jsx   # Transaction history table
│   │   └── utils/
│   │       └── formatBalance.js      # Balance formatting utility
│   └── package.json
└── README.md
```

## Technologies Used

### Frontend

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **ESLint** - Code linting

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **node-fetch** - HTTP client
- **Alchemy API** - Blockchain data provider
- **CORS** - Cross-origin resource sharing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Alchemy API key (get one at [alchemy.com](https://www.alchemy.com/))

### Installation

1. Clone the repository

```bash
git clone https://github.com/Rishad-007/test-wallet.git
cd wallet-test
```

2. Install backend dependencies

```bash
cd backend
npm install
```

3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
ALCHEMY_API_KEY=your_alchemy_api_key_here
```

### Running the Application

#### Start Backend Server

```bash
cd backend
node server.js
```

Server runs on `http://localhost:3000`

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173`

## API Endpoints

### POST `/portfolio`

Fetches token balances and metadata for a wallet address.

**Request:**

```json
{
  "address": "0x..."
}
```

**Response:**

```json
{
  "result": {
    "address": "0x...",
    "tokenBalances": [
      {
        "contractAddress": "0x...",
        "tokenBalance": "0x...",
        "tokenMetadata": {
          "name": "USD Coin",
          "symbol": "USDC",
          "decimals": 6,
          "logo": "https://..."
        }
      }
    ]
  }
}
```

### POST `/transactions`

Fetches transaction history (sent and received) for a wallet address.

**Request:**

```json
{
  "address": "0x..."
}
```

**Response:**

```json
{
  "result": {
    "transfers": [
      {
        "from": "0x...",
        "to": "0x...",
        "value": 0.1,
        "asset": "ETH",
        "hash": "0x...",
        "blockNum": "0x...",
        "category": "external"
      }
    ]
  }
}
```

## How It Works

1. User enters an Ethereum wallet address
2. Frontend sends POST request to backend with the address
3. Backend queries Alchemy API for:
   - Token balances (`alchemy_getTokenBalances`)
   - Token metadata (`alchemy_getTokenMetadata`)
   - Transaction history (`alchemy_getAssetTransfers`)
4. Backend combines and enriches the data
5. Frontend displays tokens in a grid and transactions in a table

## License

This project is licensed under the MIT License.
