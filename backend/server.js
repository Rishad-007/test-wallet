import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;

// Helper function to call Alchemy API
async function callAlchemy(method, params) {
  const response = await fetch(ALCHEMY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method,
      params,
      id: 1,
    }),
  });
  return response.json();
}

// Get wallet portfolio with token balances
app.post("/portfolio", async (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: "Wallet address required" });
  }

  try {
    // Step 1: Get all token balances
    const balancesData = await callAlchemy("alchemy_getTokenBalances", [
      address,
      "erc20",
    ]);

    // Step 2: Filter tokens that have a balance
    const tokensWithBalance = balancesData.result.tokenBalances.filter(
      (token) => parseInt(token.tokenBalance, 16) > 0
    );

    // Step 3: Get metadata (name, symbol, decimals) for each token
    const tokensWithMetadata = await Promise.all(
      tokensWithBalance.map(async (token) => {
        const metadata = await callAlchemy("alchemy_getTokenMetadata", [
          token.contractAddress,
        ]);
        return { ...token, tokenMetadata: metadata.result };
      })
    );

    res.json({
      jsonrpc: "2.0",
      id: 1,
      result: {
        address: balancesData.result.address,
        tokenBalances: tokensWithMetadata,
      },
    });
  } catch (error) {
    console.error("Portfolio error:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch portfolio", details: error.message });
  }
});

// Get wallet transaction history
app.post("/transactions", async (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: "Wallet address required" });
  }

  try {
    const transferParams = {
      fromBlock: "0x0",
      toBlock: "latest",
      category: ["external", "internal", "erc20", "erc721", "erc1155"],
      maxCount: "0x19",
      order: "desc",
    };

    // Fetch sent and received transactions in parallel
    const [sentData, receivedData] = await Promise.all([
      callAlchemy("alchemy_getAssetTransfers", [
        { ...transferParams, fromAddress: address },
      ]),
      callAlchemy("alchemy_getAssetTransfers", [
        { ...transferParams, toAddress: address },
      ]),
    ]);

    // Combine and sort all transactions by block number (newest first)
    const allTransfers = [
      ...(sentData?.result?.transfers || []),
      ...(receivedData?.result?.transfers || []),
    ].sort((a, b) => parseInt(b.blockNum, 16) - parseInt(a.blockNum, 16));

    res.json({
      jsonrpc: "2.0",
      id: 1,
      result: {
        transfers: allTransfers.slice(0, 50), // Return top 50 transactions
      },
    });
  } catch (error) {
    console.error("Transaction error:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch transactions", details: error.message });
  }
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
