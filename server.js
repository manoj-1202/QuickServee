import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import SibApiV3Sdk from "sib-api-v3-sdk";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

/* =========================
   BREVO SETUP
========================= */
const brevoClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = brevoClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

console.log("BREVO SENDER =", process.env.BREVO_SENDER_EMAIL);

/* =========================
   ROUTE
========================= */
app.post("/send-booking-email", async (req, res) => {
  const {
    customerName,
    phoneNumber,
    location,
    service,
    problemDescription,
    preferredDate,
    preferredTime,
  } = req.body;

  if (!customerName || !phoneNumber || !location || !service) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const sendSmtpEmail = {
      sender: {
        email: process.env.BREVO_SENDER_EMAIL,
        name: "QuickServe Bookings",
      },
      to: [
        {
          email: "manojpolevault1202@gmail.com",
          name: "Admin",
        },
      ],
      subject: `🛠️ New Booking - ${service}`,
      htmlContent: `
        <h2>New Booking Request</h2>
        <p><b>Name:</b> ${customerName}</p>
        <p><b>Phone:</b> ${phoneNumber}</p>
        <p><b>Location:</b> ${location}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Date:</b> ${preferredDate || "Not selected"}</p>
        <p><b>Time:</b> ${preferredTime || "Not selected"}</p>
        <p><b>Description:</b> ${problemDescription || "None"}</p>
        <hr />
        <p>📍 Sent from QuickServe Booking System</p>
      `,
    };

    await emailApi.sendTransacEmail(sendSmtpEmail);

    res.status(200).json({ message: "Booking email sent successfully" });
  } catch (error) {
    console.error("BREVO ERROR:", JSON.stringify(error, null, 2));
    res.status(500).json({ message: "Failed to send email" });
  }
});

/* =========================
   SERVER START
========================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
