import TokenCard from "./TokenCard";

function TokenGrid({ tokens, formatBalance }) {
  if (tokens.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 style={{ marginBottom: 20, color: "#333" }}>
        Found {tokens.length} tokens with balance
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 20,
          marginTop: 20,
        }}
      >
        {tokens.map((token, index) => {
          const balance = formatBalance(
            token.tokenBalance,
            token.tokenMetadata?.decimals || 18
          );
          const price = token.tokenPrices?.[0]?.value || "0";
          const value = (parseFloat(balance) * parseFloat(price)).toFixed(2);
          const symbol =
            token.tokenMetadata?.symbol ||
            (token.tokenAddress ? "Unknown Token" : "Native Token");
          const name = token.tokenMetadata?.name || "N/A";
          const hasPrice = parseFloat(price) > 0;

          return (
            <TokenCard
              key={index}
              token={token}
              balance={balance}
              price={price}
              value={value}
              symbol={symbol}
              name={name}
              hasPrice={hasPrice}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TokenGrid;
