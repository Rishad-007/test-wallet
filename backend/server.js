import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/portfolio", async (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: "Wallet address required" });
  }

  try {
    // Get token balances
    const balancesResponse = await fetch(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "alchemy_getTokenBalances",
          params: [address, "erc20"],
          id: 1,
        }),
      }
    );

    const balancesData = await balancesResponse.json();
    console.log("Balances data:", balancesData);

    // Filter tokens with non-zero balance
    const tokensWithBalance = balancesData.result.tokenBalances.filter(
      (token) => parseInt(token.tokenBalance, 16) > 0
    );
    console.log("Tokens with balance:", tokensWithBalance.length);

    // Fetch metadata for each token
    const metadataPromises = tokensWithBalance.map(async (token) => {
      const metadataResponse = await fetch(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "alchemy_getTokenMetadata",
            params: [token.contractAddress],
            id: 1,
          }),
        }
      );
      const metadata = await metadataResponse.json();
      console.log("Metadata for", token.contractAddress, ":", metadata);
      return {
        ...token,
        tokenMetadata: metadata.result,
      };
    });

    const tokensWithMetadata = await Promise.all(metadataPromises);
    console.log("Final tokens with metadata:", tokensWithMetadata);

    res.json({
      jsonrpc: "2.0",
      id: 1,
      result: {
        address: balancesData.result.address,
        tokenBalances: tokensWithMetadata,
      },
    });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "Alchemy API failed", details: error.message });
  }
});

app.post("/transactions", async (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: "Wallet address required" });
  }

  try {
    // Fetch sent transactions
    const sentResponse = await fetch(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "alchemy_getAssetTransfers",
          params: [
            {
              fromBlock: "0x0",
              toBlock: "latest",
              fromAddress: address,
              category: ["external", "internal", "erc20", "erc721", "erc1155"],
              maxCount: "0x19",
              order: "desc",
            },
          ],
        }),
      }
    );

    // Fetch received transactions
    const receivedResponse = await fetch(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 2,
          method: "alchemy_getAssetTransfers",
          params: [
            {
              fromBlock: "0x0",
              toBlock: "latest",
              toAddress: address,
              category: ["external", "internal", "erc20", "erc721", "erc1155"],
              maxCount: "0x19",
              order: "desc",
            },
          ],
        }),
      }
    );

    const sentData = await sentResponse.json();
    const receivedData = await receivedResponse.json();

    // Combine and sort by block number
    const allTransfers = [
      ...(sentData?.result?.transfers || []),
      ...(receivedData?.result?.transfers || []),
    ].sort((a, b) => {
      const blockA = parseInt(a.blockNum, 16);
      const blockB = parseInt(b.blockNum, 16);
      return blockB - blockA; // Descending order
    });

    res.json({
      jsonrpc: "2.0",
      id: 1,
      result: {
        transfers: allTransfers.slice(0, 50), // Limit to 50 total
      },
    });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "Alchemy API failed", details: error.message });
  }
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
