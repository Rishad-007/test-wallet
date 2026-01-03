export default function TransactionList({ transactions, address }) {
  return (
    <div style={{ marginTop: 40 }}>
      <h3 style={{ marginBottom: 20 }}>Transaction History</h3>
      <div style={{ backgroundColor: "white", borderRadius: 8, padding: 20 }}>
        {!transactions || transactions.length === 0 ? (
          <p style={{ color: "#666" }}>No transactions found</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #ddd" }}>
                  <th style={{ padding: 12, textAlign: "left" }}>Type</th>
                  <th style={{ padding: 12, textAlign: "left" }}>From/To</th>
                  <th style={{ padding: 12, textAlign: "left" }}>Value</th>
                  <th style={{ padding: 12, textAlign: "left" }}>Asset</th>
                  <th style={{ padding: 12, textAlign: "left" }}>Hash</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, idx) => {
                  const isSent =
                    tx.from?.toLowerCase() === address.toLowerCase();
                  return (
                    <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: 12 }}>
                        <span
                          style={{
                            color: isSent ? "#f44336" : "#4caf50",
                            fontWeight: "bold",
                          }}
                        >
                          {isSent ? "OUT" : "IN"}
                        </span>
                      </td>
                      <td style={{ padding: 12, fontSize: 14 }}>
                        {isSent
                          ? `${tx.to?.slice(0, 6)}...${tx.to?.slice(-4)}`
                          : `${tx.from?.slice(0, 6)}...${tx.from?.slice(-4)}`}
                      </td>
                      <td style={{ padding: 12 }}>{tx.value || "0"}</td>
                      <td style={{ padding: 12 }}>{tx.asset || "ETH"}</td>
                      <td style={{ padding: 12 }}>
                        <a
                          href={`https://etherscan.io/tx/${tx.hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#2196f3", textDecoration: "none" }}
                        >
                          {tx.hash?.slice(0, 8)}...
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
