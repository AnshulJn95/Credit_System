import React, { useState } from "react";
import { motion } from "framer-motion";

const CreditScoreForm = () => {
  const [formData, setFormData] = useState({
    paymentHistory: 0,
    creditUtilization: 0,
    lengthOfCreditHistory: 0,
    savingsHabits: 0,
    professionalStability: 0,
    ecommerceActivity: 0,
    gamifiedTests: 0,
    socialMediaFootprint: 0,
  });

  const [creditScore, setCreditScore] = useState(null);

  // Ensure numbers are stored
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: Number(e.target.value) || 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5001/api/credit-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    setCreditScore(result.score);
  };

  const fieldDescriptions = {
    paymentHistory: "📜 History of paying debts on time (0-10)",
    creditUtilization: "💳 Ratio of credit used to available credit (0-10)",
    lengthOfCreditHistory: "📅 Age of your credit accounts (0-10)",
    savingsHabits: "💰 How regularly you save money (0-10)",
    professionalStability: "👨‍💼 Your job stability & experience (0-10)",
    ecommerceActivity: "🛒 Online shopping & spending patterns (0-10)",
    gamifiedTests: "🎮 Financial literacy & gamified tests (0-10)",
    socialMediaFootprint: "🌍 Social media activity impact (0-10)",
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          🔥 Credit Score Evaluation
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * Object.keys(formData).indexOf(key) }}
              className="flex flex-col"
            >
              <label className="text-gray-700 font-semibold mb-1">
                {fieldDescriptions[key]}
              </label>
              <input
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                min="0"
                max="10"
                className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>
          ))}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded shadow-lg"
          >
            🚀 Evaluate Credit Score
          </motion.button>
        </form>

        {creditScore !== null && (
          <div className="mt-6 text-center text-lg font-bold text-gray-800">
            🎯 Your Credit Score: <span className="text-blue-600">{creditScore}</span>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CreditScoreForm;
