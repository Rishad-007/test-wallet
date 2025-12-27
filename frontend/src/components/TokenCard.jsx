function TokenCard({ token, balance, price, value, symbol, name, hasPrice }) {
  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: 12,
        padding: 20,
        backgroundColor: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-4px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 15,
          borderBottom: "1px solid #f0f0f0",
          paddingBottom: 10,
        }}
      >
        {token.tokenMetadata?.logo ? (
          <img
            src={token.tokenMetadata.logo}
            alt={symbol}
            style={{
              width: 40,
              height: 40,
              marginRight: 12,
              borderRadius: "50%",
            }}
          />
        ) : (
          <div
            style={{
              width: 40,
              height: 40,
              marginRight: 12,
              borderRadius: "50%",
              backgroundColor: "#e0e0e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              color: "#666",
            }}
          >
            {symbol?.charAt(0) || "?"}
          </div>
        )}
        <div>
          <h4 style={{ margin: 0, fontSize: 18 }}>{symbol}</h4>
          <span
            style={{
              fontSize: 11,
              color: "#888",
              textTransform: "uppercase",
            }}
          >
            {token.network}
          </span>
        </div>
      </div>

      <p style={{ margin: "10px 0", color: "#555", fontSize: 14 }}>
        <strong>Name:</strong> {name}
      </p>
      <p style={{ margin: "10px 0", color: "#555", fontSize: 14 }}>
        <strong>Balance:</strong> {balance}
      </p>
      {hasPrice ? (
        <>
          <p
            style={{
              margin: "10px 0",
              color: "#555",
              fontSize: 14,
            }}
          >
            <strong>Price:</strong> ${parseFloat(price).toFixed(6)} USD
          </p>
          <p
            style={{
              margin: "10px 0",
              fontWeight: "bold",
              fontSize: 20,
              color: "#28a745",
            }}
          >
            ${value}
          </p>
          {token.tokenPrices?.[0]?.lastUpdatedAt && (
            <p
              style={{
                margin: "10px 0 0 0",
                color: "#999",
                fontSize: 11,
              }}
            >
              Updated:{" "}
              {new Date(token.tokenPrices[0].lastUpdatedAt).toLocaleString()}
            </p>
          )}
        </>
      ) : (
        <p
          style={{
            margin: "10px 0",
            color: "#999",
            fontSize: 13,
            fontStyle: "italic",
          }}
        >
          Price not available
        </p>
      )}
    </div>
  );
}

export default TokenCard;
