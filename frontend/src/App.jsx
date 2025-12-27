import { useState } from "react";

function App() {
  const [address, setAddress] = useState("");
  const [data, setData] = useState(null);

  async function fetchPortfolio() {
    const res = await fetch("http://localhost:3000/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
    });

    const json = await res.json();
    setData(json);
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Wallet Portfolio</h2>

      <input
        placeholder="Enter wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: 400 }}
      />

      <button onClick={fetchPortfolio}>Check</button>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
