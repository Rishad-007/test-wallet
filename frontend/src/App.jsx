import { useState } from "react";
import WalletInput from "./components/WalletInput";
import TokenGrid from "./components/TokenGrid";
import TransactionList from "./components/TransactionList";
import { formatBalance } from "./utils/formatBalance";

function App() {
  const [address, setAddress] = useState("");
  const [data, setData] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [txLoading, setTxLoading] = useState(false);

  async function fetchPortfolio() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });

      const json = await res.json();
      console.log("Portfolio response:", json);
      setData(json);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
    setLoading(false);
  }

  async function fetchTransactions() {
    setTxLoading(true);
    try {
      const res = await fetch("http://localhost:3000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });

      const json = await res.json();
      setTransactions(json?.result?.transfers || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
    setTxLoading(false);
  }

  async function handleFetch() {
    await fetchPortfolio();
    await fetchTransactions();
  }

  // Get tokens array from response - handle both old and new structure
  const tokens = data?.result?.tokenBalances || data?.data?.tokens || [];

  return (
    <div
      style={{
        padding: 30,
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ marginBottom: 30 }}>Wallet Portfolio</h2>

      <WalletInput
        address={address}
        setAddress={setAddress}
        onFetch={handleFetch}
        loading={loading || txLoading}
      />

      <TokenGrid tokens={tokens} formatBalance={formatBalance} />

      {data && tokens.length === 0 && (
        <p style={{ color: "#666", fontSize: 16 }}>
          No tokens with balance found for this address.
        </p>
      )}

      {transactions && (
        <TransactionList transactions={transactions} address={address} />
      )}
    </div>
  );
}

export default App;
