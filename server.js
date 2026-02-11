import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import SibApiV3Sdk from "sib-api-v3-sdk";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

/* =========================
   DEBUG ENV VARIABLES
========================= */
console.log("🔑 BREVO_API_KEY exists:", !!process.env.BREVO_API_KEY);
console.log("📧 BREVO_SENDER_EMAIL:", process.env.BREVO_SENDER_EMAIL);

/* =========================
   BREVO SETUP
========================= */
const brevoClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = brevoClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

/* =========================
   ROUTE
========================= */
app.post("/send-booking-email", async (req, res) => {
  console.log("📩 Incoming booking request:", req.body);

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
    console.log("❌ Missing required fields");
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sendSmtpEmail = {
    sender: {
      email: process.env.BREVO_SENDER_EMAIL,
      name: "QuickServe Bookings",
    },
    to: [
      {
        email: "quickservee1202@gmail.com",
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

  try {
    console.log("🚀 Sending email to Brevo...");
    const response = await emailApi.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Brevo response:", response);

    res.status(200).json({ message: "Booking email sent successfully" });
  } catch (error) {
    console.error("🔥 BREVO ERROR STATUS:", error?.status);
    console.error("🔥 BREVO ERROR MESSAGE:", error?.message);
    console.error("🔥 BREVO ERROR BODY:", error?.response?.body || error);

    res.status(500).json({
      message: "Failed to send email",
      brevoStatus: error?.status,
      brevoMessage: error?.message,
    });
  }
});

/* =========================
   SERVER START
========================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
