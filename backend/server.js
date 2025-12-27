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
    const response = await fetch(
      `https://api.g.alchemy.com/data/v1/${process.env.ALCHEMY_API_KEY}/assets/tokens/by-address`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          addresses: [
            {
              address,
              networks: [
                "eth-mainnet",
                "polygon-mainnet",
                "arb-mainnet",
                "opt-mainnet",
                "base-mainnet",
              ],
            },
          ],
          withPrices: true,
        }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Alchemy API failed" });
  }
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
