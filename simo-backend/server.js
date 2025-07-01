const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const midtransClient = require("midtrans-client");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Allow serving HTML & static files from project root (simo-project/)
app.use(express.static(path.join(__dirname, ".."))); // <--- penting
app.use(cors());
app.use(bodyParser.json());

// Init Midtrans
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

// Endpoint Midtrans Checkout
app.post("/api/checkout", async (req, res) => {
  const { order_id, gross_amount, customer_name, email, phone } = req.body;

  try {
    const parameter = {
      transaction_details: {
        order_id,
        gross_amount,
      },
      customer_details: {
        first_name: customer_name,
        email,
        phone,
      },

      // callbacks: {
      //   finish: "http://localhost:3000/sukses.html",
      // },
    };

    const transaction = await snap.createTransaction(parameter);
    console.log("Midtrans response:", transaction);
    res.json({ redirect_url: transaction.redirect_url });
  } catch (error) {
    console.error("Midtrans Error:", error);
    res.status(500).json({ message: "Gagal membuat transaksi" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
