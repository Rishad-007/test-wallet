import { useState } from "react";
import WalletInput from "./components/WalletInput";
import TokenGrid from "./components/TokenGrid";
import { formatBalance } from "./utils/formatBalance";

function App() {
  const [address, setAddress] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchPortfolio() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });

      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
    setLoading(false);
  }

  // Get tokens array from response
  const tokens = data?.data?.tokens || [];

  // Filter out tokens with zero balance
  const activeTokens = tokens.filter(
    (token) => parseInt(token.tokenBalance, 16) > 0
  );

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
        onFetch={fetchPortfolio}
        loading={loading}
      />

      <TokenGrid tokens={activeTokens} formatBalance={formatBalance} />

      {data && activeTokens.length === 0 && (
        <p style={{ color: "#666", fontSize: 16 }}>
          No tokens with balance found for this address.
        </p>
      )}
    </div>
  );
}

export default App;
