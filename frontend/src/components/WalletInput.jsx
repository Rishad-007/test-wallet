function WalletInput({ address, setAddress, onFetch, loading }) {
  return (
    <div style={{ marginBottom: 30 }}>
      <input
        placeholder="Enter wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{
          width: 400,
          padding: 12,
          fontSize: 16,
          borderRadius: 8,
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={onFetch}
        disabled={loading}
        style={{
          marginLeft: 10,
          padding: "12px 24px",
          fontSize: 16,
          backgroundColor: loading ? "#6c757d" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Loading..." : "Check"}
      </button>
    </div>
  );
}

export default WalletInput;
