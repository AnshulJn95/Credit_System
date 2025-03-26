const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Function to evaluate a comprehensive credit score (Scale: 300-900)
function evaluateCreditScore(data) {
  let baseScore = 300; // Minimum credit score
  let maxPossibleScore = 600; // Extra points to reach 900

  // **Weight Factors**
  let weightedScore = 0;
  weightedScore += (data.paymentHistory || 0) * 35; // 35% weight
  weightedScore += (data.creditUtilization || 0) * 30; // 30% weight
  weightedScore += (data.lengthOfCreditHistory || 0) * 15; // 15% weight
  weightedScore -= (data.newCreditInquiries || 0) * 10; // Negative impact

  // **Additional Factors**
  weightedScore += (data.savingsHabits || 0) * 5;
  weightedScore += (data.professionalStability || 0) * 5;
  weightedScore += (data.ecommerceActivity || 0) * 5;
  weightedScore += (data.gamifiedTests || 0) * 5;
  weightedScore += (data.socialMediaFootprint || 0) * 5;

  // **Scaling the score properly**
  let maxWeightSum = 10 * (35 + 30 + 15 + 5 + 5 + 5 + 5 + 5 - 10); // Max score possible if all inputs are 10
  let normalizedScore = (weightedScore / maxWeightSum) * maxPossibleScore; // Scale to 600 max range

  let finalScore = Math.min(Math.max(baseScore + normalizedScore, 300), 900);

  return Math.round(finalScore);
}

// Default route for health check
app.get("/", (req, res) => {
  res.send("Credit Scoring API is running 🚀");
});

// Credit Score API Route
app.post("/api/credit-score", (req, res) => {
  try {
    const data = req.body;

    // **Basic Validation**
    if (
      data.paymentHistory === undefined ||
      data.creditUtilization === undefined ||
      data.lengthOfCreditHistory === undefined
    ) {
      return res.status(400).json({ message: "Missing key credit factors!" });
    }

    const score = evaluateCreditScore(data);
    console.log(`📊 Credit Score Evaluated: ${score}`);
    res.json({ score, message: "Credit score evaluated successfully." });
  } catch (error) {
    console.error("❌ Error evaluating credit score:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});